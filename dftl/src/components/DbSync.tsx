'use client';

import '@aws-amplify/ui-react/styles.css';
import {useLiveQuery} from "dexie-react-hooks";
import {db} from "@/services/db";
import Action, {ActionType, TargetType} from "@/services/Action";
import GroceryListRemoteService, {Result} from "@/services/GroceryListRemoteService";
import GroceryList from "@/services/GroceryList";
import Dexie from "dexie";
import Item from "@/services/Item";
import SyncIcon from '@mui/icons-material/Sync';
import PendingIcon from '@mui/icons-material/Pending';
import DangerousIcon from '@mui/icons-material/Dangerous';
import {IconButton} from "@mui/material";
import React, {useEffect, useState} from "react";
import GroceryListLocalService from "@/services/GroceryListLocalService";

let lock = false;

export default function DbSync() {
  let actions = useLiveQuery(() => db.actions.toArray());

  const [online, setOnline] = useState(navigator.onLine);

  useEffect(() => {
    window.addEventListener('online', () => setOnline(true));
    window.addEventListener('offline', () => setOnline(false));
    return ()=>{
      window.removeEventListener('online', ()=> setOnline(true))
      window.removeEventListener('offline', ()=> setOnline(false) )
    }
  }, []);


  if (!lock && actions !== undefined) {
      processActions(actions);
  }

  function processAction(action: Action) {
    if (action.targetType === TargetType.GroceryList) {
      let groceryList: GroceryList = action.target;
      switch (action.actionType) {
        case ActionType.Add:
          return GroceryListRemoteService.addGroceryList(groceryList);
        case ActionType.Delete:
          return GroceryListRemoteService.deleteGroceryList(groceryList);
      }
    } else if (action.targetType === TargetType.Item) {
      let item: Item = action.target;
      switch (action.actionType) {
        case ActionType.Add:
          return GroceryListRemoteService.addItem(item);
        case ActionType.Delete:
          return GroceryListRemoteService.deleteItem(item);
      }
    }
  }

  async function processActions(actions: Action[]) {
    lock = true;
    try {
      for (const action of actions) {
        let result = await Dexie.waitFor(processAction(action));
        if (result === Result.Success) {
          await db.actions.delete(action.id);
        }
      }
    } finally {
      lock = false;
    }
  }

  async function reload() {
    const groceryLists = await GroceryListLocalService.fetchGroceryLists();
    groceryLists.forEach((groceryList: GroceryList) => GroceryListLocalService.fetchItems(groceryList.id));
  }

  if (!online) {
    return (<DangerousIcon />);
  }

  let syncIcon = (
    <IconButton color="inherit" aria-label="sync" component="span" onClick={() => reload()}>
      <SyncIcon />
    </IconButton>
  );
  return (<>{actions?.length ? <PendingIcon/> : syncIcon}</>);
}

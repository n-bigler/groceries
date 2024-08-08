'use client';

import {useLiveQuery} from "dexie-react-hooks";
import {db} from "@/services/db";
import {Box, Grid, IconButton, Paper, Typography} from '@mui/material';
import Item from "@/services/Item";

import {Add} from "@mui/icons-material";
import React, {useEffect, useState} from "react";
import AddGroceryItemDialog from "@/components/AddGroceryItemDialog";
import GroceryListLocalService from "@/services/GroceryListLocalService";

export default function GroceryListView({ groceryListId }: { groceryListId: string}) {

  const [openDialog, setOpenDialog] = useState(false);
  const [textField, setTextField] = useState({name: '', quantity: ''});

  useEffect(() => {
    if (typeof window !== "undefined") {
      localStorage.setItem("dftl.lastVisited", groceryListId);
    }
    GroceryListLocalService.fetchItems(groceryListId);
  }, [groceryListId]);

  const groceryList = useLiveQuery(() => db.groceryLists
    .where("id")
    .equals(groceryListId)
    .first());

  let items = useLiveQuery(() => db.items
    .where("groceryListId")
    .equals(groceryListId)
    .toArray());

  function handleTextFieldChange(field: any, newValue: any) {
    setTextField({...textField, [field]: newValue});
  }

  function handleClose(action: string) {
    if (action === 'add') {
      const item = new Item(textField.name, textField.quantity, groceryListId);
      GroceryListLocalService.addItem(item);
      setTextField({name: '', quantity: ''});
    }
    setOpenDialog(false);
  }

  function handleClickAddItem() {
    setOpenDialog(true);
  }

  async function handleClickDeleteItem(item: Item) {
    await GroceryListLocalService.deleteItem(item);
  }

  return (
    <>
      <Typography variant="h2">
        {groceryList?.name}
      </Typography>
      <Grid container spacing={2} sx={{mt: 2, mb: 2}}>
        {items?.map((item: Item) => {
          return (
            <Grid item key={item.name} xs={4} sm={2}>
              <Box sx={{
                display: 'flex',
                '& > :not(style)': {
                  p: 2,
                  cursor: 'pointer',
                  width: 100,
                  height: 100
                },
              }}>
                <Paper elevation={3} sx={{p: 2, cursor: 'pointer'}} onClick={() => handleClickDeleteItem(item)}>
                  <Typography variant="body1" component="div" style={{ wordWrap: 'break-word' }} align={'center'}>
                    <strong>{item.name}</strong>
                  </Typography>
                  <Typography sx={{mb: 1, mt: 1}} color="text.secondary">
                    {item.quantity}
                  </Typography>
                </Paper>
              </Box>
            </Grid>
          );
        })}
      </Grid>
      <IconButton color="primary" aria-label="add item" component="span" size="large" onClick={() => handleClickAddItem()}>
        <Add />
      </IconButton>
      <AddGroceryItemDialog
        open={openDialog}
        textField={textField}
        handleTextFieldChange={handleTextFieldChange}
        handleClose={handleClose}
      />
    </>  )
}
import React, {useEffect, useState} from 'react';
import {Box, CircularProgress, Grid, IconButton, Paper, Typography} from '@mui/material';
import Add from '@mui/icons-material/Add';
import {useParams} from 'react-router-dom';
import {addItem, deleteItem, getGroceryListWithItems} from '../services/groceriesService.js';
import AddGroceryItemDialog from './AddGroceryItemDialog.js';
import GroceryListModel from "../services/GroceryListModel";
import {addToActionsToSync, getActionsToSync, removeFromActionsToSync} from "../services/actionsToSyncService";

const ActionType = {
  DELETE: "delete",
  ADD: "add"
};

const GroceryList = () => {

  const { groceryListId } = useParams();

  const [appState, setAppState] = useState({
    loading: true,
    groceryList: null,
    openDialog: false,
    textField: {name: '', quantity: ''},
  });

  useEffect(() => {
    const interval = setInterval(() => {
      const actionsToSync = getActionsToSync();
      if (actionsToSync.length !== 0) {
        for (const action of actionsToSync) {
          const currentItem = action.item;
          if (action.actionType === ActionType.DELETE) {
            deleteItem({id: action.groceryListId}, currentItem)
              .then(response => {
                console.log(`delete action successfully synced: ${currentItem}`);
                removeFromActionsToSync(action);
              })
              .catch(error => {
              });
          }
          if (action.actionType === ActionType.ADD) {
            addItem({id: groceryListId}, currentItem)
              .then(response => {
                console.log(`add action successfully synced: ${currentItem}`);
                removeFromActionsToSync(action);
              })
              .catch(error => {
              });
          }
        }
      }
    }, 5000);
    return () => {
      clearInterval(interval);
    };
  }, [])

  useEffect(() => {
    localStorage.setItem("dftl.lastVisited", groceryListId);
    setAppState({ ...appState, loading: true });
    getGroceryListWithItems(groceryListId)
      .then(response => {
        let groceryList = new GroceryListModel(response.name, groceryListId, response.description, response.items);
        setAppState({ ...appState, loading: false, groceryList: groceryList });
      })
      .catch(error => {
        console.log(error.message);
      });
  }, [setAppState]);

  if (appState.loading) {
    return <CircularProgress sx={{mt: 2}} />;
  }
  
  const handleClickDeleteItem = (itemName) => {
   const newItems = appState.groceryList.items.filter(item => item.name !== itemName);
   const newGroceryList = { ...appState.groceryList, items: newItems};
   deleteItem(appState.groceryList, itemName)
    .then(response => {
      setAppState({ ...appState, groceryList: newGroceryList});
    })
    .catch(error => {
      console.log(error);
      addToActionsToSync(groceryListId, ActionType.DELETE, itemName);
      setAppState({ ...appState, groceryList: newGroceryList});
    });
  };

  const handleClickAddItem = () => {
    setAppState({ ...appState, openDialog: true });
  };
  const handleClose = (action) => {
    if (action === 'add') {
     const newItem = appState.textField;
     const newItems = [...appState.groceryList.items];
     newItems.push(newItem);
     const newGroceryList = { ...appState.groceryList, items: newItems};
     addItem(appState.groceryList, newItem)
      .then(response => {
        console.log("item added");
        setAppState({ ...appState, openDialog: false, groceryList: newGroceryList, textField: {name: '', quantity: ''}});
      })
      .catch(error => {
        console.log(error);
        addToActionsToSync(groceryListId, ActionType.ADD, newItem);
        setAppState({ ...appState, openDialog: false, groceryList: newGroceryList, textField: {name: '', quantity: ''}});
      });
    }
    setAppState({...appState, openDialog: false });
  };

  const handleTextFieldChange = (id, newVal) => {
      const textField = appState.textField;
      const newTextField = {...textField};
      newTextField[id]=newVal;
      setAppState({...appState, textField: newTextField });
  }

  return (
    <>
      <Typography variant="h2">
        {appState.groceryList.name}
      </Typography>
      <Grid container spacing={2} sx={{mt: 2, mb: 2}}>
        {appState.groceryList.items.map((item) => {
          return (
            <Grid item key={item.name} sx={2}>
              <Box sx={{
                display: 'flex',
                '& > :not(style)': {
                  p: 2,
                  cursor: 'pointer',
                  width: 100,
                  height: 100

                },
              }}>
                <Paper elevation={3} sx={{p: 2, cursor: 'pointer'}} onClick={() => handleClickDeleteItem(item.name)}>
                  <Typography variant="body1" component="div" style={{ wordWrap: 'break-word' }}>
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
        open={appState.openDialog}
        textField={appState.textField}
        handleTextFieldChange={handleTextFieldChange}
        handleClose={handleClose}
      />
    </>
  );
};

export default GroceryList;

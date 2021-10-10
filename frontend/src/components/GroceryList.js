import React, { useEffect, useState } from 'react';
import { CircularProgress, Typography, Grid, Button, Paper, IconButton, Dialog, DialogActions, DialogContent, DialogContentText, TextField, DialogTitle, Stack, Box } from '@mui/material';
import Add from '@mui/icons-material/Add';
import { useParams } from 'react-router-dom';
import { getGroceryListWithItems, addItem, deleteItem } from '../services/groceriesService.js';
import AddGroceryItemDialog from './AddGroceryItemDialog.js';

const GroceryList = () => {

  const { groceryListId } = useParams();

  const [appState, setAppState] = useState({
    loading: true,
    groceryList: null,
    openDialog: false,
    textField: {name: '', quantity: ''}
  });

  useEffect(() => {
    setAppState({ ...appState, loading: true });
    getGroceryListWithItems(groceryListId)
      .then(response => {
        console.log(response);
        setAppState({ ...appState, loading: false, groceryList: response });
      })
      .catch(error => {
        console.log(error.message);
      });
  }, [setAppState]);

  if (appState.loading) {
    return <CircularProgress sx={{mt: 2}} />;
  }
  
  const handleClickDeleteItem = (itemName) => {
   deleteItem(groceryListId, itemName)
    .then(response => {
      const newItems = appState.groceryList.items.filter(item => item.name !== itemName);
      const newGroceryList = { ...appState.groceryList, items: newItems};
      setAppState({ ...appState, groceryList: newGroceryList});
    })
    .catch(error => {
      console.log(error.message)
    });
  };

  const handleClickAddItem = () => {
    setAppState({ ...appState, openDialog: true });
  };
  const handleClose = (action) => {
    if (action === 'add') {
     const newItem = appState.textField;
     addItem(groceryListId, newItem)
      .then(response => {
        const newItems = [...appState.groceryList.items];
        newItems.push(newItem);
        const newGroceryList = { ...appState.groceryList, items: newItems};
        setAppState({ ...appState, openDialog: false, groceryList: newGroceryList, textField: {name: '', quantity: ''}});       
      })
      .catch(error => {
        console.log(error.message)
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
                  minWidth: 128,
                  height: 128
                },
              }}>
                <Paper elevation={3} sx={{p: 2, cursor: 'pointer'}} onClick={() => handleClickDeleteItem(item.name)}>
                  <Typography variant="h5" component="div">
                    {item.name}
                  </Typography>
                  <Typography sx={{ mb: 1.5}} color="text.secondary">
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

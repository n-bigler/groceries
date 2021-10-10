import React, { useEffect, useState } from 'react';
import withGroceriesListLoading from './withGroceriesListLoading.js';
import { Auth } from 'aws-amplify';
import { getGroceryLists, createGroceryList, deleteGroceryList, subscribeToGroceryList } from '../services/groceriesService.js';
import { Button, Card, CardContent, CardActions, CircularProgress, Grid, Typography } from '@mui/material';
import {Link} from 'react-router-dom';
import AddGroceryListDialog from './AddGroceryListDialog.js';
import ShowGroceryListId from './ShowGroceryListId.js';

const GroceryListsContainer = () => {
  const [appState, setAppState] = useState({
    loading: false,
    groceryLists: [],
    openAddGroceryListDialog: false,
    openShowIdDialog: false,
    currentOpenedId: '',
    textField: {name: '', description: '', subscribeId: ''}
  });

  useEffect(() => {
    setAppState({ ...appState, loading: true });
    getGroceryLists()
      .then(response => {
        setAppState({ ...appState, loading: false, groceryLists: response });
      })
      .catch(error => {
        console.log(error.message);
      });
  }, [setAppState]);

  if (appState.loading) {
    return <CircularProgress sx={{mt: 2}} />;
  }

  const handleClickAddNewGroceryList = () => {
    setAppState({ ...appState, openAddGroceryListDialog: true});
  };

  const handleTextFieldChange = (id, newVal) => {
      const textField = appState.textField;
      const newTextField = {...textField};
      newTextField[id]=newVal;
      setAppState({...appState, textField: newTextField });
  }

  const handleClose = (action) => {
    if (action === 'create') {
      createGroceryList(appState.textField)
        .then(response => {
          const newGroceryLists = [...appState.groceryLists];
          newGroceryLists.push(response);
          setAppState({ ...appState, openAddGroceryListDialog: false, textField: {name: '', description: '', subscribeId: ''}, groceryLists: newGroceryLists});
        })
        .catch(error => {
          console.log(error.message)
        });
    } else if (action === 'subscribe') {
      console.log(appState.textField.subscribeId);
      subscribeToGroceryList(appState.textField.subscribeId)
        .then(response => {
          const newGroceryLists = [...appState.groceryLists];
          newGroceryLists.push(response);
          setAppState({ ...appState, openAddGroceryListDialog: false, textField: {name: '', description: '', subscribeId: ''}, groceryLists: newGroceryLists});
        })
        .catch(error => {
          console.log(error.message)
        });
    }

    setAppState({...appState, openAddGroceryListDialog: false });
  };

  const handleOnClickDelete = (groceryListId) => {
    deleteGroceryList(groceryListId)
      .then(response => {
        const newGroceryLists = appState.groceryLists.filter((groceryList) => groceryList.id !== groceryListId);
        setAppState({...appState, groceryLists: newGroceryLists});
      })
    .catch(error => {
      console.log(error.message);
    });
  };

  const handleOnShowId = (id) => {
    setAppState({...appState, openShowIdDialog: true, currentOpenedId: id});
  };
  const handleCloseShowId = () => {
    setAppState({...appState, openShowIdDialog: false, currentOpenedId: ''});
  };

  return (
    <>
      <Grid container spacing={2} sx={{mt: 2, mb: 2}}>
        {appState.groceryLists.map((groceryList) => {
          return (
            <Grid item key={groceryList.id} md={5}>
              <Card sx={{minWidth: 275}}>
                <CardContent>
                  <Typography variant="h5" component="div">
                    {groceryList.name}
                  </Typography>
                  <Typography sx={{ mb: 1.5}} color="text.secondary">
                    {groceryList.description}
                  </Typography>
                </CardContent>
                <CardActions>
                  <Button component={Link} to={'/grocerylists/'+groceryList.id} size="small">View</Button>
                  <Button onClick={() => handleOnClickDelete(groceryList.id)} color="error" size="small">
                    {groceryList.isOwner ? 'Delete' : 'Unsubscribe'}
                  </Button>
                  <Button onClick={() => handleOnShowId(groceryList.id)} size="small">
                    Link
                  </Button>
                </CardActions>
             </Card>
           </Grid>
          );
        })}
      </Grid>
      <Button variant="contained" onClick={ () => handleClickAddNewGroceryList()}>New Grocery List</Button>
      <AddGroceryListDialog
        open={appState.openAddGroceryListDialog}
        textField={appState.textField}
        handleTextFieldChange={handleTextFieldChange}
        handleClose={handleClose}
      />
      <ShowGroceryListId
        open={appState.openShowIdDialog}
        handleClose={handleCloseShowId}
        id={appState.currentOpenedId}
      />

    </>
  );
}
export default GroceryListsContainer;

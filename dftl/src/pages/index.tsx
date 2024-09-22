'use client';

import {Button, Card, CardActions, CardContent, CircularProgress, Grid, Typography} from "@mui/material";
import NextLink from "next/link";
import {db} from "@/services/db";
import {useLiveQuery} from "dexie-react-hooks";
import GroceryList from "@/services/GroceryList";
import {useEffect, useState} from "react";
import AddGroceryListDialog from "@/components/AddGroceryListDialog";
import GroceryListLocalService from "@/services/GroceryListLocalService";
import ShowGroceryListId from "@/components/ShowGroceryListId";
import DeleteGroceryListDialog from "@/components/DeleteGroceryListDialog";
import {setCustomUserAgent} from "@aws-amplify/core/internals/utils";
import GroceryListRemoteService from "@/services/GroceryListRemoteService";
import DbSync from "@/components/DbSync";

export default function GroceryLists() {
  const [openAddGroceryListDialog, setOpenAddGroceryListDialog] = useState(false);
  const [openShowIdDialog, setOpenShowIdDialog] = useState(false);
  const [openDeleteGroceryListDialog, setOpenDeleteGroceryListDialog] = useState(false);

  const [textField, setTextField] = useState({name: '', description: '', subscribeId: ''});
  const [openedGroceryList, setOpenedGroceryList] = useState<GroceryList|null>(null);

  let groceryLists = useLiveQuery(() => db.groceryLists.toArray());


  if (typeof window !== "undefined") {
  }
  useEffect(() => {
    if (typeof window !== "undefined") {
      localStorage.removeItem("dftl.lastVisited");
    }
    GroceryListLocalService.fetchGroceryLists();
  }, []);

  function handleClickAddNewGroceryList()  {
    setOpenAddGroceryListDialog(true);
  }

  async function handleReload()  {
    await GroceryListLocalService.fetchGroceryLists();
  }

  function handleTextFieldChange(id: string, newVal: string) {
    setTextField({...textField, [id]: newVal});
  }

  function handleClose(action: any) {
    if (action === 'create') {
      let newList =  new GroceryList(textField.name, textField.description, true);
      GroceryListLocalService.addGroceryList(newList);
    }
    else if (action === 'subscribe') {
      GroceryListLocalService.subscribeToGroceryList(textField.subscribeId);
    }
    setOpenAddGroceryListDialog(false);
  }

  function handleOnClickDelete(groceryList: GroceryList) {
    setOpenDeleteGroceryListDialog(true);
    setOpenedGroceryList(groceryList);
  }

  function handleOnShowId(groceryList: GroceryList) {
    setOpenedGroceryList(groceryList);
    setOpenShowIdDialog(true);
  }

  function handleCloseShowId() {
    setOpenShowIdDialog(false);
  }

  function handleCloseDeleteGroceryList(action: string) {
    setOpenDeleteGroceryListDialog(false);
    if (action === 'delete') {
      if (openedGroceryList !== null) {
        GroceryListLocalService.deleteGroceryList(openedGroceryList);
      }
    }
  }
  return (
    <>
      <Grid container spacing={2} sx={{mt: 2, mb: 2}}>
        {groceryLists?.map((groceryList: GroceryList) => {
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
                  <Button component={NextLink} href={"/" + groceryList.id} size="small">View</Button>
                  <Button onClick={() => handleOnClickDelete(groceryList)} color="error" size="small">
                    {groceryList.isOwner ? 'Delete' : 'Unsubscribe'}
                  </Button>
                  <Button onClick={() => handleOnShowId(groceryList)} size="small">
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
        open={openAddGroceryListDialog}
        textField={textField}
        handleTextFieldChange={handleTextFieldChange}
        handleClose={handleClose}
      />
      <ShowGroceryListId
        open={openShowIdDialog}
        handleClose={handleCloseShowId}
        id={openedGroceryList?.id}
      />
      <DeleteGroceryListDialog
        open={openDeleteGroceryListDialog}
        handleClose={handleCloseDeleteGroceryList}
        name={openedGroceryList?.name}
      />
    </>
  );

}

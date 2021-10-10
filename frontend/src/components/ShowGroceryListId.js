import React from 'react';
import { Button, Dialog, DialogActions, DialogContent, DialogContentText, TextField, DialogTitle, Box } from '@mui/material';

const ShowGroceryListId = (props) => {
  return (
    <Dialog open={props.open} onClose={() => props.handleClose()}>
    <DialogTitle>Grocery List ID</DialogTitle>
    <DialogContent>
      <DialogContentText> 
        {props.id}
      </DialogContentText>
    </DialogContent>
    <DialogActions>
      <Button onClick={() => props.handleClose()}>Ok</Button>
    </DialogActions>
  </Dialog>

  );
}

export default ShowGroceryListId;

import React from 'react';
import { Button, Dialog, DialogActions, DialogContent, DialogContentText, TextField, DialogTitle, Box } from '@mui/material';

const DeleteGroceryListDialog = (props) => {
  return (
    <Dialog open={props.open} onClose={() => props.handleClose()}>
    <DialogContent>
      <DialogContentText> 
        Are you sure you want to delete <strong>{props.name}</strong> ?
      </DialogContentText>
    </DialogContent>
    <DialogActions>
      <Button onClick={() => props.handleClose('cancel')}>Cancel</Button>
      <Button onClick={() => props.handleClose('delete')} color="error">Delete</Button>
    </DialogActions>
  </Dialog>

  );
}

export default DeleteGroceryListDialog;


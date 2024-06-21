import React from 'react';
import {Button, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle} from '@mui/material';

export default function ShowGroceryListId(props: any) {
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
};

import React, { useEffect, useState } from 'react';
import { Button, Dialog, DialogActions, DialogContent, DialogContentText, TextField, DialogTitle, Stack } from '@mui/material';

const AddGroceryItemDialog = (props) => {
  return (
    <Dialog open={props.open} onClose={() => props.handleClose('cancel')}>
      <DialogTitle>Add item</DialogTitle>
      <DialogContent>
       <Stack
        component="form"
        sx={{
          width: '25ch',
        }}
        spacing={2}
        noValidate
        autoComplete="off" 
         >
        <TextField
          autoFocus
          margin="dense"
          id="name"
          label="Name"
          type="text"
          variant="standard"
          onChange={(e) => props.handleTextFieldChange('name', e.target.value)}
          value={props.textField.name}
        />
        <TextField
          margin="dense"
          id="quantity"
          label="Quantity"
          type="text"
          variant="standard"
          onChange={(e) => props.handleTextFieldChange('quantity', e.target.value)}
          value={props.textField.quantity}
        />
      </Stack>
      </DialogContent>
      <DialogActions>
        <Button onClick={() => props.handleClose('cancel')}>Cancel</Button>
        <Button onClick={() => props.handleClose('add')}>Add</Button>
      </DialogActions>
    </Dialog>

  );
}

export default AddGroceryItemDialog;

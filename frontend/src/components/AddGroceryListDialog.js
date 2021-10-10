import React, { useEffect, useState } from 'react';
import { Button, Dialog, DialogActions, DialogContent, DialogContentText, TextField, DialogTitle, Stack, Tab, Box } from '@mui/material';
import { TabContext, TabList, TabPanel } from '@mui/lab';

const AddGroceryItemDialog = (props) => {
  const [value, setValue] = useState('1');
  const handleChange = (event, newValue) => {
    setValue(newValue);
  }
  return (
    <Dialog open={props.open} onClose={() => props.handleClose('cancel')}>
      <Box sx={{ width: '100%', typography: 'body1' }}>
        <TabContext value={value}>
         <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
           <TabList onChange={handleChange} aria-label="lab API tabs example">
             <Tab label="Create" value="1" />
             <Tab label="Subscribe" value="2" />
           </TabList>
         </Box>
         <TabPanel value="1">
          <DialogTitle>Create a new Grocery List</DialogTitle>
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
              id="description"
              label="Description"
              type="text"
              variant="standard"
              onChange={(e) => props.handleTextFieldChange('description', e.target.value)}
              value={props.textField.description}
            />
          </Stack>
          </DialogContent>
          <DialogActions>
            <Button onClick={() => props.handleClose('cancel')}>Cancel</Button>
            <Button onClick={() => props.handleClose('create')}>Create</Button>
          </DialogActions>
          </TabPanel>
          <TabPanel value="2">
          <DialogTitle>Subscribe to an existing Grocery List</DialogTitle>
          <DialogContent>
           <Stack
            component="form"
            sx={{
              width: '36ch',
            }}
            spacing={2}
            noValidate
            autoComplete="off" 
             >
            <TextField
              autoFocus
              margin="dense"
              id="subscribeId"
              label="ID"
              type="text"
              variant="standard"
              onChange={(e) => props.handleTextFieldChange('subscribeId', e.target.value)}
              value={props.textField.subscribeId}
            />
          </Stack>
          </DialogContent>
          <DialogActions>
            <Button onClick={() => props.handleClose('cancel')}>Cancel</Button>
            <Button onClick={() => props.handleClose('subscribe')}>Subscribe</Button>
          </DialogActions>
        </TabPanel>
    </TabContext>
  </Box>
  </Dialog>

  );
}

export default AddGroceryItemDialog;

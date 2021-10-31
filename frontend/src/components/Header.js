import React from 'react';
import { Auth } from 'aws-amplify';
import { Typography, AppBar, Box, Toolbar, Button, Icon } from '@mui/material';
import LocalBarIcon from '@mui/icons-material/LocalBar';
import { Link } from 'react-router-dom';

const Header = () => {
  const handleSignOut = () => {
    try {
      Auth.signOut();
    } catch (error) {
      console.log('error signing out: ', error);
    }
  }

  const removeLastVisited = () => {
    localStorage.removeItem("dftl.lastVisited");
  };

  return (
    <header>
      <Box sx={{ flexGrow: 1 }}>
        <AppBar position="static">
          <Toolbar>
            <LocalBarIcon sx={{ mr: 2 }} />
            <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
              {"Don't Forget The Lime!"}
            </Typography>
            <Button color="inherit" 
              component={Link}
              onClick={() => removeLastVisited()}
              to={"/grocerylists"}
              >
                My Lists
            </Button>
            <Button color="inherit" onClick={() => handleSignOut()}>Sign out</Button>
          </Toolbar>
        </AppBar>
      </Box> 
    </header>
  );
}

export default Header;

'use client';

import {AppBar, Box, Button, Toolbar, Typography} from '@mui/material';
import LocalBarIcon from '@mui/icons-material/LocalBar';
import NextLink from "next/link";
import {handleSignOut} from "../services/authService";
import '@aws-amplify/ui-react/styles.css';
import DbSync from "@/components/DbSync";

export default function Header() {

  return (
    <header>
      <Box sx={{ flexGrow: 1 }}>
        <AppBar position="static">
          <Toolbar>
            <LocalBarIcon sx={{ mr: 2 }} />
            <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
              {"Don't Forget The Lime!"}
            </Typography>
            <DbSync/>
            <Button color="inherit" component={NextLink} href="/">My Lists</Button>
            <Button color="inherit" onClick={() => handleSignOut()}>Sign out</Button>
          </Toolbar>
        </AppBar>
      </Box>
    </header>
  );
}

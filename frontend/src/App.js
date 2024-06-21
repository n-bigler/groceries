import React from 'react';
import {withAuthenticator} from '@aws-amplify/ui-react';
import {Container, CssBaseline} from '@mui/material';
import {BrowserRouter as Router, Redirect, Route, Switch} from 'react-router-dom';
import Header from './components/Header.js';
import GroceryListsContainer from './components/GroceryListsContainer.js';
import GroceryList from './components/GroceryList.js';

function App({ signOut, user }) {
  const lastVisited = localStorage.getItem("dftl.lastVisited");

  return (
    <Router>
      <CssBaseline/>
      <Header/>
      <Container maxWidth="md">
        <Switch>
          <Route exact path="/">
            {lastVisited ? <Redirect to={"/grocerylists/" + lastVisited}/> : <Redirect to={"/grocerylists"}/>}
          </Route>
          <Route exact path="/grocerylists">
            <GroceryListsContainer/>
          </Route>
          <Route path="/grocerylists/:groceryListId">
            <GroceryList/>
          </Route>
        </Switch>
      </Container>
    </Router>
  );

}
export default withAuthenticator(App, { socialProviders: ['google']});
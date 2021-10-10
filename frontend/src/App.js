import React from 'react';
import { AmplifyAuthenticator, AmplifySignUp, AmplifySignOut } from '@aws-amplify/ui-react';
import { Auth, Hub } from 'aws-amplify';
import { CssBaseline, Container } from '@mui/material';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';

import Header from './components/Header.js';
import GroceryListsContainer from './components/GroceryListsContainer.js';
import GroceryList from './components/GroceryList.js';

function App() {
  const [user, updateUser] = React.useState(null);
  React.useEffect(() => {
    Auth.currentAuthenticatedUser()
      .then(user => updateUser(user))
      .catch(() => console.log('No signed in user.'));
    Hub.listen('auth', data => {
      switch (data.payload.event) {
        case 'signIn':
          return updateUser(data.payload.data);
        case 'signOut':
          return updateUser(null);
      }
    });
  }, [])
  if (user) {
    return (
      <Router>
        <CssBaseline />
        <Header />
          <Container maxWidth="md">
            <Switch>
              <Route exact path="/">
                <GroceryListsContainer />
              </Route>
              <Route path="/grocerylists/:groceryListId">
                <GroceryList />
              </Route>
            </Switch>
          </Container>
      </Router>
    )
  }
  return (
    <div style={{ display: 'flex', justifyContent: 'center' }}>
      <AmplifyAuthenticator>
        <AmplifySignUp
          slot="sign-up"
          usernameAlias="email"
          formFields={[
            { type: "email" },
            {
              type: "password",
              label: "Custom Password Label",
              placeholder: "custom password placeholder"
            },
          ]} 
        />
      </AmplifyAuthenticator>
    </div>
  );
}

export default App;

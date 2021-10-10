import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import * as serviceWorkerRegistration from './serviceWorkerRegistration';
import reportWebVitals from './reportWebVitals';
import Amplify, { Auth } from 'aws-amplify';
import 'bootstrap/dist/css/bootstrap.css';

Amplify.configure({
  Auth: {

    // REQUIRED - Amazon Cognito Region
    region: 'eu-west-3',

    // OPTIONAL - Amazon Cognito User Pool ID
    userPoolId: process.env.REACT_APP_COGNITO_USER_POOL,

    // OPTIONAL - Amazon Cognito Web Client ID (26-char alphanumeric string)
    userPoolWebClientId: process.env.REACT_APP_COGNITO_CLIENT_ID,

    // OPTIONAL - Enforce user authentication prior to accessing AWS resources or not
    mandatorySignIn: true,

//    // OPTIONAL - Configuration for cookie storage
//    // Note: if the secure flag is set to true, then the cookie transmission requires a secure protocol
//    cookieStorage: {
//      // REQUIRED - Cookie domain (only required if cookieStorage is provided)
//      domain: '.yourdomain.com',
//      // OPTIONAL - Cookie path
//      path: '/',
//      // OPTIONAL - Cookie expiration in days
//      expires: 365,
//      // OPTIONAL - See: https://developer.mozilla.org/en-US/docs/Web/HTTP/Headers/Set-Cookie/SameSite
//      sameSite: "strict" | "lax",
//      // OPTIONAL - Cookie secure flag
//      // Either true or false, indicating if the cookie transmission requires a secure protocol (https).
//      secure: true
//    },

    // OPTIONAL - Manually set the authentication flow type. Default is 'USER_SRP_AUTH'
    authenticationFlowType: 'USER_SRP_AUTH',

  }
});


ReactDOM.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
  document.getElementById('root')
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://cra.link/PWA
serviceWorkerRegistration.register();

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();

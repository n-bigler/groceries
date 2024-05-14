let awsconfig = {
  Auth: {
    Cognito: {

      // OPTIONAL - Amazon Cognito User Pool ID
      userPoolId: 'eu-central-1_meaLtneAi',

      // OPTIONAL - Amazon Cognito Web Client ID (26-char alphanumeric string)
      userPoolClientId: '45rvvi7ngse6f2t7gmj0p4kl71',

      // OPTIONAL - Enforce user authentication prior to accessing AWS resources or not
      mandatorySignIn: true,

      loginWith: { // Optional
        oauth: {
          domain: 'https://service-user-pool-domain-dev-nbigler-griffon.auth.eu-central-1.amazoncognito.com',
          scopes: ['openid email phone profile aws.cognito.signin.user.admin '],
          redirectSignIn: ['http://localhost:3000/', 'https://dftl.nicolasbigler.ch/'],
          redirectSignOut: ['http://localhost:3000/', 'https://dftl.nicolasbigler.ch/'],
          responseType: 'code',
        },
        username: 'true'
      },
    }
  }
};

export default awsconfig;
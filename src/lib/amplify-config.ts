import { Amplify } from 'aws-amplify';

const amplifyConfig = {
  Auth: {
    Cognito: {
      userPoolId: process.env.NEXT_PUBLIC_AWS_COGNITO_USER_POOL_ID || 'us-east-1_I9BoDreCg',
      userPoolClientId: process.env.NEXT_PUBLIC_AWS_COGNITO_CLIENT_ID || '4tnfqqkk59scbf0o90q488ec08',
      identityPoolId: process.env.NEXT_PUBLIC_AWS_COGNITO_IDENTITY_POOL_ID,
      signUpVerificationMethod: 'code' as const,
      loginWith: {
        oauth: {
          domain: process.env.NEXT_PUBLIC_AWS_COGNITO_DOMAIN || 'diagnyx-dev-auth.auth.us-east-1.amazoncognito.com',
          scopes: ['email', 'openid', 'profile'],
          redirectSignIn: process.env.NEXT_PUBLIC_COGNITO_REDIRECT_SIGN_IN || 'http://localhost:3002/auth/callback',
          redirectSignOut: process.env.NEXT_PUBLIC_COGNITO_REDIRECT_SIGN_OUT || 'http://localhost:3002/auth/logout',
          responseType: 'code' as const
        },
        email: true,
        username: false
      }
    }
  },
  API: {
    REST: {
      'DiagnyxAPI': {
        endpoint: process.env.NEXT_PUBLIC_API_GATEWAY_URL || 'https://localhost:8443/api/v1',
        region: process.env.NEXT_PUBLIC_AWS_REGION || 'us-east-1'
      }
    }
  }
};

// Configure Amplify
try {
  Amplify.configure(amplifyConfig, { 
    ssr: true // Enable SSR support for Next.js
  });
} catch (error) {
  console.error('Error configuring Amplify:', error);
}

export default amplifyConfig;
import Amplify, {Auth} from 'aws-amplify';
import { render } from "react-dom";
import App from './App';
import React from 'react';
import config from './config';

Amplify.configure({
    Auth: {
        mandatorySignId: true,
        region: config.cognito.REGION,
        userPoolId: config.cognito.USER_POOL_ID,
        userPoolWebClientId: config.cognito.APP_CLIENT_ID
    }
});
render(<App />, document.getElementById('root'));


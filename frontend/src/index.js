import Amplify, {Auth} from 'aws-amplify';
import { render } from "react-dom";
// import Login from "./components/login/Login.js";
// import Signup from "./components/signup/Signup.js"
import App from './App';
import React from 'react';
import config from './config';
// import awsconfig from './aws-exports';
import Button from '@material-ui/core/Button';
// import PasswordInput from './components/login/PasswordInput.js';

Amplify.configure({
    Auth: {
        mandatorySignId: true,
        region: config.cognito.REGION,
        userPoolId: config.cognito.USER_POOL_ID,
        userPoolWebClientId: config.cognito.APP_CLIENT_ID
    }
});
render(<App />, document.getElementById('root'));
/*
function onLogin() {
    render(
        <Login />,
        document.getElementById('root2'),
    );
}
function onSignup() {
    render(
        <Signup />,
        document.getElementById('root2')
        
    );
}

render(
    <div>
        <Button className = "Loginbutton "variant = "contained" color = "primary" onClick = {onLogin} >Login</Button>
        <br></br>
        <br></br>
        <Button className = "signupbutton "variant = "contained" color = "primary" onClick = {onSignup} >Signup</Button>
    </div>,
    
    document.getElementById('root1')
);
*/

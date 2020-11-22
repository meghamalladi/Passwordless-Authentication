import React from 'react';
import {render} from "react-dom";
import { Form, Button, Input } from "element-react";
import { Auth } from 'aws-amplify';


class PasswordInput extends React.Component {
    

    state = { 
            password: '',
            
        }
    inputChange = event => {
        this.setState({
          [event.target.id] : event.target.value
        });
    }


    handlePasswordInput = async event => {
        event.preventDefault();
        try {
            console.log(this.props.auth.user)
            this.props.auth.user = await Auth.sendCustomChallengeAnswer(this.props.auth.user, this.state.password);
            if (this.isAuth()){
                this.props.auth.setAuthStatus(true)

                const user  = await Auth.currentAuthenticatedUser();
                this.props.auth.setUser(user);
                document.getElementById("root").innerHTML = "";


            };



        } catch(e) {
            console.log(e);
            console.log("Wrong passcode, try again!")
        }
        


    };
    // async updateUserName
    handleLogout = async event  => {
        event.preventDefault();
        console.log("U are logging out...");

        try{
            await Auth.signOut();
            this.props.auth.setAuthStatus(false);
            this.props.auth.setUser(null);
            
        }catch(e){
            console.log(e)
        }

    };

    async isAuth(){
        try {
            await Auth.currentSession();
            // this.props.auth.setAuthStatus(true);// to find currently active session
            // console.log(session);

            return true

        } catch(e) {
            console.log(e);
            return false
        }
        // this.props.auth.setLoggingStatus(false);
    }

    renderSuccess = () => {
        if (this.props.auth.isAuthenticated){
            return <h1>You are logged in!</h1>
        } 
        if (!this.props.auth.user){
            return <h1>You are logged out!</h1>

        }

        
    };

    render() {   
        const { password } = this.state.password; 
        return (
            <div> 
                <div>
                    <label htmlFor = "password">One-time-passcode </label>
                    <input type="text" id="password" placeholder="Password" onChange={this.inputChange} />
                </div>
            
                {/* <Button disabled={this.props.auth.isAuthenticating} onClick={this.handlePasswordInput}>Sign In</Button> */}
                <Button onClick={this.handlePasswordInput}>Sign In</Button>

                {/* {this.renderSuccess()} */}

                {/* <Button disabled={!this.props.auth.isAuthenticated} onClick = {this.handleLogout}>Logout</Button> */}


            </div> 
            )
        }
    }

    export default PasswordInput;

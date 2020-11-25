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


            };

        } catch(e) {
            console.log(e);
            console.log("Wrong passcode, try again!")
        }

        this.props.history.push("/");

    };


    async isAuth(){
        try {
            await Auth.currentSession();

            return true

        } catch(e) {
            console.log(e);
            return false
        }
    }



    render() {   
        const { password } = this.state.password; 
        return (
            <div> 
                <div>
                    <label htmlFor = "password">One-time-passcode </label>
                    <input type="text" id="password" placeholder="Password" onChange={this.inputChange} />
                </div>
            
                <Button href = "/Home" onClick={this.handlePasswordInput}>Sign In</Button>



            </div> 
            )
        }
    }

    export default PasswordInput;

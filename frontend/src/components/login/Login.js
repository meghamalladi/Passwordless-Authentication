import React, { Component } from 'react';
import validate from "../utility/FormValidation";
import "../../index.js";
import { Auth } from "aws-amplify";
import Button from '@material-ui/core/Button';


class Login extends Component{


        state= {
            user:null,
            phone : "",
        }


    handleSubmit = async event => {
        event.preventDefault();

        let validation_err = validate(event, this.state);
        if (validation_err)
            alert(validation_err);


    // AWS Integration here
        let cognitoUser="Sorry, your login has not been successful :(";
        try{
            cognitoUser = await Auth.signIn(this.state.phone);
            

            this.props.auth.setUser(cognitoUser)
            this.props.auth.setReady(true)

            this.props.history.push("/passwordInput")

        }catch(error){
            console.log(error)
        }
        
    }

    onInputChange = event => {
        this.setState({
          [event.target.id] : event.target.value
        });
    };

    render() {

        return(
            <div className="LoginForm">

                <h2>Login with your phone!!</h2>
                <form className="LoginForm__form">
                    <div className="Control">
                        <label className="Control__label" htmlFor ="user">Phone </label>
                        <input className="Control__input" id ="phone" name="user" type="text" placeholder="<area code><phonenumber>" onChange={this.onInputChange}/>
                    </div>
                    < br />
                    <Button variant = "contained" color= "primary" className="Control__input" disabled ={!this.state.phone} onClick ={this.handleSubmit} >Let's Go!</Button>

                </form> 
            </div>


        );
    }
}


export default Login;

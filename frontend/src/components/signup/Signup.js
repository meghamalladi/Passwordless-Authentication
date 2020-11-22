import { render } from "react-dom";
import React, { Component } from 'react';
import { Auth } from "aws-amplify";
// import FormErrors from "../FormErrors";
import validate from "../utility/FormValidation";
import "../../index.js"
import Button from '@material-ui/core/Button';


class Signup extends Component {
    constructor(props){
        super(props)
    
        this.state = {
            phone:"",
            fullname:"",
            errors: {   
                cognito:null,
                blankfield: false,
            }   
        }
    }

    handleSubmit = async event => {
        event.preventDefault();
        let validation_err = validate(event, this.state);
        if (validation_err)
            alert(validation_err);
        //AWS integration

        let signUpResponse="Unfortunately the signup has not happened :(!";
        try{
                signUpResponse = await Auth.signUp({
                username: this.state.phone,
                password: "Welcome123",
                attributes  :{
                    name: this.state.fullname
                }
            });

        }catch(error){
            console.log(JSON.stringify(error));
            if (error.code=="UsernameExistsException")
                alert("The given phone is already registered!! You can Login!");
            // alert(error.message)
            
            let err = null;
            !error.message ? err = {"message":error}: err = error;
            this.setState({
              errors: {
                  ...this.state.errors,
                  cognito: err
                }
            });

        }
        console.log(signUpResponse);

        if (signUpResponse.userConfirmed){
            alert("Congratulations! You have been registered!");
        }else if (signUpResponse.userCondirmed){
            alert("Waiting for confirmation...")
        }
        // this.props.history.push("/");


    };
    onInputChange = event => {
        this.setState({
          [event.target.id] : event.target.value
        });
        // document.getElementById(event.target.id).classList.remove("is-danger");
    }

    render() {
        return (
            <section className="section auth">
                <div className="container">
                    <h2>Registration</h2>

                    <form onSubmit={this.handleSubmit} name ="loginform">
    

                        <div className="field">
                            <p className="control">
                            <label htmlFor ="phone">Phone Number </label>

                            <input 
                                className="input" 
                                type="text"
                                id="phone"
                                aria-describedby="phoneHelp"
                                placeholder="<Area code><Phone number>"
                                value={this.state.phone}
                                onChange={this.onInputChange}

                            />
                            </p>
                        </div>
                        <div className="field">
                            <p className="control">
                            <label htmlFor ="fullname">Full Name </label>
                            <input 
                                className="input" 
                                type="text"
                                id="fullname"
                                aria-describedby="fullnameHelp"
                                placeholder="<First Name>< ><Last Name>"
                                value={this.state.fullname}
                                onChange={this.onInputChange}
                            />
                            </p>
                        </div>
                        <div className="field">
                            <p className="control">
                            <Button disabled = {!this.state.phone} variant = "contained" color = "primary" type= "submit" className="button is-success" >
                                LETS GO!
                            </Button>
                            </p>
                        </div>
                    </form>
                </div>
            </section>
        );
    }
}


export default Signup;
import React, {Component} from 'react'
import {Auth} from "aws-amplify"
import '../App.css';
import { Redirect } from 'react-router-dom';

export default class Navbar extends Component {
    
    

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
            

    }   
    render(){
        return (
            <nav className="navbar" role="navigation" aria-label="main navigation">


                <div className = "navbar-end">
                    <div className = "navbar-item ">
                        {this.props.auth.isAuthenticated && this.props.auth.user && this.props.auth.user.attributes &&(
                            <p>
                            Hello {this.props.auth.user.attributes.name}! 
                            

                            </p>
                        )}
                        <div className = "buttons">
                            {!this.props.auth.isAuthenticated &&(
                                <div>
                                
                                    <a href = "/register" className = "button is-primary">
                                        <strong>Register</strong>
                                    </a>
                                    <br></br>
                                    <a href = "/login" className = "button is-primary">
                                        <strong>Login</strong>
                                    </a>

                                </div>

                            )}

                            
                            {this.props.auth.isAuthenticated &&(
                                <div>
                                    <a href = "/" className = "button is-primary" onClick= {this.handleLogout}>
                                    <strong>Log Out</strong>

                                    </a>
                                </div>
                            )}
                        </div>

                    </div>
                </div>
            </nav>
        )
    }   
}

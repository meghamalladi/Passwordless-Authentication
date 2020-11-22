import React, {Component} from 'react'
import {Auth} from "aws-amplify"
import { Button } from "element-react";
import '../App.css';

export default class Navbar extends Component {
    
    
    // handleLogout  = async event =>{
    //     event.preventDefault();

    //     try{
    //         await Auth.signOut();
    //         this.props.auth.setAuthStatus(false);
    //         this.props.auth.setUser(null);
    //         console.log(this.props.isAuthenticated)
    //     }catch(error){
    //     console.log(error.message);
    //     }
    //     this.props.history.push("/login")
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
            {/* <div className="navbar-brand">
            <a className="navbar-item" href="/">
                <img src="hexal-logo.png" width="112" height="28" alt="hexal logo" />
            </a>
            </div> */}

                <div className = "navbar-end">
                    <div className = "navbar-item ">
                        {this.props.auth.isAuthenticated && this.props.auth.user && (
                            <p>
                            Hello {this.props.auth.user.username}!
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
                                // <Button href = "/" variant= "contained" color = "primary" onClick = {this.handleLogout} >Logout</Button> 

                                <a href="/" onClick= {this.handleLogout} className = "button is-primary">
                                <strong>Log Out</strong>

                                </a>
                            )}
                        </div>

                    </div>
                </div>
            </nav>
        )
    }   
}

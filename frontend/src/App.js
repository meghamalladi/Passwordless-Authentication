import React, { Component } from 'react';
import Login from "./components/login/Login.js";
import Signup from "./components/signup/Signup.js";
import PasswordInput from "./components/login/PasswordInput.js"
import Home from "./components/Home.js"
import './App.css';
import Navbar from './components/Navbar';
import { Auth } from "aws-amplify";

import { BrowserRouter as Router, Route, Switch} from 'react-router-dom';


class App extends Component{
    state={
        isAuthenticated : false, //if the user has been authenticated 
        isAuthenticating : true, //till the user has been authenticated
        isReady : false, //state between password input and login page
        user : null
    }

    setAuthStatus= authenticated => {
        this.setState({isAuthenticated : authenticated})
    }

    setUser = user => {
        this.setState({user: user});
      }
    
    setReady = ready =>{
      this.setState({isReady: ready});

    }
    
    async componentDidMount(){
        try{

          const session = await Auth.currentSession();
          this.setAuthStatus(true);
          console.log(session);
          const user = await Auth.currentAuthenticatedUser(); 
          this.setUser(user);
        }catch(error){
          console.log(error.message);
        }

        this.setState({isAuthenticating: false});
    }

    render(){
      const authProps = {
        isAuthenticated: this.state.isAuthenticated,
        isAuthenticating: this.state.isAuthenticating,
        isReady: this.state.isReady,
        user: this.state.user,
        setAuthStatus: this.setAuthStatus,
        setUser: this.setUser,
        setReady: this.setReady
      }
      return (
        !this.state.isAuthenticating && 
        <div className= "App">
          <Router>
            <div>
              <Navbar auth= {authProps} />
              <Switch>
                <Route exact path="/" render ={(props) => <Home {...props} auth = {authProps} /> } />
                <Route exact path = "/login" render= {(props)=> <Login {...props} auth = {authProps} /> } />
                <Route exact path="/register" render = {(props)=> <Signup {...props} auth = {authProps} /> }  />
                <Route exact path="/passwordInput" render = {(props)=> <PasswordInput {...props} auth = {authProps} /> }  /> 

              </Switch>
            </div>
          </Router>
        </div>
      )
    }

}
export default App;

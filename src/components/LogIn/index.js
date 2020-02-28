import React from 'react';
import './index.css';

import { Redirect} from "react-router-dom";

//import ChatContainer from '../ChatContainer';

class LogIn extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            loggedIn: false,
            username: 'hadar',
            pass: 'hadar1234',
            getUserUserName: '',
            getPassword: ''
        }
    }

    handleGetUserNameFromInput = (e) => {
        this.setState({
            getUserUserName: e.target.value
        });
    }

    
    handleGetPasswordFromInput = (e) => {
        this.setState({
            getPassword: e.target.value
        });

        if(this.state.getUserUserName == this.state.username && this.state.getPassword == this.state.pass) {
            this.setState({

            });
        }
    }

    handleLogInClick = (e) => {
       
        if(this.state.getUserUserName == this.state.username && this.state.getPassword == this.state.pass) {
     
                this.setState({
                    loggedIn: true,
                    getUserUserName: '',
                    getPassword: ''
                })
           
        } else {
            alert('wrong username or password');
            this.setState({
                getUserUserName: '',
                getPassword: ''
            });
        }
    }

  


    render() {
        //console.log(this.state.loggedIn);
        if(this.state.loggedIn) {
           return <Redirect to="/chatcontainer" /> 
        }
        return(
            <div className="form-container">
                
                <h3 className="login-form-title">Log In To Your Chat Account</h3>
                <div className="form-group">
                    <label for="exampleInputEmail1">username or email address</label>
                    <input onChange={this.handleGetUserNameFromInput} value={this.state.getUserUserName} type="text" className="form-control" id="exampleInputEmail1" aria-describedby="emailHelp" />
                    
                </div>
                <div className="form-group">
                    <label for="exampleInputPassword1">Password</label>
                    <input onChange={this.handleGetPasswordFromInput} value={this.state.getPassword} type="text" className="form-control" id="exampleInputPassword1" />
                </div>

                <button onClick={this.handleLogInClick} type="button" className="btn btn-primary">Submit</button>
                
            </div>
        );
    }
}

export default LogIn;


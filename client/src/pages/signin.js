import { React, Component } from "react";
import {Navigate} from "react-router-dom";



const AUTH_FAILED = "Bad username or password, please retry";
const NO_PASSWORD = "You need to enter a password";


class SignIn extends Component {


    constructor(props) {

        super(props);

        this.state = {
            username: "",
            password: "",
            auth:     false, // if auth was successfull
            badAuth:  false,
            errorMsg: null 
        };

        this.handleSubmit = this.handleSubmit.bind(this);
        this.handleUnameChange = this.handleUnameChange.bind(this);
        this.handlePwrdChange = this.handlePwrdChange.bind(this);
        this.handleKeyDown = this.handleKeyDown.bind(this);
    }


    getPassInput() { return this.state.password; }
    getErrMsg() { return this.state.errorMsg; }

    handleSubmit(event) {
        
        if (event != null) {
            event.preventDefault();
        }

        if (this.getPassInput() === "") {

            this.setState({badAuth: true, errorMsg: NO_PASSWORD});

        } else {


            var body = {
                username: this.state.username,
                password: this.state.password,
                utype: "username" 
            };

            fetch("/signin",{
                method: 'POST',
                headers: {
                    'Content-Type' : 'application/json'
                },
                body: JSON.stringify(body)

                })
                .then(response => {

                    if(response.ok) {
              
                        this.setState({auth: true});
                        
                        return response.json()

                    } else {

                        this.setState({badAuth: true, errorMsg: AUTH_FAILED});
                    }
                    }
                ).then( data => {

                    //localStorage.setItem("token",data["token"]);
                    localStorage.setItem("user", this.state.username);

                    
                }

                );
        }
    }

    handleUnameChange(event) {
       
        event.preventDefault();
        
      
        this.setState({username: event.target.value });

    }

    handlePwrdChange(event) {
       
        event.preventDefault();
        
        this.setState({password: event.target.value})

    }

    handleKeyDown(event) {
       
        
        if (event.key === "Enter") {

            this.handleSubmit();

        }
        
    }
   

    render() {

        if (this.state.auth) {
            
            return <Navigate to="/home" />;

        }

        return (
            <div>
                {this.state.badAuth &&  <p color="Red">{this.getErrMsg()}</p>}
                <div>
             
                    <label>username: </label>
                    <input 
                        type="text" 
                        value={this.state.username} 
                        onChange={this.handleUnameChange} 
                        onKeyDown={(e) => this.handleKeyDown(e)}
                        />
        
                </div>

                <div>
             
                    <label>password: </label>
                    <input 
                        type="text"
                        value={this.state.password} 
                        onChange={this.handlePwrdChange}
                        onKeyDown={(e) => this.handleKeyDown(e)}
                        />
 
                </div>

                <button type="button" onClick={this.handleSubmit}>Connect</button>
            </div>
        );
    }
}

export default SignIn;
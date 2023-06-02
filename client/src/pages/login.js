import { React, useEffect, Component } from "react";
import { Route} from "react-router";
import Index from "./index";


class Login extends Component {


    constructor(props) {

        super(props);

        this.state = {
            username: "",
            password: "",
            auth:     false,
            badAuth:  false
        };

        this.handleSubmit = this.handleSubmit.bind(this);
        this.handleUnameChange = this.handleUnameChange.bind(this);
        this.handlePwrdChange = this.handlePwrdChange.bind(this);

    }

    handleSubmit() {

        fetch("/login",{
            method: 'POST',
            headers: {
                'Content-Type' : 'application/json'
            },
            body: JSON.stringify(this.state)

            })
            .then(response => {

                if(response.ok) {
              
                    this.setState({auth: true});

                } else {

                    this.setState({badAuth: true});
                }

            })
            
    }

    handleUnameChange(event) {

        this.setState({username: event.target.value, password: this.state.password});

    }

    handlePwrdChange(event) {

        this.setState({username: this.state.username, password: event.target.value})

    }

   

    render() {

        if (this.state.auth) {
            
            window.location = "/";

        }

        return (
            <div>
                {this.state.badAuth &&  <a color="red">Bad username or password, please retry</a>}
                <form onSubmit={this.handleSubmit}>
             
                    <label>username: </label>
                    <input type="text" value={this.state.username} onChange={this.handleUnameChange} />
        
                </form>

                <form onSubmit={this.handleSubmit}>
             
                    <label>password: </label>
                    <input type="text" value={this.state.password} onChange={this.handlePwrdChange} />
 
                </form>

                <button onClick={this.handleSubmit}>Connect</button>
            </div>
        );
        
        

    }


}






export default Login;
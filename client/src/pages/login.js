import { React, useEffect, Component } from "react";


class Login extends Component {


    constructor(props) {

        super(props);

        this.state = {
            username: "",
            password: ""
        };

        this.handleSubmit = this.handleSubmit.bind(this);
        this.handleUnameChange = this.handleUnameChange.bind(this);
        this.handlePwrdChange = this.handlePwrdChange.bind(this);

    }

    handleSubmit(event) {

        fetch("/test",{
            method: 'POST',
            headers: {
                'Content-Type' : 'application/json'
            },
            body: JSON.stringify(this.state)

        })
            .then(response => {

                if(response.ok) {
                    return response.text()

                }

            })
            .then(
                data => {

                    alert("you send this:" + data);

                }
            );

        event.preventDefault();


    }

    handleUnameChange(event) {

        this.setState({username: event.target.value, password: this.state.password});

    }

    handlePwrdChange(event) {

        this.setState({username: this.state.username, password: event.target.value})

    }

   

    render() {

        return (
            <div>
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
        )
    }


}






export default Login;
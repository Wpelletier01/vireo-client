import React,{useState} from "react";
import {useNavigate} from "react-router-dom";
import ErrorPage from "./error";

import "../style/login.css";


const AUTH_FAILED = "Bad username or password, please retry";
const NO_PASSWORD = "You need to enter a password";

//TODO: implement forgot password


function SignIn() {


    const navigate = useNavigate();

    const [errorCode,setErrorCode] = useState(0);
    const [username,setUsername] = useState('');
    const [password,setPassword] = useState('');
    const [isConnect, setIsConnect] = useState(false);
    const [errMsg,setErrMsg] = useState('');

    const submit = async (event) => {

        event.preventDefault();

        if (username !== '' && password !== '') {
            var body = {
                "username": username,
                "password": password
            };

            const response = await fetch("/sign_in",{
                method: 'POST',
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify(body)
            });

            if(!response.ok) {
                console.log(await response.text());

                if (response.status === 403) {

                    setErrMsg("Too many attemp, please try later");

                } else if (response.status === 401){

                    setErrMsg("wrong username or password");

                } else {

                    setErrorCode(response.status);

                }


            } else {

                const data = await response.json();
                localStorage.setItem('token',data['response']['vtoken']);
                localStorage.setItem('user',username);
                setIsConnect(true)

            }

    
        } else if (username === '' && password !== '') {
            setErrMsg("Username require");
        } else if (username !== '' && password === '') {
            setErrMsg('password require');
        }


    }

    if (isConnect) {

        navigate("/home");
        
    }

    if (errorCode !== 0) {

        return <ErrorPage code={errorCode}/>;
    }

    return (
        <div className="main">
            <p className="sign" align="center">Sign in</p>
            <form className="form1">
                {(errMsg !== '') && <p className="error-msg">{errMsg}</p>}
                <input className="un " type="text" align="center" placeholder="Username" onChange={e => setUsername(e.target.value)}/>
                <input className="pass" type="password" align="center" placeholder="Password" onChange={e => setPassword(e.target.value)}/>
                <button type="submit" className="submit" align="center" onClick={submit}>Sign in</button>
                <p className="forgot" align="center"><a href="/">Forgot Password?</a></p>
            </form>
 
        </div>
    );



}







export default SignIn;
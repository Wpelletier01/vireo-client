import React, { useState } from "react";
import { Navigate } from "react-router-dom";


import "../style/signup.css";


const MAX_NAME_LENGTH = 25; 
const MAX_EMAIL_LENGTH = 100;
const MAX_PASSWORD_LENGTH = 50;

const WARNING = 1;
const ERROR = 2;
const ERROR_BORDER_COLOR = "red";
const NORMAL_BORDER_COLOR = "#94a1b2";

const ERROR_NAME_LENGTH = "Cant have more than 25 characters";



function generateDay() {

    var options = [];

    for (let i=1;i <= 31; i++) {

        options.push({value: i, label: i});
    }

    return options;

}

function generateMonth() {

    var options = [];
    for (let i=1;i <= 12; i++) {

        options.push({value: i, label: i});
    }

    return options;

}

function generateYear() {

    var options = [];

    var today = new Date()

    for (let i=1940; i <= today.getFullYear(); i++) {

        options.push({value: i, label: i});

    }

    return options.reverse();

}



function handleInputChange(nvalue,color) {

    var content = "";
    var err = "";
    var color = "";

    if (nvalue.length <= MAX_NAME_LENGTH) {
        
        color = NORMAL_BORDER_COLOR;
        content = nvalue;

    } else {

        err = ERROR_NAME_LENGTH;
        color = ERROR_BORDER_COLOR;
    }

    return {
        "content": content,
        "errMsg":  err,
        "color":   color
    };


}




function SignUp() {


    const [fname,setFname] = useState("");
    const [errFname,setErrFname] = useState("");
    const [fnameBorderClr,setFnameBorderClr] = useState(NORMAL_BORDER_COLOR);

    const [mname,setMname] = useState("");
    const [errMname,setErrMname] = useState("");
    const [mnameBorderClr,setMnameBorderClr] = useState(NORMAL_BORDER_COLOR);

    const [lname,setLname] = useState("");
    const [errLname,setErrLname] = useState("");
    const [lnameBorderClr,setLnameBorderClr] = useState(NORMAL_BORDER_COLOR);

    const [uname,setUname] = useState("");
    const [errUname,setErrUname] = useState("");
    const [unameBorderClr,setUnameBorderClr] = useState(NORMAL_BORDER_COLOR);

    const [email,setEmail] = useState("");
    const [errEmail,setErrEmail] = useState("");
    const [emailBorderClr,setEmailBorderClr] = useState(NORMAL_BORDER_COLOR);


    const [errBirthday,setErrBirthday] = useState("");

    const [password,setPassword] = useState("");
    const [errPassword,setErrPassword] = useState("");
    const [passwordBorderClr,setPasswordBorderClr] = useState(NORMAL_BORDER_COLOR);


    const [rpassword,setRpassword] = useState("");
    const [errRpassword,setErrRpassword] = useState("");
    const [rpasswordBorderClr,setRpasswdBorderClr] = useState(NORMAL_BORDER_COLOR);

    const [month,setMonth] = useState("");
    const [year,setYear] = useState("");
    const [day,setDay] = useState("");

    const [submitErr, setSubmitErr] = useState("");

    const handleFname = (event) => {

        event.preventDefault();

        var response = handleInputChange(event.target.value,fnameBorderClr);

        setFname(response.content);
        setErrFname(response.errMsg);
        setFnameBorderClr(response.color);

    }

    const handleMname = (event) => {
        event.preventDefault();

        var response = handleInputChange(event.target.value,mnameBorderClr);

        setMname(response.content);
        setErrMname(response.errMsg);
        setMnameBorderClr(response.color);

    }

    const handleLname = (event) => {
        event.preventDefault();

        var response = handleInputChange(event.target.value,lnameBorderClr);

        setLname(response.content);
        setErrLname(response.errMsg);
        setLnameBorderClr(response.color);

    }

    const handleUname = (event) => {
        event.preventDefault();

        var response = handleInputChange(event.target.value,unameBorderClr);

        setUname(response.content);
        setErrUname(response.errMsg);
        setUnameBorderClr(response.color);

    }

    const handleEmail = (event) => {
        event.preventDefault();

        if (event.target.value.length <= MAX_EMAIL_LENGTH) {

            setErrEmail("");
            setEmailBorderClr(NORMAL_BORDER_COLOR);
            setEmail(event.target.value);


        } else {
            setEmailBorderClr(ERROR_BORDER_COLOR);
            setErrEmail("sorry your email is too long");

        }

    }

    const handleNpasswd = (event) => {
        event.preventDefault();

        if (event.target.value.length <= MAX_PASSWORD_LENGTH ) {

            setErrPassword("");
            setPasswordBorderClr(NORMAL_BORDER_COLOR);
            setPassword(event.target.value);


        } else {
            setPasswordBorderClr(ERROR_BORDER_COLOR);
            setErrPassword("sorry your password is too long");

        }


    }
    const handleRpasswd = (event) => {
        event.preventDefault();

        setTimeout(function() {

            if (event.target.value === password) {
                setErrRpassword("");
                setRpasswdBorderClr(NORMAL_BORDER_COLOR);
                setRpassword(event.target.value);
    
            } else {
    
                setErrRpassword("Password Different");
                setRpasswdBorderClr(ERROR_BORDER_COLOR);
    
            }


        },500);


    }


    const haveErrMsg = () => {

        if (errFname !== "") {
            return true;
        }

        if (errMname !== "") {
            return true;
        }
        // middle name is optional

        if (errLname !== "") {
            return true;
        }

        if (errUname !== "") {
            return true; 
        }

        if (errEmail !== "") {
            return true;
        }

        if (errPassword !== "" ) {
            return true;
            
        }

        if (errRpassword !== "") {
            return true;
        }

        return false;


    }


    const checkEmptyField = () => {

        var msg = "";

        if (fname === "" ) {
            msg = `${msg}First name is require\n`;
        }

        if (lname === "") {
            msg = `${msg}Last name is require\n`;
        } 

        if (uname === "") {
            msg = `${msg}Username is require\n`;
        } 

        if (email === "") {
            msg = `${msg}Email is require\n`;
        }

        if (password === "") {
            msg = `${msg}Password is require\n`;
        }

        if (rpassword === "") {
            msg = `${msg}You need to reenter your password\n`;
        }

        return msg

    }

    const validateNameValue = () => {

        var msg = "";
        var re = /[/*()\\:{}|<>]/i;


        if (re.test(fname)) {
            msg = `${msg}First name contain invalid character\n`;
        }

        if (mname !== "") {

            if (re.test(mname)) {
                msg = `${msg}Middle name contain invalid character\n`;
            }
    
        }

        if (re.test(lname)) {
            msg = `${msg}Last name contain invalid character\n`;
        }
        
        if (re.test(uname)) {
            msg = `${msg}Username contain invalid character\n`;
        }

        if (msg !== "") {
            msg = `${msg}Name cant contain those character: /, *, (, ), \\, :, {, }, |, <, >\n`;

        }

        return msg;
        

    }


    const submit = (event) => {

        event.preventDefault();

        if (haveErrMsg()) {
            setSubmitErr("correct the error first");
            return;
        } 
            
        setSubmitErr("");

        var emsg = checkEmptyField();

        if (emsg !== "") {

            setSubmitErr(emsg);
            return;
        } 

        var validNameMsg = validateNameValue();
                
        if (validNameMsg !== "") {
            setSubmitErr(validNameMsg);
            return;
        }

        if ( !email.includes("@") || !email.includes(".") ) {
            setErrEmail("You must enter a valid email");
            return;
        }


        //TODO: set password requirement 
        
    

    }


    
    return (
        <div className="main-signup">

            <p className="title">Create account</p>
            <p className="submit-err">{submitErr}</p>
            <form method="post" action="#">
                <p className="error-row">{errFname}</p>
                <div> 
                    <input 
                        style={{borderColor: fnameBorderClr}} 
                        className="signup-input" 
                        type="text" 
                        placeholder="First Name" 
                        onChange={handleFname}/> 
                </div>
                <p className="error-row">{errMname}</p>
                <div>
                    <input 
                        style={{borderColor: mnameBorderClr}}
                        className="signup-input" 
                        type="text" 
                        placeholder="Middle Name (optional)"
                        onChange={handleMname}/>
                </div>
                <p className="error-row">{errLname}</p>
                <div>
                    <input
                        style={{borderColor: lnameBorderClr}}
                        className="signup-input" 
                        type="text" 
                        placeholder="Last Name"
                        onChange={handleLname}/>
                </div>
                <p className="error-row">{errUname}</p>
                <div>
                    <input 
                        style={{borderColor: unameBorderClr}}
                        className="signup-input" 
                        type="text" 
                        placeholder="Username"
                        onChange={handleUname}/>
                </div>
                <p className="error-row">{errEmail}</p>
                <div>
                    <input
                        style={{borderColor: emailBorderClr}}
                        className="signup-input" 
                        type="text" 
                        placeholder="Email"
                        onChange={handleEmail}/>
                </div>
                <p className="error-row">{errPassword}</p>
                <div>
                    <input
                        style={{borderColor: passwordBorderClr}}
                        className="signup-input" 
                        type="text" 
                        placeholder="new password"
                        onChange={handleNpasswd}
                    />
                </div>
                <p className="error-row">{errRpassword}</p>
                <div>
                    <input 
                        style={{borderColor: rpasswordBorderClr}}
                        className="signup-input" 
                        type="text" 
                        placeholder="retype password"
                        onChange={handleRpasswd}/>
                </div>
                <p className="error-row">{errBirthday}</p>
                <div className="sel-div">
                    <select onChange={e => setYear(e.target.value)}>
                        <option disabled selected hidden>Year</option>
                        {generateYear().map((option,index) => <option key={index} value={option.value}>{option.value}</option>)}

                    </select>
                    <select onChange={e => setMonth(e.target.value)}>
                        <option disabled selected hidden>Month</option>
                        {generateMonth().map((option,index) => <option key={index} value={option.value}>{option.value}</option>)}
                    </select>
                    <select onChange={e => setDay(e.target.value)}>
                        <option disabled selected hidden>Day</option>
                        {generateDay().map((option,index) => <option key={index} value={option.value}>{option.value}</option>)}
                    </select>

                </div>


                <button type="submit" onClick={submit}>Create</button>
        

            </form>

        </div>
        

    );


}


export default SignUp;


import { React, Component } from "react";
import Select from "react-select";

const MAX_NAME_LENGTH = 25; // username also
const WARNING = 1;
const ERROR = 2;

function WarnNameLength(nameType) {

    return "Your " + nameType + "name must be contains between 1 and 25 character";

}



function genetateDay() {

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


class MsgType {

    constructor(msg,type) {

        this.msg = msg;
        this.type = type;

    }

    getType() { return this.type;   }
    getMsg()  { return this.msg;    }


}


class FeedbackState {

    constructor() {

        // first name
        this.Fname = null;
        // middle name
        this.mname = null;
        // last name
        this.lname = null;
        // username
        this.uname = null;
        // birthday
        this.birthday = null;
        // email  
        this.email = null;
        // password complexity
        this.password = null;
        

    }

    haveWarnMsg() {

        if (this.fname != null && this.fname.type === WARNING) {
            return true;
        } 
        if (this.mname != null && this.mname.type === WARNING) {
            return true;
        } 
        if (this.lname != null && this.lname.type === WARNING) {
            return true;
        } 
        if (this.uname != null && this.uname.type === WARNING) {
            return true;
        } 
        if (this.birthday != null && this.birthday.type === WARNING) {
            return true;
        } 
        if ( this.email != null && this.email.type === WARNING) {
            return true;
        } 
        if (this.password != null && this.password.type === WARNING) {
            return true;
        } 

        return false;

    }

    haveErrorMsg() {

        if (this.fname != null && this.fname.type === ERROR) {
            return true;
        } 
        if (this.mname != null && this.mname.type === ERROR) {
            return true;
        } 
        if (this.lname != null && this.lname.type === ERROR) {
            return true;
        } 
        if (this.uname != null && this.uname.type === ERROR) {
            return true;
        } 
        if (this.birthday != null && this.birthday.type === ERROR) {
            return true;
        } 
        if ( this.email != null && this.email.type === ERROR) {
            return true;
        } 
        if (this.password != null && this.password.type === ERROR) {
            return true;
        } 

        return false;

    }


    formatWarning() {

        if (!this.haveWarnMsg()) {

            return null;

        }

        return (
            <div>
                <h3>Warning:</h3>
                {(this.fname != null && this.fname.getType() === WARNING) && 
                <p>&emsp;- {this.fname.getMsg()}</p>}

                {(this.mname != null && this.mname.getType() === WARNING) && 
                <p>&emsp;- {this.mname.getMsg()}</p>}

                {(this.lname != null && this.lname.getType() === WARNING) && 
                <p>&emsp;- {this.lname.getMsg()}</p>}

                {(this.uname != null && this.uname.getType() === WARNING) && 
                <p>&emsp;- {this.uname.getMsg()}</p>}

                {(this.birthday != null && this.birthday.getType() === WARNING) && 
                <p>&emsp;- {this.birthday.getMsg()}</p>}

                {(this.email != null && this.email.getType() === WARNING) && 
                <p>&emsp;- {this.email.getMsg()}</p>}

                {(this.password != null && this.password.getType() === WARNING) && 
                <p>&emsp;- {this.password.getMsg()}</p>}

            </div>

        );

    }

    

    formatErr() {

        if (!this.haveErrorMsg()) {
            
            return null;

        }

        return (
            <div>
                <h3>Error:</h3>
                {(this.fname != null && this.fname.getType() === ERROR) && 
                <p>{this.fname.getMsg()}</p>}

                {(this.mname != null && this.mname.getType() === ERROR) && 
                <p>{this.mname.getMsg()}</p>}

                {(this.lname != null && this.lname.getType() === ERROR) && 
                <p>{this.lname.getMsg()}</p>}

                {(this.uname != null && this.uname.getType() === ERROR) && 
                <p>{this.uname.getMsg()}</p>}

                {(this.birthday != null && this.birthday.getType() === ERROR) && 
                <p>{this.birthday.getMsg()}</p>}

                {(this.email != null && this.email.getType() === ERROR) && 
                <p>{this.email.getMsg()}</p>}

                {(this.password != null && this.password.getType() === ERROR) && 
                <p>{this.password.getMsg()}</p>}

            </div>

        );

    }

    format() {

        var err = this.formatErr();
        var warn = this.formatWarning();

 
        if (err == null && warn == null) {
            return null;
        }
    
        return (

            <div>
                {(warn != null) && warn}
                {(err != null) && err}
            </div>


        );


    }


}


class SignUpInput {

    constructor() {

        this.fname = "";
        this.mname = "";
        this.lname = "";
        this.uname = "";
        this.day = null;
        this.month = null;
        this.year = null;
        this.email = "";
        this.password = "";

    }

    setFname(input) {

        this.fname = input;

    }

    to_json() {

        return {

            names: {

                fname: this.fname,
                mname: this.mname,
                lname: this.lname 

            },

            uname: this.uname,
            
            birthday: {
                month: this.month,
                day: this.day,
                year: this.year

            },

            email: this.email,
            password: this.password

        };


    }


}


class SignUp extends Component {

    constructor(props) {

        super(props);

        this.state = {

            input: new SignUpInput(),
            feedback: new FeedbackState(),
            days: genetateDay(),
            months: generateMonth(),
            years:  generateYear(),
            password: "",
            npassword: "",
            samePasswd: null,
    
        };

        this.handleNameEvent = this.handleNameEvent.bind(this);
        this.handleInputChange = this.handleInputChange.bind(this);
        this.submit = this.submit.bind(this);

    }

    changMsgState(atrib,msg) {

        this.setState(
            previous => {

                previous.feedback[atrib] = msg;

                return {
                    ...previous
                }

            }
        );

    }

    handleNameEvent(event,attrib,name) {

        event.preventDefault();

        var input = event.target.value;

        if (input.length > MAX_NAME_LENGTH) {
            
            this.changMsgState(attrib,new MsgType(WarnNameLength(name),WARNING));
            
        } else {

            if (this.state.feedback.mname != null) {
                this.changMsgState(attrib,null);
            }
         
        }

        this.setState(previous => {

            previous.input[attrib] = input;
            
            return {...previous};

        });

    }

    handleInputChange(event,field) {

        if (field === "npassword") {

            event.preventDefault();

            this.setState(previous => {

                previous.npassword = event.target.value;
                
                return {...previous};
             
            });

        } else if (field === "password") {

            event.preventDefault();
            this.setState(previous => {

                previous.password = event.target.value;
                
                return {...previous};
             
            });

        } else if (["month","day","year"].includes(field)){

            
            this.setState(previous => {

                previous.input[field] = event["value"];
            
                return {...previous};
         
            });


        } else {

            event.preventDefault();
            this.setState(previous => {

                previous.input[field] = event.target.value;
                
                return {...previous};
             
            });


        }


    }

    getFname() { return this.state.input.fname;  }
    getMname() { return this.state.input.mname;  }
    getLname() { return this.state.input.lname;  }
    getUname() { return this.state.input.uname;  }


    validateInput() {

        var valid = true;

        if (this.state.npassword !== this.state.password) {

            this.changMsgState("password",new MsgType("Make sure to enter the same password",ERROR))
            
            valid =  false;

        }

        if(!this.state.input.email.includes("@") || !this.state.input.email.includes(".")) {

            this.changMsgState("password",new MsgType("Enter a valid email",ERROR));
            
            valid = false;


        }
       

        if(this.getFname().length <= 1 || this.getFname().length > MAX_NAME_LENGTH ) {

            this.changMsgState("fname",new MsgType("your first name must be 1 character and no more than 25",ERROR));
            valid = false;

        }

        if(this.getMname().length > MAX_NAME_LENGTH ) {

            this.changMsgState("mname",new MsgType("your middle name must be 1 character and no more than 25",ERROR));
            valid = false;
            
        }
      
        if(this.getLname().length <= 1 || this.getLname().length > MAX_NAME_LENGTH ) {
           
            this.changMsgState("lname",new MsgType("your last name must be 1 character and no more than 25",ERROR));
            valid = false;
            
        }

        if(this.getUname().length <= 1 || this.getUname().length > MAX_NAME_LENGTH ) {

            this.changMsgState("uname",new MsgType("your username must be 1 character and no more than 25",ERROR));
            valid =  false;
            
        }

        
        var today = new Date();
        //TODO: validate that the date exist
        
        if (this.state.input.year >= today.getFullYear() - 14) {

            this.changMsgState("birthday",new MsgType("you must be at least 14 teen to create an account",ERROR));
            
            valid = false;
        }
        
        



        return valid; 

    }

    submit() {

        if(this.validateInput()) {

            fetch("/signup",
                {
                    method: "POST",
                    headers: {
                        'Content-Type' : 'application/json'
                    },
                    body: JSON.stringify(this.state.input.to_json())
                }
            )


        } else {

            console.log("monke")
        }

    }


    render() {

        var msg = this.state.feedback.format();

        return (

            <div>

                {(msg != null) && msg }

                <div>
                    <label>first name:</label>
                    <input type="text" onChange={e => {this.handleNameEvent(e,"fname","first ")}}/>
                </div>

                <div>
                    <label>middle name<i>(optional)</i>:</label>
                    <input type="text" onChange={e => {this.handleNameEvent(e,"mname","middle ")}}/>
                </div>

                <div>
                    <label>last name:</label>
                    <input type="text" onChange={e => {this.handleNameEvent(e,"lname","last ")}} />

                </div>

                <div>
                    <label>username</label>
                    <input type="text" onChange={e => {this.handleNameEvent(e,"uname","user")}} />
                </div>

                <div>
                    <label>birthday:</label>

                    <Select options={this.state.months} defaultValue={this.state.months[(new Date().getMonth())]} onChange={ e => {this.handleInputChange(e,"month")}}/>
                    <Select options={this.state.days} defaultValue={this.state.days[(new Date().getUTCDate()) - 1]} onChange={ e => {this.handleInputChange(e,"day")}}/>
                    <Select options={this.state.years} defaultValue={this.state.years[-1*(((new Date().getFullYear()) - 1940)-83)]} onChange={ e => {this.handleInputChange(e,"year")}}/>

                    

                </div>

                <div>
                    <label>email:</label>
                    <input type="text" onChange={ e => {this.handleInputChange(e,"email")}} />

                </div>
                
                <div>
                    <label>password:</label>
                    <input type="text" onChange={ e => {this.handleInputChange(e,"password")}}/>

                </div>

                <div>
                    <label>confirm password:</label>
                    <input type="text" onChange={ e => {this.handleInputChange(e,"npassword")}}/>
                

                </div>

                <button type="button" onClick={this.submit} >Create</button>

            </div>



        )


    }


}


export default SignUp;


import { React, Component } from "react";

const MAX_NAME_LENGTH = 25;// username also
const WARNING = 1;
const ERROR = 2;

function WarnNameLength(nameType) {

    return "Your " + nameType + "name must be contains between 1 and 25 character";

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
                <p> - {this.mname.getMsg()}</p>}

                {(this.lname != null && this.lname.getType() === WARNING) && 
                <p>{this.lname.getMsg()}</p>}

                {(this.uname != null && this.uname.getType() === WARNING) && 
                <p>{this.Fname.getMsg()}</p>}

                {(this.birthday != null && this.birthday.getType() === WARNING) && 
                <p>{this.birthday.getMsg()}</p>}

                {(this.email != null && this.email.getType() === WARNING) && 
                <p>{this.email.getMsg()}</p>}

                {(this.password != null && this.password.getType() === WARNING) && 
                <p>{this.password.getMsg()}</p>}

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
                <p>{this.Fname.getMsg()}</p>}

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
        this.birthday = null;
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
                mm: this.birthday.getMonth(),
                dd: this.birthday.getday(),
                yy: this.birthday.getFullYear()

            },

            email: this.email,
            password: this.password

        }


    }


}


class SignUp extends Component {

    constructor(props) {

        super(props);

        this.state = {

            input: new SignUpInput(),
            feedback: new FeedbackState(),

        }

        this.handleFname = this.handleFname.bind(this);


    }

    changMsgState(atrib,msg ) {

        this.setState(
            previous => {

                previous.feedback[atrib] = msg;

                return {
                    ...previous
                }

            }
        );

    }


    handleFname(event) {

        event.preventDefault();
        
        var input = event.target.value 

        if (input.length > MAX_NAME_LENGTH) {
            
            this.changMsgState("fname",new MsgType(WarnNameLength("first "),WARNING));
            
        } else {

            if (this.state.feedback.fname != null) {
           
                this.changMsgState("fname",null);
            }
         
        }

    }


    render() {

        var msg = this.state.feedback.format();
        
        return (

            <div>

                {(msg != null) && msg }

                <div>
                    <label>first name:</label>
                    <input type="text" onChange={this.handleFname}/>
                </div>

                <div>
                    <label>middle name<i>(optional)</i>:</label>
                    <input type="text"/>
                </div>

                <div>
                    <label>last name:</label>
                    <input type="text"/>

                </div>

                <div>
                    <label>username</label>
                    <input type="text"/>
                </div>

                <div>
                    <label>birthday:</label>
                    <select>
                        <option>MM</option>

                    </select>
                    <select>
                        <option>DD</option>

                    </select>
                    <select>
                        <option>YY</option>
                    </select>

                </div>

                <div>
                    <label>email:</label>
                    <input type="text"/>

                </div>
                
                <div>
                    <label>password:</label>
                    <input type="text"/>

                </div>

                <div>
                    <label>confirm password:</label>
                    <input type="text"/>

                </div>

                <button type="button">Create</button>

            </div>



        )


    }


}


export default SignUp;


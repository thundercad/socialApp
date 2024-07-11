import Navbar from './Navbar.js';
import LoginBox from './LoginBox.js'
import SignUpBox from './SignUpBox.js';
//import pic2 from './../assets/images/logo.png';
import { useState } from 'react';

import './Contact.css'

function Contact(){
    var [isLoginBoxVisible, setLoginBoxVisible] = useState(false);
    const toggleLoginBoxOn = () => {
        setLoginBoxVisible(true);
    }
    const toggleLoginBoxOff = () => {
        setLoginBoxVisible(false);
    }

    var [isSignUPBoxVisible, setSignUpBoxVisible] = useState(false);
    const toggleSignUpBoxOn = () => {
        setSignUpBoxVisible(true);
    }
    const toggleSignUpBoxOff = () => {
        setSignUpBoxVisible(false);
    }


    return (
        <div className="App">


            <Navbar toggleLogin={toggleLoginBoxOn} toggleSignUp={toggleSignUpBoxOn} active_page={2}/>
            <div>
                {isSignUPBoxVisible &&
                    (
                            <SignUpBox toggleSignUp={toggleSignUpBoxOff} />
                    )
                }
                {isLoginBoxVisible &&
                    (
                            <LoginBox toggleLogin={toggleLoginBoxOff} toggleSignUp={toggleSignUpBoxOn} />
                    )
                }
            </div>
            <h1>
                Contact
            </h1>
        </div>
    )
}
export default Contact;
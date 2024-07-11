import "./SignUpBox.css"
import axios from 'axios';
import { useRef, useState } from 'react';
import { Navigate, useNavigate } from "react-router";

function SignUpBox(prop) {
    const navigate = useNavigate();
    const signUp = async (userData) =>{
        const response = await axios.post("http://127.0.0.1:5000/signup", userData);
        if (response.status === 200) {
            navigate("/feed");
            console.log("Sign up successful");
        } else {
            // Handle other possible responses
            console.error("Error:", response.data.message);
        }
    }
    
    const handleSignUp = async () => {
        const formData = new FormData(); // Initialize FormData object

    // Populate FormData object with form field values
    formData.append('email', document.getElementsByName('email')[0].value);
    formData.append('password', document.getElementsByName('psw')[0].value);
    formData.append('username', document.getElementsByName('username')[0].value);
    formData.append('bio', document.getElementsByName('bio')[0].value);

    // Convert FormData object to JSON object
    const jsonObject = {};
    formData.forEach((value, key) => {
        jsonObject[key] = value;
    });

    // Send JSON data in the request body
    try {
        const response = await axios.post("http://127.0.0.1:5000/signup", jsonObject, {
            headers: {
                'Content-Type': 'application/json' // Set content type to JSON
            }
        });
        if (response.status === 200) {
            navigate("/feed");
            console.log("Sign up successful");
        } else {
            // Handle other possible responses
            console.error("Error:", response.data.message);
        }
    } catch (error) {
        console.error("Error:", error);
    }
    }
    
    return (
        <>
            <div className='signupbox-container'>
                <div id="01" className="signup-box-wrapper">
                    <span class="close" title="Close Modal" onClick={prop.toggleSignUp} >&times;</span>
                
                    <h1>Sign Up</h1>
                    <p>Please fill in this form to create an account.</p>
                
                    <div classname="container">
                        <label htmlFor="email"><b>Email</b></label>
                        <input className="signup-input" type="text" placeholder="Enter Email" name="email" required />
                        <br></br>
                        <label htmlFor="psw"><b>Password</b></label>
                        <input className="signup-input" type="password" placeholder="Enter Password" name="psw" required />
                        <br></br>
                        <label htmlFor="psw-repeat"><b>Repeat Password</b></label>
                        <input className="signup-input" type="password" placeholder="Repeat Password" name="psw-repeat" required />
                        <br></br>
                        <label htmlFor="username"><b>Username</b></label>
                        <input className="signup-input" type="text" placeholder="Enter Username" name="username" required />
                        <br></br>
                        <label htmlFor="bio"><b>Bio</b></label>
                        <input className="signup-input" type="text" placeholder="Anything about you" name="bio" required />
                        <br></br>
                    </div>


                    <p>By creating an account you agree to our <a href="#" style={{"color":"dodgerblue"}}>Terms & Privacy</a>.</p>

                    <div classname="container">
                            
                    <button type="button" className="signup_button" onClick={(event) => handleSignUp(event)} >Sign Up</button>

                    </div>
                </div>
            </div>
        </>
    );
}
export default SignUpBox;
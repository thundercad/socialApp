import "./LoginBox.css";
import axios from 'axios';
import { jwtDecode } from "jwt-decode";
import { useRef, useState } from 'react';
import { useNavigate } from "react-router";

function LoginBox(prop) {
    const usernameStr = useRef(null);  
    const passwordStr = useRef(null);  
    const [error, setError] = useState(null);
    const navigate = useNavigate();

    const setLocalStorage = (name, value) => {
        localStorage.setItem(name, value);
    }

    const openSignUp = () =>{
        prop.toggleLogin();
        prop.toggleSignUp();
    }

    const Authenticate = async (e) =>{
        e.preventDefault();
        const username = usernameStr.current.value;
        const password = passwordStr.current.value;
        localStorage.setItem("username",username)
        localStorage.setItem("isLoggedIn",true)
        try {
            const response = await axios.post("http://127.0.0.1:5000/login", {
                username: username,
                password: password
            });

            if (response.status === 200) {
                const token = response.data.access_token;
                const uid=jwtDecode(token).sub
                setLocalStorage("token", token);
                setLocalStorage("u_id",uid)
                navigate("/feed");
            } else {
                console.error("Error:", response.data.message);
            }
        } catch (error) {
            console.error("Error:", error.message);
        }
    }

    return (
        <div className='loginbox-container'>
            <div id="01" className="login-box-wrapper">
                <span className="close" title="Close Modal" onClick={prop.toggleLogin} >&times;</span> 
                <form className="container" onSubmit={Authenticate}>
                    <label htmlFor="uname"><b>Username</b></label>
                    <input ref={usernameStr} className="login-input" type="text" placeholder="Enter Username" name="uname" required />

                    <label htmlFor="psw"><b>Password</b></label>
                    <input ref={passwordStr} className="login-input" type="password" placeholder="Enter Password" name="psw" required />

                    <input type="submit" className="login_button" value={"Login"} />
                </form>
                <button type="submit" className="signup_button" onClick={openSignUp}>Sign Up</button>

                <div className="container">
                    <span className="psw">Forgot <a href="#">password?</a></span>
                </div>
            </div>
        </div>  
    );
}

export default LoginBox;

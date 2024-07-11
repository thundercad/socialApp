import Navbar from './Navbar.js';
import LoginBox from './LoginBox.js'
import SignUpBox from './SignUpBox.js';
import './About.css';
import pic1 from './../assets/images/pic1.jpg';
import logo from './../assets/images/logo.png';
import emailjs from '@emailjs/browser';
import pic2 from './../assets/images/pic2.jpg';
import { useState } from 'react';


function About() {

    var [isLoginBoxVisible, setLoginBoxVisible] = useState(false);
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [stateMessage, setStateMessage] = useState(null);

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

    function openGmailCompose() {
        window.open('https://mail.google.com/mail/u/0/#inbox?compose=new', '_blank');
    }

    const sendEmail = (e) => {
        e.persist();
        e.preventDefault();
        setIsSubmitting(true);
        console.log(e.target);
        // e.target.user_email = "hammadmustafa2003@gmail.com"
        emailjs
            .sendForm(
                "service_pm7y1zp",
                "template_qrutda7",
                e.target,
                "jfNP2XeOXjOi5MI3P"
            )
            .then(
                (result) => {
                    setStateMessage('Message sent!');
                    setIsSubmitting(false);
                    setTimeout(() => {
                        setStateMessage(null);
                    }, 5000); // hide message after 5 seconds
                },
                (error) => {
                    setStateMessage('Something went wrong, please try again later');
                    setIsSubmitting(false);
                    setTimeout(() => {
                        setStateMessage(null);
                    }, 5000); // hide message after 5 seconds
                }
            );

        e.target.reset();
    };
    return (
        <div className="App">


            <Navbar toggleLogin={toggleLoginBoxOn} toggleSignUp={toggleSignUpBoxOn} active_page={1} />
            <div>
                {isSignUPBoxVisible && <SignUpBox toggleSignUp={toggleSignUpBoxOff} />}
                {isLoginBoxVisible && <LoginBox toggleLogin={toggleLoginBoxOff} toggleSignUp={toggleSignUpBoxOn} />}


                <div className='heading' style={{ fontSize: '50px' }} >
                    About Us
                </div>
                <div className='paragraph'>
                    Welcome to our Online Art Gallery! We're a lively hub where artists and art lovers gather to explore creativity and expression. Our digital space is packed with a diverse range of artworks, from stunning paintings to captivating sculptures. Whether you're a seasoned collector or just love discovering new art, you'll find something special here. Dive into our collection, share your own creations, and connect with fellow art enthusiasts. Stay in the loop with our notifications, so you never miss out on the latest updates and events. Join us as we celebrate the beauty and power of art to inspire and bring people together.
                </div>
                <div className='heading' style={{ fontSize: '30px' }} >
                    Our Team
                </div>
                <div className='box_wrapper'>
                    <div className='image'>
                        <img height={300} src={pic1} />
                        <h3>
                            Muhammad Abubakr<br></br>
                        </h3>

                        Front End Developer<br></br>
                    </div>

                    <div className='image'>
                        <img height={300} style={{'marginLeft':'10%'}} src={pic2} />
                        <h3>
                            Hamza Javed<br></br>
                        </h3>

                        Back End Developer<br></br>
                    </div>

                </div>
                


                <footer className='characteristics-box' >
                    <img src={logo} className='charBox-logo' />
                    <div style={{ "flexDirection": "column", "marginLeft": "10%" }}>
                        <h2>What is Online Art Gallery?</h2>
                        <ul>
                            <li>Diverse Art Collection</li>
                            <li>Community Engagement</li>
                            <li>Personalized Experience</li>
                            <li>Stay Updated</li>
                            <li>Inspiration and Exploration</li>
                        </ul>
                    </div>
                    <div style={{ "flexDirection": "column", "marginLeft": "10%" }}>
                        <h2>Our Characteristics</h2>
                        <ul>
                            <li>Artworks Representation</li>
                            <li>User-Friendly Interface</li>
                            <li>Secure Transactions</li>
                        </ul>
                    </div>
                    <div style={{ "flexDirection": "column", "marginLeft": "10%" }}>
                        <h2>Message Us</h2>
                        <ul>
                            <div>
                                <form onSubmit={sendEmail} style={{"border":"none", "display":"flex", "flex-direction":"column"}}>
                                    <label style={{"fontSize":"20px", "fontFamily":"sans-serif"}}>Name</label>
                                    <input type="text" name="user_name" style={{"border-radius":"10px", "padding":"10px"}} />
                                    {/* <label>Email</label> */}
                                    {/* <input type="email" name="user_email" /> */}
                                    <label style={{"fontSize":"20px", "fontFamily":"sans-serif","marginTop":"10%"}}>Message</label>
                                    <textarea name="message" style={{"border-radius":"10px", "padding":"10px"}}  />
                                    <input type="submit" value="Send" disabled={isSubmitting} style={{"border-radius":"10px", "padding":"10px", "marginTop":" 5%"}}  />
                                    {stateMessage && <p>{stateMessage}</p>}
                                </form>
                            </div>
                        </ul>
                    </div>
                </footer>

            </div>


        </div>
    );
}

export default About;
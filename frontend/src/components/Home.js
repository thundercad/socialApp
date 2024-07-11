import LoginBox from './LoginBox.js'
import SignUpBox from './SignUpBox.js';
import Cards from './Cards.js'
import './Home.css';
import Navbar from './Navbar.js';
import { useState } from 'react';

function Home() {

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
       <Navbar toggleLogin={toggleLoginBoxOn} toggleSignUp={toggleSignUpBoxOn} active_page={0}/>
        <div>
          {isSignUPBoxVisible && <SignUpBox toggleSignUp={toggleSignUpBoxOff} />}
          {isLoginBoxVisible && <LoginBox toggleLogin={toggleLoginBoxOff} toggleSignUp={toggleSignUpBoxOn} />}
        </div>
        <Cards/>
    </div>
  );
}

export default Home;

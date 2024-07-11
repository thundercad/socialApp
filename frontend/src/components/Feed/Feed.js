// import Navbar from './Navbar.js';
// import Cards from './Cards.js';
// import './Feed.css';
// import { useState } from 'react';
// import { useNavigate } from "react-router";

// function Feed() {
//   const [error, setError] = useState(null);
//   const navigate = useNavigate();

//   // Extracting username from cookie
//   const cookieString = document.cookie;
//   const usernameCookie = cookieString.split(';').find(cookie => cookie.trim().startsWith('username='));
//   const username = localStorage.getItem("username")
//   console.log(username)

//   const Authenticate1 = async () => {
//     navigate("/create");
//   }

//   const Authenticate2 = async () => {
//     navigate("/feed/message");
//   }


//       const Authenticate3 =async ()=>{
//       navigate("/feed/notifications");
//     }

//   return (
//     <div className="App">
//       <Navbar uname={username} />
//       <Cards />

//       <button onClick={Authenticate2} className="circle2">
//         <div className='message-sign' style={{ "fontSize": "50px" }}>
//           <i className="fa fa-envelope" aria-hidden="true"></i>&nbsp;
//         </div>
//       </button>

//       <button onClick={Authenticate1} className="circle1">
//         <div className='plus-sign' style={{ "fontSize": "50px" }}>
//           +
//         </div>
//       </button>


//       <button onClick={Authenticate3}className='circle3'>
//             <div className='noti-sign' style={{"fontSize":"50px"}}>
//               <i class="fa fa-bell" aria-hidden="true"></i>
//             </div>
//           </button>



//     </div>
//   );
// }

// export default Feed;

import Navbar from './Navbar.js';
import Cards from './Cards.js'
import './Feed.css';
import { useEffect, useRef, useState } from 'react';
import { Navigate, useNavigate } from "react-router";


function Feed() {
  const [error, setError] = useState(null);
  
  const Authenticate1 = async () => {
    navigate("/create");
  }
  const Authenticate2 = async () => {
    navigate("/feed/message");
  }
  const Authenticate3 = async () => {
    navigate("/feed/notifications");
  }
  const cookieString = document.cookie;
  const username=localStorage.getItem("username")
  const navigate = useNavigate();
  useEffect(()=>{
    const loginState = localStorage.getItem("isLoggedIn");

    if(loginState === "false"){
      console.log("inside",loginState);
      navigate("/");
    }
  });

  const [activeTab, setActiveTab] = useState('recommended');

  const toggleTab = (tab) => {
    setActiveTab(tab);
    if(tab=='featured'){
   
      navigate("/featured");
    }
  };

  return (
    <div className="App">


      <Navbar uname={cookieString} />
      {/* <h1 className='recommended'>Recommended</h1>
      <br></br>
      <br></br>  */}
      <br></br>
      <div className="gallery-tabs">
          {/* <button className="gallery-tab active-tab">Recommended</button>
          <button className="gallery-tab">FeaturedArts</button> */}
           <button className={`gallery-tab ${activeTab === 'recommended' ? 'active-tab' : ''}`} onClick={() => toggleTab('recommended')}>
            Recommended
          </button>
          <button className={`gallery-tab ${activeTab === 'featured' ? 'active-tab' : ''}`} onClick={() => toggleTab('featured')}>
            FeaturedArts
          </button>
      </div>

      <Cards />

      <button onClick={Authenticate2} className="circle2" >
        <div className='message-sign' style={{ "fontSize": "50px" }}>
          <i class="fa fa-envelope" aria-hidden="true"></i>&nbsp;
        </div>

      </button>
      {/* <div className="botton"> */}
      <button onClick={Authenticate1} className="circle1" >
        <div className='plus-sign' style={{ "fontSize": "50px" }}>
          +
        </div>

      </button>

      <button onClick={Authenticate3} className='circle3'>
        <div className='noti-sign' style={{ "fontSize": "50px" }}>
          <i class="fa fa-bell" aria-hidden="true"></i>
        </div>
      </button>
      {/* </div> */}



    </div>
  );
}

export default Feed;

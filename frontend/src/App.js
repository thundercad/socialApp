// import Navbar from './components/Navbar.js';
// import LoginBox from './components/LoginBox.js'
// import Cards from './components/Cards.js'
import './App.css';

// import { useState } from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Home from './components/Home.js';
import About from './components/About.js';
import Contact from './components/Contact.js';
import Feed from "./components/Feed/Feed.js";
import Profile from './components/Feed/Profile.js';
import Create from './components/Feed/Create.js';
import Message from './components/Feed/Message.js';
import Notification from './components/Feed/Notification.js';
import FeaturedArt from './components/Feed/FeaturedArt.js';
import SearchArt from './components/Feed/SearchArt.js';
function App() {

  return (
  <>
    <BrowserRouter>
      <Routes>
        <Route path='/' element={<Home/>}/>
        <Route path='/about' element={<About/>}/>
        <Route path='/contact' element={<Contact/>}/>
        <Route path='/feed' element={<Feed/>} />
        <Route path='/profile' element={<Profile/>} />
        <Route path='/create' element={<Create/>}/>
        <Route path='/feed/message' element={<Message/>}/>
        <Route path='/feed/notifications' element={<Notification/>}/>
        <Route path='/search' element={<SearchArt/>}/>
        <Route path='/featured' element={<FeaturedArt/>}/>

      </Routes>
    </BrowserRouter>
  </>
  );
}

export default App;
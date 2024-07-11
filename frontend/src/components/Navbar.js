import logo from './../assets/images/logo.png';
import "./navbar.css"
// import LoginBox from './LoginBox';
// import About from './About';
import { useState } from 'react';
import { Link } from 'react-router-dom';

function Navbar(props){
    const pages = [
        {title: "Home", route:"/"},
        {title: "About", route:"/about"},
    ]
    return(
        <header className="app-header">

            <div className='logo-container'>
            <img src={logo} className='navbar-logo'/>
            <span> Online Art Gallery </span>
            </div>
            <div class="topnav">
                {
                    pages.map((page, index)=>{
                        if(props.active_page == index)
                            return <Link class="active" to={page.route}>{page.title}</Link>
                        else
                            return <Link to={page.route}>{page.title}</Link>
                    })
                }
                {/* <Link class="active" to="/">Home</Link>
                <Link to="/about">About</Link>
                <Link to="/contact">Contact</Link> */}
                
            </div>
            <div>
            <button className='btn-primary' onClick={props.toggleSignUp}> Sign Up </button>
            <button className='btn-sec' onClick={props.toggleLogin}> Log In </button>
            </div>
        </header>
    );
}

export default Navbar;
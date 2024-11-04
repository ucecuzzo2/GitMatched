import React from 'react'; // Correct: no extra spaces
import {Link } from  'react-router-dom';
import "../styles/Header.css";


const Header =() => {
    return (    
        <header className = "header">
            
            <Link to = "/" className = "header-title">
                GitMatched
            </Link>
            <nav className = "header-nav">
                <Link to= "/sign-in" className = "nav-link"> Sign In </Link>
                <Link to = "/mission" className = "nav-link"> Mission </Link>
                <Link to= "/about" className = "nav-link"> About </Link>
            </nav>
        </header>
        
    );
};


export default Header;
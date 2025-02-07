import React, { useState } from 'react';
import { NavLink } from 'react-router-dom';
import './Navbar.css';

const Navbar = () => {
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const [loggedIn, setLoggedIn] = useState(false); 

    // Toggle the menu
    const toggleMenu = () => setIsMenuOpen(!isMenuOpen);

    // Handle login and logout
    const handleAuth = () => {
        setLoggedIn(!loggedIn);
    };

    return (
        <nav className="navbar">
            <div className="navbar-container">
                <div className="logo">
                    <h2>Fitness Buddy</h2>
                </div>  
                <div className="hamburger" onClick={toggleMenu}>
                    {isMenuOpen ? '✖' : '☰'} 
                </div>
                <ul className={`nav-links ${isMenuOpen ? 'active' : ''}`}>
                    <li>
                        <NavLink
                            to="/"
                            className={({ isActive }) => (isActive ? 'active-link' : '')}
                        >
                            Home
                        </NavLink>
                    </li>
                    <li>
                        <NavLink
                            to="/about"
                            className={({ isActive }) => (isActive ? 'active-link' : '')}
                        >
                            About
                        </NavLink>
                    </li>
                    <li>
                        <NavLink
                            to="/contact"
                            className={({ isActive }) => (isActive ? 'active-link' : '')}
                        >
                            Contact
                        </NavLink>
                    </li>
                    {/* Conditionally render Login or Logout */}
                    {!loggedIn ? (
                        <>
                            <li>
                                <NavLink
                                    to="/login"
                                    className={({ isActive }) => (isActive ? 'active-link' : '')}
                                >
                                    Login
                                </NavLink>
                            </li>
                            <li>
                                <NavLink
                                    to="/register"
                                    className={({ isActive }) => (isActive ? 'active-link' : '')}
                                >
                                    Register
                                </NavLink>
                            </li>
                        </>
                    ) : (
                        <li>
                            <button onClick={handleAuth} className="auth-button">
                                Log Out
                            </button>
                        </li>
                    )}
                </ul>
            </div>
        </nav>
    );
};

export default Navbar;

import React from 'react';
import { NavLink } from 'react-router-dom'; 
import './Navbar.css'; 

const Navbar = () => {
    return (
        <nav className="navbar">
            <div className="navbar-container">
                <div className="logo">
                    <h2>Fitness Buddy</h2>
                </div>
                <ul className="nav-links">
                    <li>
                        <NavLink
                            to="/"
                            exact
                            activeClassName="active-link"
                        >
                            Home
                        </NavLink>
                    </li>
                    <li>
                        <NavLink
                            to="/about"
                            activeClassName="active-link"
                        >
                            About
                        </NavLink>
                    </li>
                    <li>
                        <NavLink
                            to="/contact"
                            activeClassName="active-link"
                        >
                            Contact
                        </NavLink>
                    </li>
                    <li>
                        <NavLink
                            to="/login"
                            activeClassName="active-link"
                        >
                            Login
                        </NavLink>
                    </li>
                    <li>
                        <NavLink
                            to="/register"
                            activeClassName="active-link"
                        >
                            Register
                        </NavLink>
                    </li>
                </ul>
            </div>
        </nav>
    );
};

export default Navbar;

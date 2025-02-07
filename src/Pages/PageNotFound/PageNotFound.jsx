import React from "react";
import { NavLink } from "react-router-dom";
import "./PageNotFound.css";

const PageNotFound = () => {
    return (
        <section className="page-not-found">
            <div className="content">
                <h2 className="error-code">404</h2>
                <h4 className="message">Sorry! Page not found</h4>
                <p className="description">
                    Oops! It seems like the page you're trying to access doesn't exist.
                    If you believe there's an issue, feel free to report it, and we'll
                    look into it.
                </p>
                <div className="actions">
                    <NavLink to="/" className="home-link">
                        Return Home
                    </NavLink>
                    <NavLink to="/contact" className="report-link">
                        Report Problem
                    </NavLink>
                </div>
            </div>
        </section>
    );
};

export default PageNotFound;

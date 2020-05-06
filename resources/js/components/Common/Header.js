import React from "react";
import { Link } from "react-router-dom";

const Header = () => (
    <div className="container">
        <nav className="navbar navbar-expand-md navbar-light navbar-laravel">
            <Link className="navbar-brand" to="/">
                <img src="/assets/Logo.png" width="50"></img>
            </Link>
            <button
                className="navbar-toggler"
                type="button"
                data-toggle="collapse"
                data-target="#navbarNav"
                aria-controls="navbarNav"
                aria-expanded="false"
                aria-label="Toggle navigation"
            >
                <span className="navbar-toggler-icon"></span>
            </button>
            <div className="collapse navbar-collapse" id="navbarNav">
                <ul className="navbar-nav">
                    <li className="nav-item lemon-nav-item">
                        <Link className="nav-link" to="/">
                            Clubs
                        </Link>
                    </li>
                    <li className="nav-item lemon-nav-item">
                        <Link className="nav-link" to="/viewAllStudents">
                            Students
                        </Link>
                    </li>
                </ul>
            </div>
        </nav>
    </div>
);

export default Header;

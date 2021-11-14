import React from "react";
import { Link } from "react-router-dom";

//stylesheets
import "./Nav.css";

const Nav = () => {
    return (
        <div className="nav">
            <Link to="/" style={{ textDecoration: "none" }}>
                <h1 className="logo">Pharma</h1>
            </Link>
            <ul className="linklist">
                <li>
                    <Link to="/sell" style={{ textDecoration: "none" }}>
                        <i className="fas fa-dollar-sign fa-2x sale"></i>
                    </Link>
                </li>
                <li>
                    <Link to="/account" style={{ textDecoration: "none" }}>
                        <i className="fas fa-user fa-2x accountlink"></i>
                    </Link>
                </li>
            </ul>
        </div>
    );
};

export default Nav;

import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import { toast } from "react-toastify";

//stylesheets
import "./Login.css";

const Login = () => {
    const [login, setLogin] = useState(null);

    const [username, setUserName] = useState("");
    const [pass, setPass] = useState("");

    const handleUserName = (e) => {
        setUserName(e.target.value);
    };

    const handlePass = (e) => {
        setPass(e.target.value);
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        const data = { username, pass };
        axios
            .post(
                "http://localhost:5000/login",
                { data },
                { withCredentials: true }
            )
            .then((res) => {
                if (res.data.status === true) {
                    setLogin(true);
                } else {
                    setLogin(false);
                }
            })
            .catch((e) => {
                console.log(e);
            });
    };

    useEffect(() => {
        if (login === true) {
            window.location.pathname = "/";
        } else if (login === false) {
            toast.error("Login Failed");
        }
    });

    return (
        <div className="login">
            <h1>Login</h1>
            <form action="" className="loginform" onSubmit={handleSubmit}>
                <input
                    type="text"
                    name="user_name"
                    id="username"
                    className="inputs"
                    placeholder="Enter Username"
                    required
                    onChange={handleUserName}
                />
                <input
                    type="password"
                    name="password"
                    id="password"
                    className="inputs"
                    placeholder="Enter Password"
                    required
                    onChange={handlePass}
                />
                <button type="submit" className="loginbtn">
                    Login
                </button>
            </form>
            <Link to="/register" style={{ textDecoration: "none" }}>
                <h3 className="reglink">Register</h3>
            </Link>
        </div>
    );
};

export default Login;

import React, { useState, useEffect } from "react";
import {
    BrowserRouter as Router,
    Routes,
    Route,
    Navigate,
} from "react-router-dom";
import { toast } from "react-toastify";
import Cookies from "js-cookie";
import axios from "axios";

//components
import Nav from "./components/Nav/Nav";
import Home from "./components/Home/Home";
import Cust from "./components/Cust/Cust";
import Account from "./components/Account/Account";
import Login from "./components/Login/Login";
import Register from "./components/Register/Register";
import Sell from "./components/Sell/Sell";
import Update from "./components/Update/Update";

//stylesheets
import "./App.css";
import "react-toastify/dist/ReactToastify.css";

toast.configure();

function App() {
    const [auth, setAuth] = useState(false);
    const [pharmdata, setPharmData] = useState({});

    useEffect(() => {
        try {
            const token = Cookies.get("jwt_token");
            axios
                .post("http://localhost:5000/auth", { token })
                .then((res) => {
                    setAuth(res.data.status);
                    setPharmData(res.data.pharmdata.data);
                })
                .catch((e) => {
                    console.log(e);
                });
        } catch (e) {
            console.log(e);
        }
    });

    return (
        <Router>
            <div className="App">
                <Nav />
            </div>

            <Routes>
                <Route
                    exact
                    path="/"
                    element={
                        auth ? (
                            <Home pharmdata={pharmdata} />
                        ) : (
                            <Navigate to="/login" />
                        )
                    }
                />
                <Route
                    exact
                    path="/sell"
                    element={auth ? <Cust /> : <Navigate to="/login" />}
                />
                <Route
                    path="/sell/:id"
                    element={
                        auth ? (
                            <Sell pharmdata={pharmdata} />
                        ) : (
                            <Navigate to="/login" />
                        )
                    }
                />
                <Route
                    exact
                    path="/account"
                    element={
                        auth ? (
                            <Account pharmdata={pharmdata} />
                        ) : (
                            <Navigate to="/login" />
                        )
                    }
                />
                <Route
                    exact
                    path="/update"
                    element={
                        auth ? (
                            <Update pharmdata={pharmdata} />
                        ) : (
                            <Navigate to="/login" />
                        )
                    }
                />
                <Route
                    exact
                    path="/login"
                    element={auth ? <Navigate to="/" /> : <Login />}
                />
                <Route exact path="/register" element={<Register />} />
            </Routes>
        </Router>
    );
}

export default App;

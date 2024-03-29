import React, { useState, useEffect } from "react";
import { Navigate } from "react-router-dom";
import Cookies from "js-cookie";
import { toast } from "react-toastify";
import axios from "axios";

//stylesheets
import "./Account.css";

const Account = (props) => {
    const [data, setData] = useState({});
    const [update, setUpdate] = useState(null);
    const [deleteacc, setDelete] = useState(null);

    const logout = () => {
        Cookies.remove("jwt_token");
        toast.error("Logged Out!!!");
    };

    const deleteAcc = () => {
        axios
            .post("http://localhost:5000/deleteaccount", {
                id: props.pharmdata.id,
            })
            .then((res) => {
                if (res.data.status === true) {
                    toast.success("Account Deleted!!!");
                    logout();
                }
                setDelete(res.data.status);
            })
            .catch((e) => {
                console.log(e);
            });
    };

    const handleUpdate = () => {
        setUpdate(true);
    };

    useEffect(() => {
        axios
            .post("http://localhost:5000/getaccount", {
                id: props.pharmdata.id,
            })
            .then((res) => {
                setData(res.data.results[0]);
            })
            .catch((e) => {
                console.log(e);
            });
    }, [data, props]);

    if (update) {
        return <Navigate to="/update" />;
    } else if (deleteacc) {
        return <Navigate to="/login" />;
    } else {
        return (
            <div className="account" style={{ cursor: "default" }}>
                <h1>Account</h1>
                <div className="accdata">
                    <h2>
                        <u>ID:</u> {data.Pharm_id}
                    </h2>
                    <h2>
                        <u>Username:</u> {data.User_name}
                    </h2>
                    <h2>
                        <u>Name:</u> {data.Pharm_name}
                    </h2>
                    <h2>
                        <u>Email:</u> {data.Pharm_email}
                    </h2>
                    <h2>
                        <u>Address:</u> {data.Pharm_address}
                    </h2>
                    <h2>
                        <u>Mobile No.:</u> {data.Pharm_mobile}
                    </h2>
                    <h2>
                        <u>Gender:</u> {data.Pharm_gender}
                    </h2>
                    <button className="updatebtn" onClick={handleUpdate}>
                        Edit
                    </button>
                </div>
                <button className="logoutbtn" onClick={logout}>
                    Logout
                </button>
                <button className="deletebtn" onClick={deleteAcc}>
                    Delete Account
                </button>
            </div>
        );
    }
};

export default Account;

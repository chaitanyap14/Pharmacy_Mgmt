import React, { useState, useEffect } from "react";
import { Navigate } from "react-router-dom";
import { toast } from "react-toastify";
import axios from "axios";

//stylesheets
import "./Update.css";

const Update = (props) => {
    const [id, setID] = useState("");
    const [name, setName] = useState("");
    const [gender, setGender] = useState("");
    const [email, setEmail] = useState("");
    const [address, setAddress] = useState("");
    const [mobile, setMobile] = useState("");
    const [username, setUserName] = useState("");
    const [pass, setPass] = useState("");

    const [status, setStatus] = useState(null);

    const handleID = (e) => {
        setID(e.target.value);
    };

    const handleName = (e) => {
        setName(e.target.value);
    };

    const handleGender = (e) => {
        setGender(e.target.value);
    };

    const handleEmail = (e) => {
        setEmail(e.target.value);
    };

    const handleAddress = (e) => {
        setAddress(e.target.value);
    };

    const handleMobile = (e) => {
        setMobile(e.target.value);
    };

    const handleUserName = (e) => {
        setUserName(e.target.value);
    };

    const handlePass = (e) => {
        setPass(e.target.value);
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        const data = {
            Pharm_id: props.pharmdata.id,
            id,
            name,
            gender,
            email,
            address,
            mobile,
            username,
            pass,
        };

        axios
            .post("http://localhost:5000/updateaccount", { data })
            .then((res) => {
                setStatus(res.data.status);
            })
            .catch((e) => {
                console.log(e);
            });
    };

    useEffect(() => {
        if (status === true) {
            toast.success("Updated Successfully!!!");
        } else if (status === false) {
            toast.error("Update Failed!!!");
        }
    });

    if (status) {
        return <Navigate to="/account" />;
    } else {
        return (
            <div className="update">
                <h1>Update Account Details</h1>
                <form className="upform" onSubmit={handleSubmit}>
                    <input
                        type="text"
                        name="pharm_id"
                        id="pharmid"
                        className="inputs"
                        maxLength="12"
                        placeholder="Enter Aadhar Number"
                        required
                        onChange={handleID}
                    />
                    <input
                        type="text"
                        name="pharm_name"
                        id="pharmname"
                        className="inputs"
                        maxLength="50"
                        placeholder="Enter Name"
                        required
                        onChange={handleName}
                    />
                    <select
                        id="pharmgender"
                        name="pharm_gender"
                        className="inputs"
                        onChange={handleGender}
                        required
                    >
                        <option value="null">-- Select Gender --</option>
                        <option value="M">Male</option>
                        <option value="F">Female</option>
                        <option value="O">Other</option>
                    </select>
                    <input
                        id="pharmemail"
                        type="text"
                        name="pharm_email"
                        maxLength="50"
                        className="inputs"
                        placeholder="Enter Email"
                        required
                        onChange={handleEmail}
                    />
                    <textarea
                        name="pharm_address"
                        id="pharmaddress"
                        cols="30"
                        rows="10"
                        className="inputs"
                        maxLength="250"
                        placeholder="Enter Address"
                        required
                        onChange={handleAddress}
                    ></textarea>
                    <input
                        type="tel"
                        name="pharm_mobile"
                        id="pharmmobile"
                        className="inputs"
                        maxLength="12"
                        placeholder="Enter Mobile Number"
                        required
                        onChange={handleMobile}
                    />
                    <input
                        type="text"
                        name="user_name"
                        id="username"
                        className="inputs"
                        maxLength="20"
                        placeholder="Set Username"
                        required
                        onChange={handleUserName}
                    />
                    <input
                        type="password"
                        name="password"
                        id="password"
                        className="inputs"
                        maxLength="20"
                        placeholder="Set Password"
                        required
                        onChange={handlePass}
                    />
                    <button type="submit" className="upbtn">
                        Update
                    </button>
                </form>
            </div>
        );
    }
};

export default Update;

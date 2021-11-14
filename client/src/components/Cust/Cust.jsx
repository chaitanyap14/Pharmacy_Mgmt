import React, { useState, useEffect } from "react";
import { Navigate } from "react-router-dom";
import { toast } from "react-toastify";
import axios from "axios";

//stylesheets
import "./Cust.css";

const Cust = () => {
    const [formstatus, setFormStatus] = useState(null);
    const [custstatus, setCustStatus] = useState(null);

    const [id, setID] = useState("");
    const [name, setName] = useState("");
    const [age, setAge] = useState(0);
    const [gender, setGender] = useState("");
    const [address, setAddress] = useState("");
    const [mobile, setMobile] = useState("");

    const handleID = (e) => {
        if (e.target.value.length === 12) {
            const pharmid = e.target.value;
            axios
                .post("http://localhost:5000/checkcust", { pharmid })
                .then((res) => {
                    setFormStatus(res.data.status);
                    setID(e.target.value);
                    if (res.data.status) {
                        toast.success("Customer is in the Database");
                    } else {
                        toast.error("Customer is not in the Database");
                    }
                })
                .catch((e) => {
                    console.log(e);
                });
        }
    };

    const handleName = (e) => {
        setName(e.target.value);
    };

    const handleAge = (e) => {
        setAge(e.target.value);
    };

    const handleGender = (e) => {
        setGender(e.target.value);
    };

    const handleAddress = (e) => {
        setAddress(e.target.value);
    };

    const handleMobile = (e) => {
        setMobile(e.target.value);
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        const data = {
            id,
            name,
            age,
            gender,
            address,
            mobile,
        };
        if (formstatus === false) {
            axios
                .post("http://localhost:5000/addcust", { data })
                .then((res) => {
                    setCustStatus(res.data.status);
                })
                .catch((e) => {
                    console.log(e);
                });
        } else if (formstatus === true) {
            setCustStatus(true);
        }
    };

    useEffect(() => {
        if (custstatus) {
            toast.success(`Selling to Customer ID: ${id}`);
        }
    });

    const formChange = () => {
        if (formstatus === false) {
            return (
                <form className="custform" action="" onSubmit={handleSubmit}>
                    <input
                        type="text"
                        onChange={handleID}
                        placeholder="Enter Aadhar Number"
                        maxLength="12"
                        className="inputs"
                        required
                    />
                    <input
                        id="custname"
                        type="text"
                        name="custname"
                        maxLength="50"
                        placeholder="Enter Name"
                        className="inputs"
                        required
                        onChange={handleName}
                    />
                    <input
                        type="number"
                        name="custage"
                        id="custage"
                        placeholder="Enter Age"
                        className="inputs"
                        required
                        onChange={handleAge}
                    />
                    <label htmlFor="custgender">Select Gender</label>
                    <select
                        name="custgender"
                        id="custgender"
                        className="inputs"
                        required
                        onChange={handleGender}
                    >
                        <option value="null">-- Select Gender --</option>
                        <option value="M">Male</option>
                        <option value="F">Female</option>
                        <option value="O">Other</option>
                    </select>
                    <textarea
                        name="custaddress"
                        id="custaddress"
                        cols="30"
                        rows="10"
                        maxLength="250"
                        className="inputs"
                        placeholder="Enter Address"
                        required
                        onChange={handleAddress}
                    ></textarea>
                    <input
                        id="custmobile"
                        type="tel"
                        name="custmobile"
                        className="inputs"
                        placeholder="Enter mobile number"
                        maxLength="12"
                        required
                        onChange={handleMobile}
                    />
                    <button type="submit" className="custbtn">
                        Continue
                    </button>
                </form>
            );
        } else {
            return (
                <form className="custform" action="" onSubmit={handleSubmit}>
                    <input
                        type="text"
                        onChange={handleID}
                        placeholder="Enter Aadhar Number"
                        maxLength="12"
                        className="inputs"
                        required
                    />
                    <button type="submit" className="custbtn">
                        Continue
                    </button>
                </form>
            );
        }
    };

    if (custstatus) {
        return <Navigate to={`/sell/${id}`} />;
    } else {
        return (
            <div className="cust">
                <h1>Select Customer</h1>
                {formChange()}
            </div>
        );
    }
};

export default Cust;

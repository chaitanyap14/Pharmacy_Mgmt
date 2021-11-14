import React, { useState } from "react";
import { useLocation, Navigate } from "react-router-dom";
import axios from "axios";

//stylesheets
import "./Sell.css";

const Sell = (props) => {
    const location = useLocation();
    const path = location.pathname;
    const custid = path.substring(path.lastIndexOf("/") + 1, path.length);

    const [medname, setMedName] = useState("");
    const [medprice, setMedPrice] = useState(0);
    const [date, setDate] = useState("");

    const [status, setStatus] = useState(null);

    const handleMedName = (e) => {
        setMedName(e.target.value);
    };

    const handleMedPrice = (e) => {
        setMedPrice(e.target.value);
    };

    const handleDate = (e) => {
        console.log(e.target.value);
        setDate(e.target.value);
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        const pharmid = props.pharmdata.id;
        const data = { medname, medprice, date, pharmid, custid };
        axios
            .post("http://localhost:5000/addmed", { data })
            .then((res) => {
                setStatus(res.data.status);
            })
            .catch((e) => {
                console.log(e);
            });
    };

    if (status) {
        return <Navigate to="/" />;
    } else {
        return (
            <div className="sell">
                <h1>Sell Medicine</h1>
                <form action="" className="sellform" onSubmit={handleSubmit}>
                    <input
                        id="medname"
                        type="text"
                        name="med_name"
                        placeholder="Enter Medicine Name"
                        maxLength="50"
                        className="inputs"
                        required
                        onChange={handleMedName}
                    />
                    <input
                        type="number"
                        name="med_price"
                        id="medprice"
                        placeholder="Enter Medicine Price"
                        className="inputs"
                        required
                        onChange={handleMedPrice}
                    />
                    <input
                        type="date"
                        name="purch_date"
                        id="purchdate"
                        placeholder="Enter Date"
                        className="inputs"
                        required
                        onChange={handleDate}
                    />
                    <button type="submit" className="sellbtn">
                        Submit
                    </button>
                </form>
            </div>
        );
    }
};

export default Sell;

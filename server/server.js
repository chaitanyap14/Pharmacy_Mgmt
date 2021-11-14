require("dotenv").config();
const express = require("express");
const app = express();
const cors = require("cors");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const jwtGen = require("./utils/jwtGen");
const db = require("./db");
const port = process.env.PORT || 5000;

app.use(cors({ origin: true, credentials: true }));
app.use(express.json());
app.use(
    express.urlencoded({
        extended: false,
    })
);

db.connect((e) => {
    if (e) {
        console.error("Error: ", e.message);
    } else {
        console.log("Connected to MySQL Server");
    }
});

//pharmacist
app.post("/register", (req, res) => {
    const data = req.body.data;
    const passHash = bcrypt.hashSync(data.pass, 10);
    db.query(
        `INSERT INTO Pharmacist VALUES ("${data.id}", "${data.name}", "${data.email}", "${data.address}", "${data.mobile}", "${data.gender}", "${data.username}", "${passHash}");`,
        (error, results, fields) => {
            if (error) {
                console.log(error);
                res.send({ status: false });
            } else {
                res.send({ status: true });
            }
        }
    );
});

app.post("/login", (req, res) => {
    const data = req.body.data;
    db.query(
        `SELECT * FROM Pharmacist WHERE User_name="${data.username}";`,
        (error, results, fields) => {
            if (error) {
                console.log(error);
                res.send({ status: false });
            } else {
                if (results.length === 0) {
                    res.send({ status: false });
                } else {
                    const status = bcrypt.compareSync(
                        data.pass,
                        results[0].Password
                    );
                    if (status) {
                        res.cookie(
                            "jwt_token",
                            jwtGen(
                                results[0].Pharm_id,
                                results[0].Pharm_name,
                                results[0].Pharm_email
                            ),
                            { expiresIn: "1h", httpOnly: false }
                        );
                        res.send({
                            status: true,
                        });
                    } else {
                        res.send({ status: false });
                    }
                }
            }
        }
    );
});

app.post("/auth", (req, res) => {
    const token = req.body.token;
    try {
        const pharmdata = jwt.verify(token, process.env.JWT_SECRET);
        res.send({ pharmdata, status: true });
    } catch (e) {
        console.log(e);
        res.send({ status: false });
    }
});

app.post("/getaccount", (req, res) => {
    const id = req.body.id;
    db.query(
        `SELECT * FROM Pharmacist WHERE Pharm_id=${id};`,
        (error, results, fields) => {
            if (error) {
                console.log(error);
            } else {
                res.send({ results });
            }
        }
    );
});

app.post("/updateaccount", (req, res) => {
    const data = req.body.data;
    const passHash = bcrypt.hashSync(data.pass, 10);
    db.query(
        `UPDATE Pharmacist SET Pharm_id="${data.id}", Pharm_name="${data.name}", Pharm_email="${data.email}", Pharm_address="${data.address}", Pharm_mobile="${data.mobile}", Pharm_gender="${data.gender}", User_name="${data.username}", Password="${passHash}" WHERE Pharm_id=${data.Pharm_id};`,
        (error, results, fields) => {
            if (error) {
                console.log(error);
                res.send({ status: false });
            } else {
                res.send({ status: true });
            }
        }
    );
});

app.post("/deleteaccount", (req, res) => {
    const id = req.body.id;
    db.query(
        `DELETE FROM Pharmacist WHERE Pharm_id=${id};`,
        (error, results, fields) => {
            if (error) {
                console.log(error);
                res.send({ status: false });
            } else {
                res.send({ status: true });
            }
        }
    );
});

//customer
app.post("/checkcust", (req, res) => {
    const id = req.body.pharmid;
    db.query(
        `SELECT * FROM Customer WHERE Cust_id=${id};`,
        (error, results, fields) => {
            if (error) {
                console.log(error);
            } else {
                if (results.length === 0) {
                    res.send({ status: false });
                } else {
                    res.send({ status: true });
                }
            }
        }
    );
});

app.post("/addcust", (req, res) => {
    const data = req.body.data;
    db.query(
        `INSERT INTO Customer VALUES ("${data.id}","${data.name}",${data.age},"${data.gender}","${data.address}","${data.mobile}");`,
        (error, results, fields) => {
            if (error) {
                console.log(error);
                res.send({ status: false });
            } else {
                res.send({ status: true });
            }
        }
    );
});

//medicine
app.post("/addmed", (req, res) => {
    const data = req.body.data;
    db.query(
        `INSERT INTO Medicine VALUES (NULL, "${data.medname}", ${data.medprice}, "${data.date}", "${data.pharmid}", "${data.custid}");`,
        (error, results, fields) => {
            if (error) {
                console.log(error);
                res.send({ status: false });
            } else {
                res.send({ status: true });
            }
        }
    );
});

app.post("/getsales", (req, res) => {
    const id = req.body.id;
    const date = req.body.date;
    db.query(
        `SELECT * FROM Medicine WHERE Pharm_id=${id} AND Purch_date="${date}";`,
        (error, results, fields) => {
            if (error) {
                console.log(error);
                res.send({ status: false });
            } else {
                res.send({
                    results,
                    status: true,
                });
            }
        }
    );
});

app.get("/", (req, res) => {
    res.send("Server Working");
});

app.listen(port, () => {
    console.log(`Listening on port ${port}`);
});

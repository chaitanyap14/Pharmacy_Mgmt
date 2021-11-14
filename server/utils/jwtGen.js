const jwt = require("jsonwebtoken");
require("dotenv").config();

const jwtGen = (id, name, email) => {
    return jwt.sign(
        {
            data: {
                id,
                name,
                email,
            },
        },
        process.env.JWT_SECRET,
        { expiresIn: "1h" }
    );
};

module.exports = jwtGen;

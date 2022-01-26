# Pharmacy_Mgmt

Pharmacy Management System Web Application built using React, Node, Express and MySQL with JWT authentication and Bcrypt for password hashing.

Step 1 - Clone the repo on your machine.

Step 2 - In the client folder run `yarn install`

Step 3 - In the server folder run `npm install`

Step 4 - In the server folder, change the environment variables i.e. database name, username, host, port, password, etc. in the **.env** file. Note - You may also change the JWT_SECRET environment variable which is used by bcrypt.

Step 5 - Create a database in your local MySQL server by running `CREATE DATABASE pharma`

Step 6 - Connect to the database and then insert tables using the commands from the **database.sql** file.

Step 7 - In the client folder run `yarn start`

Step 8 - In the server folder run `nodemon` or `node server.js`

const express = require("express");

const connectToDb = require("./db-config/config");

const app = express();

connectToDb().then(
    () => {
        console.log("Successfully connected to DB");
        app.listen(3000, () => console.log("Server successfully listening at port 3000"),);
    },
).catch(error => console.log(error));

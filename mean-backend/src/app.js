const express = require("express");
const cors = require("cors");
const cookieParser = require("cookie-parser");

const connectToDb = require("./db-config/config");
const UserModel = require("./models/User");

const app = express();

/**
 * Common middlewares to be executed for all the incoming requests.
 */
app.use(cookieParser())
app.use(express.json());

app.post("/signup", async (request, response) => {
    try {
        const {
        firstName,
        lastName,
        emailId,
        password,
    } = request.body;

        const userModel = new UserModel({
            firstName,
            lastName,
            emailId,
            password,
        });

        const newlyCreatedUser = await userModel.save();

        if(!newlyCreatedUser) {
            throw new Error("Unable to create user. Please re-check all the details");
        }

        response.json({
            message: `Congratulations ${firstName}, you're signed up successfully. Please login to continue using the shopping app`,
        });
    } catch (error) {
        response.status(400).json({
            message: error.message,
        })
    }
    
});

connectToDb().then(
    () => {
        console.log("Successfully connected to DB");
        app.listen(3000, () => console.log("Server successfully listening at port 3000"),);
    },
).catch(error => console.log(error));

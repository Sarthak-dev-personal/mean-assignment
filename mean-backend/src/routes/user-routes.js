const express = require("express");
const jwt = require("jsonwebtoken");

const UserModel = require("../models/User");

const {
    comparePassword,
    encryptPassword,
} = require("../utils");

const router = express.Router();

router.post("/signup", async (request, response) => {
    try {
        const {
        firstName,
        lastName,
        emailId,
        password,
    } = request.body;

        const encryptedPassword = await encryptPassword(password);

        if (!encryptPassword) {
            throw new Error("Unable to save the password")
        }

        const userModel = new UserModel({
            firstName,
            lastName,
            emailId,
            password: encryptedPassword,
        });

        const newlyCreatedUser = await userModel.save();

        if(!newlyCreatedUser) {
            throw new Error("Unable to create user. Please re-check all the details");
        }

        const authToken = jwt.sign({ _id: newlyCreatedUser._id }, "Sarthak@1234", {
            expiresIn: "7d",
        });

        response.cookie('authToken', authToken, {
            httpOnly: true,
            secure: true,
            expires: new Date(Date.now() + 60 * 60 * 1000),
        });

        response.json({
            message: `Congratulations ${firstName}, you're signed up successfully. Please login to continue using the shopping app`,
            data: {
                user: newlyCreatedUser,
            },
        });
    } catch (error) {
        response.status(400).json({
            message: error.message,
        })
    }
});

router.post("/login", async(request, response) => {
    try {
        const {
            emailId,
            password,
        } = request.body;

        if (!emailId || !password) {
            throw new Error("Invalid Request body!!");
        }

        const existingUser = await UserModel.findOne({ emailId });

        if (!existingUser) {
            throw new Error("No User found for the entered Email ID");
        }

        const isPasswordValid = await comparePassword(password, existingUser.password);

        if (!isPasswordValid) {
            throw new Error("Invalid Password!! Please enter the correct password.");
        }

        const authToken = jwt.sign({ _id: existingUser._id }, "Sarthak@1234", {
            expiresIn: "7d",
        });

        response.cookie("authToken", authToken, {
            expires: new Date(Date.now() + 60 * 60 * 1000),
            secure: true,
            httpOnly: true,
        });

        response.json({
            data: {
                user: existingUser,
            },
        });
    } catch (error) {
        response.status(400).json({
            message: error.message,
        })
    }
});

module.exports = router;

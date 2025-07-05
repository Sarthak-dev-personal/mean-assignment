/**
 * @description Middleware file to authenticate any request that comes in.
 */

const jwt = require("jsonwebtoken");

const UserModel = require("../models/User");

const authenticateUser = async (request, response, next) => {
    try {
        const authenticationCookie = request.cookies;

        if (!authenticationCookie) {
            throw new Error("Valid Cookie missing");
        }

        const { authToken } = authenticationCookie;

        if (!authToken) {
            throw new Error("Valid token missing!");
        }

        const verifiedToken = jwt.verify(authToken, "Sarthak@1234");

        if (!verifiedToken) {
            throw new Error("Invalid token sent in request!!");
        }

        const authenticatedUser = await UserModel.findById({ _id: verifiedToken._id });

        if (!authenticateUser) {
            throw new Error("No existing user found for the provided credentials!!");
        }

        request.user = authenticatedUser;

        next();
    } catch (error) {
        response.status(400).json({
            message: error.message,
        });
    }
}

module.exports = authenticateUser;

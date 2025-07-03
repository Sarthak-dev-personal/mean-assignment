const mongoose = require("mongoose");

const CONNECTION_STRING = "mongodb+srv://sarthakkapoor:L3tS25hbhjCjFUvW@nodejs.s6fd1.mongodb.net/mean-app";

const connectToDb = async() => {
    await mongoose.connect(CONNECTION_STRING);
};

module.exports = connectToDb;

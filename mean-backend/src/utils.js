const bcrypt  = require("bcrypt");

const encryptPassword = (password) => {
    try {
        return bcrypt.hash(password, 10);
    } catch (error) {
        throw error;
    }
}

const comparePassword = (currentUserPassword, encryptedPassword) => {
    try {
        return bcrypt.compare(currentUserPassword, encryptedPassword);
    } catch (error) {
        throw error;
    }
}

module.exports = {
    encryptPassword,
    comparePassword,
};

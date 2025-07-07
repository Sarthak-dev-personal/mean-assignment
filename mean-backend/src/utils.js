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

const calculateTotalCartPrice = (items) => {
    let totalPrice = 0;

    items.forEach(item => {
        totalPrice += item.price * item.quantity;
    });

    return totalPrice;
}

module.exports = {
    encryptPassword,
    comparePassword,
    calculateTotalCartPrice,
};

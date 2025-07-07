const mongoose = require("mongoose");

const cartItemsSchema = new mongoose.Schema({
    productId: {
        type: mongoose.Types.ObjectId,
        unique: true,
        ref: "product",
        required: true,
    },
    quantity: {
        type: Number,
        min: 0,
        required: true,
    },
    price: {
        type: Number,
        min: 1,
        required: true,
    },
    name: {
        type: String,
        required: true,
    }
});

const cartSchema = new mongoose.Schema({
    userId: {
        type: mongoose.Types.ObjectId,
        required: true,
        ref: "user",
        unique: true,
    },
    items: [cartItemsSchema],
}, {
    timestamps: true,
});

const CartModel = mongoose.model("cart", cartSchema);

module.exports = CartModel;

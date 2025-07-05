const mongoose = require("mongoose");

const ProductSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
    }, photoUrl: {
        type: String,
    }, cost: {
        type: Number,
        min: 0,
        required: true,
    }, currency: {
        type: String,
        required: true,
    }
});

const ProductModel = mongoose.model("product", ProductSchema);

module.exports = ProductModel;

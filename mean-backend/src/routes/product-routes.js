const express = require("express");

const ProductModel = require("../models/Product");
const authenticateUser = require("../middlewares/auth");

const router = express.Router();

router.post("/add", authenticateUser, async (request, response) => {
    try {
        const {
            name,
            photoUrl,
            cost,
            currency,
        } = request.body;

        const newProduct = new ProductModel({
            name,
            photoUrl,
            cost,
            currency,
        });

        const savedProduct = await newProduct.save();

        if (!savedProduct) {
            throw new Error("Error adding a new product right now. Please try again later!");
        }

        response.json({
            message: "Product saved successfully",
            data: {
                product: savedProduct,
            }
        });
    } catch (error) {
        response.status(400).json({
            message: error.message,
        })
    }
});

router.get("/:id", authenticateUser, async(request, response) => {
    try {
        const { id } = request.params;

        const product = await ProductModel.findById({
            _id: id,
        });

        if (!product) {
            throw new Error("No product found for the given product ID!!");
        }

        response.json({
            message: "Product retrieved successfully!",
            data: {
                product,
            }
        });
    } catch (error) {
        response.status(400).json({
            message: error.message,
        });
    }
})

router.get("", authenticateUser, async (request, response) => {
    try {
        const productList = await ProductModel.find();

        if (!productList) {
            throw new Error("Unable to fetch Products at the moment!! Please try again after some time!");
        }

        response.json({
            message: "Products retrieved successfully!!",
            data: {
                products: productList,
            }
        });
    } catch (error) {
        response.status(400).json({
            message: error.message,
        });
    }
})

module.exports = router;

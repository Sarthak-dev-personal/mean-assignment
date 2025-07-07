const express = require("express");

const authenticateUser = require("../middlewares/auth");
const CartModel = require("../models/Cart");
const { calculateTotalCartPrice } = require("../utils");

const router = express.Router();

router.put("/items", authenticateUser, async (request, response) => {
    try {
        const { user } = request;

        const { items } = request.body;

        if (!user) {
            throw new Error("Missing valid User ID!!");
        }

        const updatedCart = await CartModel.findOneAndUpdate({
            userId: user._id,
        }, {
            $set: {
                items,
            }
        }, {
            upsert: true,
        }).lean();

        if (!updatedCart) {
            throw new Error("Unable to update cart at the moment. Please try again later!!");
        } else {
            response.json({
                message: "Cart updated successfully!!",
                data: {
                    cart: {
                        ...updatedCart,
                        totalPrice: calculateTotalCartPrice(updatedCart.items),
                    },
                }
            });
        }
    } catch (error) {
        response.status(400).json({
            message: error.message,
        })
    }
});

router.get("", authenticateUser, async(request, response) => {
    try {
        const { user } = request;

        if (!user) {
            throw new Error("Missing valid User ID!!");
        }

        const existingCart = await CartModel.findOne({ userId: user._id });

        if (!existingCart) {
            response.json({
                message: "No items added to the cart yet!! Start shopping right away.",
                data: {
                    cart: {
                        userId: user._id,
                        items: [],
                    },
                }
            })
        } else {

            response.json({
                message: "Cart retrieved successfully!!",
                data: {
                    cart: existingCart,
                }
            });
        }
    } catch (error) {
        response.status(400).json({
            message: error.message,
        });
    }
})

module.exports = router;

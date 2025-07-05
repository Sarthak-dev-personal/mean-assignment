const express = require("express");
const cors = require("cors");
const cookieParser = require("cookie-parser");

const connectToDb = require("./db-config/config");
const UserRouter = require("./routes/user-routes");
const ProductRouter = require("./routes/product-routes");

const app = express();

/**
 * Common middlewares to be executed for all the incoming requests.
 */
app.use(cookieParser())
app.use(express.json());

/**
 * Routing middlewares.
 */
app.use("/user", UserRouter);
app.use("/products", ProductRouter);

connectToDb().then(
    () => {
        console.log("Successfully connected to DB");
        app.listen(3000, () => console.log("Server successfully listening at port 3000"),);
    },
).catch(error => console.log(error));

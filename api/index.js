//import dependencies
const express = require("express");
const app = express();
const PORT = process.env.PORT || 6001
const mongoose = require("mongoose");
const dotenv = require("dotenv");
const cors = require("cors")
dotenv.config();

//import routes files
const userRoute = require("./routes/user");
const authRoute = require("./routes/auth");
const productRoute = require("./routes/product");
const orderRoute = require("./routes/order");
const cartRoute = require("./routes/cart");
const stripeRoute = require("./routes/stripe")

//connect to mongoose database
mongoose.set("strictQuery", true);
mongoose
  .connect(process.env.MONGO_URL)
  .then(() => console.log("DB connection successful"))
  .catch(() => console.log("error connecting to DB"));

//api routes
app.use(cors())
app.use(express.json());
app.use("/api/users", userRoute);
app.use("/api/auth", authRoute);
app.use("/api/products", productRoute);
app.use("/api/orders", orderRoute);
app.use("/api/carts", cartRoute);
app.use("/api/checkout", stripeRoute);

app.get("/", async (req, res) => {
  res.send("Hello from Eshop")
})

//connect to server
app.listen(PORT, () => {
  console.log(`eshop server is running on port ${PORT}`);
});

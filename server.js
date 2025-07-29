const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
require("dotenv").config();


const signuproutes = require("./api/signup");
const loginRoutes = require("./api/login");
const cartRoutes = require("./api/cart");
const orderRoutes = require('./api/order');
const contactRoutes = require("./api/contact");


const app = express();

const PORT = process.env.PORT || 3000;


app.use(cors({
  origin: "https://med-vault-lake.vercel.app",
}));;
app.use(express.json());

app.get("/", (req, res) => {
  res.send("Server is runing...");
});
// MongoDB connection
mongoose
  .connect(process.env.MONGO_URI)
  .then(() => console.log("MongoDB connected"))
  .catch((err) => console.error("MongoDB connection error:", err));

// Routes
app.use("/", signuproutes);
app.use("/", loginRoutes);
app.use("/", cartRoutes);
app.use("/", orderRoutes);
app.use("/", contactRoutes);


app.listen(PORT, () => console.log(`Server running on port ${PORT}`));

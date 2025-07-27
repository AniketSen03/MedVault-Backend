const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const PORT = 3000;

const signuproutes = require("./routes/signup");
const loginRoutes = require("./routes/login");
const cartRoutes = require("./routes/cart");
const orderRoutes = require('./routes/order');
const contactRoutes = require("./routes/contact");


const app = express();
app.use(cors({
  origin: "https://med-vault-lake.vercel.app/",
  credentials: true
}));;
app.use(express.json());

app.get("/", (req, res) => {
  res.send("Server is runing...");
});
// MongoDB connection
mongoose
  .connect("mongodb://127.0.0.1:27017/MedVault")
  .then(() => console.log("MongoDB connected"))
  .catch((err) => console.error("MongoDB connection error:", err));

// Routes
app.use("/", signuproutes);
app.use("/", loginRoutes);
app.use("/", cartRoutes);
app.use("/", orderRoutes);
app.use("/", contactRoutes);


app.listen(PORT, () => console.log(`Server running on port ${PORT}`));

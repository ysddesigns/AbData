const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const { error } = require("console");
require("dotenv").config();

const app = express();
app.use(cors());
app.use(express.json());

const PORT = process.env.PORT || 5000;

// connect to MongoDB
mongoose
  .connect(process.env.MONGO_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => console.log("Connect to MongoDB Atlas"))
  .catch((error) => console.log("Error connecting to MongoDB:", error));

// user schema
const userSchema = new mongoose.Schema({
  fullName: String,
  email: String,
  phone: String,
  password: String,
});

// API Routes
app.post("/user", async (req, res) => {
  try {
    const newUser = new UserActivation(req.body);
    await newUser.isActive();
    res.status(201).send(newUser);
  } catch (error) {
    res.status(400).send(error.message);
  }
});

app.listen(PORT, () => console.log(`server runing on port ${PORT}`));

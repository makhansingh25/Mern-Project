require("dotenv").config();
const userModel = require("../models/userModel");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

const register = async (req, res) => {
  const { username, password, phone, email } = req.body;

  try {
    const userExist = await userModel.findOne({ email });
    if (userExist) {
      return res.status(400).json({ message: "User already registered" });
    }

    const hashedPassword = await bcrypt.hash(password, 10);
    const createdUser = await userModel.create({
      username,
      password: hashedPassword,
      phone,
      email,  
    });

    const token = jwt.sign({ id: createdUser._id }, process.env.JWT_SECRET_KEY);

    res.status(201).json({ user: createdUser, token });
  } catch (err) {
    res
      .status(500)
      .json({ message: "Registration failed", error: err.message });
  }
};
const loginUser = async (req, res) => {
  try {
    const { email, password } = req.body;

    const existUser = await userModel.findOne({ email });
    if (!existUser) {
      return res.status(400).json({ message: "You need to register first" });
    }

    const isValidPassword = await bcrypt.compare(password, existUser.password);

    if (!isValidPassword) {
      return res.status(400).json({ message: "Invalid email or password" });
    }

    const token = jwt.sign({ id: existUser._id }, process.env.JWT_SECRET_KEY);
    console.log(token);
    res.status(200).json({
      message: "User logged in successfully",
      token: token,
      userId: existUser._id,
    });
  } catch (error) {
    console.error("Login error:", error.message);
    res.status(500).json({ message: "Server error" });
  }
};

const user = (req, res) => {
  const userData = req.user;
  res.status(200).json({ userData });
};

module.exports = { register, loginUser, user };

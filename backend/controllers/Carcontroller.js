const carModel = require("../models/carModel");

const addCar = async (req, res) => {
  const { name, price, feature } = req.body;
  const userId = req.user?._id;
  const image = req.files?.map((file) => file.filename);

  if (!name || !price || !feature || !image) {
    return res.status(400).json({
      message: "All fields are required, including at least one image.",
    });
  }
  try {
    const car = await carModel.create({
      image,
      name,
      price,
      feature,
      user_id: userId,
    });

    return res.status(201).json({
      message: "New car added successfully",
      newcar: car,
    });
  } catch (error) {
    console.error("Error in addCar:", error.message);
    return res.status(500).json({
      message: "Something went wrong while adding the car.",
      error: error.message,
    });
  }
};  

const getCar = async (req, res) => {
  const userId = req.user?._id;
  try {
    const car = await carModel.find({ user_id: userId });
    res.status(200).json({ car });
  } catch (error) {
    res.status(500).json({
      message: "something went wrong hile fetching car added by user",
    });
  }
};

module.exports = { addCar, getCar };

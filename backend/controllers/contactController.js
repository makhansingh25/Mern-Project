const contactModel = require("../models/contactModel");

const contactForm = async (req, res) => {
  try {
    const response = req.body;
    await contactModel.create(response);
    res.status(200).json({ message: "message submit succesfully" });
  } catch (error) {
    console.log(error);
  }
};

module.exports = { contactForm };

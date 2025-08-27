const express = require("express");
const routes = express.Router();
const contactController = require("../controllers/contactController");

routes.post("/contact", contactController.contactForm);

module.exports = routes;

const express = require("express");
const route = express.Router();
const authcontroller = require("../controllers/authcontroller");
const validate = require("../middleware/validate-middleware");
const validateSchema = require("../validator/auth-validator");
const authmidleware = require("../middleware/authmidleware");

route.post("/register", validate(validateSchema), authcontroller.register);
route.post("/login", authcontroller.loginUser);
route.get("/user", authmidleware, authcontroller.user);
module.exports = route;

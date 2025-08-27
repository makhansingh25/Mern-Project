const express = require("express");
const carroute = express.Router();
const carcontroller = require("../controllers/Carcontroller");
const authmiddleware = require("../middleware/authmidleware");
const upload = require("../config/multerconfig");

carroute.post(
  "/addcar",
  authmiddleware,
  upload.array("image"),
  carcontroller.addCar
);

carroute.get("/getcar", authmiddleware, carcontroller.getCar);

module.exports = { carroute };

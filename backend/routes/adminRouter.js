const express = require("express");
const {
  getUserData,
  deleteUser,
  GetUserById,
  UpdateAdminUser,
} = require("../controllers/admincontroller");
const { adminmiddleware } = require("../middleware/admin-middleware");
const authmidleware = require("../middleware/authmidleware");

const adminRouter = express.Router();

adminRouter.get("/getuser/:id", authmidleware, adminmiddleware, GetUserById);
adminRouter.put(
  "/updates/:id",
  authmidleware,
  adminmiddleware,
  UpdateAdminUser
);
adminRouter.get("/user", authmidleware, adminmiddleware, getUserData);
adminRouter.delete(
  "/user/delete/:id",
  authmidleware,
  adminmiddleware,
  deleteUser
);

module.exports = adminRouter;

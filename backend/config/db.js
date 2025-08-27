const mongoose = require("mongoose");
const Dburl = process.env.MONGODB_URL;
const ConnectDb = async () => {
  try {
    await mongoose.connect(Dburl);
    console.log("database connected with nodejs");
  } catch (error) {
    console.log("databse connection failed with nodejs", error);
  }
};
module.exports = ConnectDb;

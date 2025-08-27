const userModel = require("../models/userModel");

const getUserData = async (req, res) => {
  const user = await userModel.find({}, { password: 0 });

  if (!user) {
    return res.status(404).json({ message: "user not found" });
  }

  res.status(200).json({ user });
};

const deleteUser = async (req, res) => {
  const id = req.params.id;

  await userModel.findOneAndDelete({ _id: id });
  res.status(200).json({ message: "user is delete succesfully" });  
};

const GetUserById = async (req, res) => {
  const id = req.params.id;
  const user = await userModel.findOne({ _id: id }, { password: 0 });

  if (!user) {
    return res.status(404).json({ message: "user not found" });
  }

  res.status(200).json({ user });
};

const UpdateAdminUser = async (req, res) => {
  const id = req.params.id;
  const updateuserdata = req.body;

  const updates = await userModel.updateOne(
    { _id: id },
    {
      $set: updateuserdata,
    }
  );
  res.status(200).json({ message: "user is update succsesfully", updates });
};

module.exports = { getUserData, deleteUser, GetUserById, UpdateAdminUser };

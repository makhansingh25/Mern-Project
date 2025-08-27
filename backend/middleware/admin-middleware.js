const adminmiddleware = async (req, res, next) => {
  const adminUser = req.user.isAdmin;
  if (!adminUser) {
    return res.status(404).json({ message: "you are not admin" });
  }
  next();
};

module.exports = { adminmiddleware };

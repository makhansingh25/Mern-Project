const errorModdleware = (err, req, res, next) => {
  const status = err.status || 400;
  const message = err.message || "backend error";
  const extradetail = err.extradetail || "error from backend";

  return res.status(status).json({ message, extradetail });
};

module.exports = errorModdleware;

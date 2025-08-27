const validate = (schema) => async (req, res, next) => {
  try {
    const parsebody = await schema.parseAsync(req.body);
    req.body = parsebody;

    next();
  } catch (err) {
    const message = err.errors[0].message;
    next(message);
  }
};
module.exports = validate;

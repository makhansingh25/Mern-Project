const z = require("zod");

const validateSchema = z.object({
  username: z
    .string({ required_error: "name must be required" })
    .trim()
    .min(3, { message: "name must be minimum 3 char" })
    .max(100, { message: "name must be less then 100 letter" }),
  email: z
    .string({ required_error: "email must be required" })
    .email({ message: "email is invalid" })
    .trim()
    .min(3)
    .max(30, { message: "email must be less then 30 letter" }),
  phone: z
    .string({ required_error: "phone must be required" })
    .trim()
    .min(10, { message: "phone number minimum 10 digits" })
    .max(100, { message: "phone must be less then 11 letter" }),
  password: z
    .string({ required_error: "password must be required" })
    .trim()
    .min(3, { message: "password  minimum 3 digits" })
    .max(100, { message: "password must be less then 100 letter" }),
});

module.exports = validateSchema;

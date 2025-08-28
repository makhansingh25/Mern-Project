require("dotenv").config();
const express = require("express");
const cors = require("cors");
const route = require("./routes/authrouter");
const ConnectDb = require("./config/db");
const errorModdleware = require("./middleware/error-middleware");
const routes = require("./routes/contactrouter");
const adminRouter = require("./routes/adminRouter");
const { carroute } = require("./routes/carroutes");
const path = require("path");

const app = express();

// Serve the /uploads folder
app.use("/uploads", express.static(path.join(__dirname, "uploads")));
app.use(express.urlencoded({ extended: true }));
app.use(cors());
app.use(express.json());
app.use("/api", route);
app.use("/contact/form/", routes);
app.use("/admin", adminRouter);
app.use("/car", carroute);
app.use(errorModdleware);
app.get("/test", (req, res) => {
  res.json({
    message: "Hello from Express!",
    userData: {
      id: 1,
      name: "Test User",
      email: "test@example.com",
    },
  });
});
const port = process.env.PORT;

ConnectDb().then(() => {
  app.listen(port, () => {
    console.log(`server is running on port :${port}`);
  });
});

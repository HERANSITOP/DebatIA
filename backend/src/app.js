const express = require("express");
require("dotenv").config();

const { checkJwt } = require("./config/auth0");
const authRoutes = require("./routes/authRoutes");
const exampleRoutes = require("./routes/exampleRoutes");

const app = express();
app.use(express.json());

// Rutas
app.use("/auth", authRoutes);
app.use("/", exampleRoutes);

app.listen(3000, () => {
  console.log("API corriendo en http://localhost:3000 🚀");
});
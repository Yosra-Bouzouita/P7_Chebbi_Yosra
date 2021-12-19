const express = require("express");
const { Sequelize } = require('sequelize');
const path = require("path");
const postsRoutes = require("./routes/posts");
const userRoutes = require("./routes/user");

const sequelize = Sequelize.database_model;

const app = express();

app.use(express.json());

app.use((req, res, next) => {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content, Accept, Content-Type, Authorization"
  );
  res.setHeader(
    "Access-Control-Allow-Methods",
    "GET, POST, PUT, DELETE, PATCH, OPTIONS"
  );
  next();
});
app.use("/images", express.static(path.join(__dirname, "images")));
app.use("/api/post", postsRoutes);
app.use("/api/auth", userRoutes);

module.exports = app;

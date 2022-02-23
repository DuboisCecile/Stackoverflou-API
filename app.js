const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const path = require("path");
const topicRoutes = require("./routes/topic");
const userRoutes = require("./routes/user");

const {
  CORS_ALLOWED_ORIGINS,
  MONGODB_USER,
  MONGODB_PASSWORD,
  MONGODB_DATABASE,
} = require("./env");

const app = express();

mongoose
  .connect(
    `mongodb+srv://${MONGODB_USER}:${MONGODB_PASSWORD}@cluster0.kid8m.mongodb.net/${MONGODB_DATABASE}?retryWrites=true&w=majority`,
    { useNewUrlParser: true, useUnifiedTopology: true }
  )
  .then(() => console.log("Connexion à MongoDB réussie !"))
  .catch(() => console.log("Connexion à MongoDB échouée !"));

app.use(express.json());

const allowedOrigins = CORS_ALLOWED_ORIGINS.split(",");
const corsOptions = {
  origin: (origin, callback) => {
    if (origin === undefined || allowedOrigins.indexOf(origin) !== -1) {
      callback(null, true);
    } else {
      callback(new Error("Not allowed by CORS"));
    }
  },
  credentials: true,
};

app.use(cors(corsOptions));

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

app.use("/api/topic", topicRoutes);
app.use("/api/users", userRoutes);
app.use("/images", express.static(path.join(__dirname, "images")));

module.exports = app;

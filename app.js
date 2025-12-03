const http = require("http");
require("dotenv").config({ path: "credentials.env" });
const bodyParser = require("body-parser");
const fs = require("fs");

const express = require("express");
const mongoose = require("mongoose");
const session = require("express-session");
const MongoDBStore = require("connect-mongodb-session")(session);

const MONGODB_URI = `mongodb+srv://${process.env.MONGO_USER}:${process.env.MONGO_PASSWORD}@cluster1.7tujvnn.mongodb.net/${process.env.MONGO_DEFAULT_DATABASE}?w=majority&appName=Cluster1`;

const app = express();

app.use(bodyParser.json({ strict: false }));

app.use((req, res, next) => {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader(
    "Access-Control-Allow-Methods",
    "OPTIONS, GET, POST,PUT,PATCH, DELETE"
  );
  res.setHeader("Access-Control-Allow-Headers", "Content-Type, Authorization");
  next();
});

const productRoutes = require("./routes/product");
const userRoutes = require("./routes/user");
const orderRoutes = require("./routes/order");
const authRoutes = require("./routes/auth");
const checkoutRoutes = require("./routes/checkout");

app.use("/places", async (req, res, next) => {
  const result = JSON.stringify({
    id: "p1",
    title: "Forest Waterfall",
    image: {
      src: "forest-waterfall.jpg",
      alt: "A tranquil forest with a cascading waterfall amidst greenery.",
    },
    lat: 44.5588,
    lon: -80.344,
  });
  console.log(result);
  const placesData = JSON.parse(result);
  res.status(200).json({ places: placesData });
});

app.use("/product", productRoutes);
app.use("/user", userRoutes);
app.use("/order", orderRoutes);
app.use("/auth", authRoutes);
app.use("/checkout", checkoutRoutes);

const startServer = async () => {
  try {
    await mongoose.connect(MONGODB_URI);
    app.listen(process.env.PORT || 3000);
  } catch (error) {
    console.log(error);
  }
};

startServer();

const db = () => {
  if (mongoose.connections.readyState >= 1) {
    return;
  }

  mongoose
    .connect("mongodb://localhost:27017/eco_next", {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    })
    .then((con) => console.log("Connected to MongoDB"));
};

const mongoose = require("mongoose");

const products = require("./data");

const Product = require("../models/product");

const importData = async () => {
  db();

  try {
    console.log("Deleting All Data");

    await Product.deleteMany();

    const addedUserProducts = products.map((product) => {
      return { ...product, user: "64d5cd0d77a85ea216aab568" };
    });

    await Product.insertMany(addedUserProducts);

    console.log("Data inserted Successfully");
    process.exit();
  } catch (error) {
    console.error(`${error}`);
    process.exit(1);
  }
};

importData();

const express = require("express");
const mongoose = require("mongoose");
const app = express();
require("dotenv").config();
const PORT = process.env.PORT;
const MONGODB_URI = process.env.MONGODB_URI;
const Product = require("./models/Product");

app.use(express.json());

app.get("/productos", async (req, res) => {
  const products = await Product.find().select("_id name price stock");
  res.status(200).json(products);
});

app.get("/productos/:id", async (req, res) => {
  const product = await Product.findById(req.params.id);
  if (!product) {
    return res.status(404).json({ message: "Producto no encontrado." });
  }
  res.status(200).json(product);
});

app.post("/productos", async (req, res) => {
  const product = new Product(req.body);
  await product.save();
  res.status(201).json(product);
});

app.listen(PORT, async () => {
  try {
    await mongoose.connect(MONGODB_URI);
    console.log("Conexión establecida con MongoDB");
    console.log(`API corriendo en http://localhost:${PORT}`);
  } catch (error) {
    console.error("Error al conectarse con MongoDB", error.message);
  }
});

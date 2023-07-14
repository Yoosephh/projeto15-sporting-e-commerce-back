import { db } from "../databaseConfig.js";

export const addProducts = async (req, res) => {
  const { name, price, image } = req.body;
  try {
    await db.collection("products").insertOne({ name, price, image });
    res.sendStatus(201);
  } catch {
    res.sendStatus(400);
  }
};

export const getProducts = async (req, res) => {
  const products = await db.collection("products").find().toArray();
  res.send(products);
};

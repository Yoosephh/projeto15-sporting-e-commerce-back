import { Router } from "express";
import {
  addProducts,
  getProducts,
  filterProducts
} from "../controllers/productsControllers.js";

const productsRouter = Router();

productsRouter.post("/produtos", addProducts);
productsRouter.get("/produtos", getProducts);
productsRouter.get("/produtos/:type", filterProducts)

export default productsRouter;

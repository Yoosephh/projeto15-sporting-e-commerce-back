import { Router } from "express";
import {
  addProducts,
  getProducts,
} from "../controllers/productsControllers.js";

const productsRouter = Router();

productsRouter.post("/produtos", addProducts);
productsRouter.get("/produtos", getProducts);

export default productsRouter;

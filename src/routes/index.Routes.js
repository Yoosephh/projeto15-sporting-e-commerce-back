import { Router } from "express";
import userRouter from "./users.Routes.js";
import productsRouter from "./products.Routes.js";

const router = Router();

router.use(userRouter);
router.use(productsRouter);

export default router;

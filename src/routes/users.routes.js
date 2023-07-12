import { Router } from "express";
import { signUp } from "../controllers/userControllers.js";

const userRouter = Router()

userRouter.post('/cadastro', signUp)

export default userRouter
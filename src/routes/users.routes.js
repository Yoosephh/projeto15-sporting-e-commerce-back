import { Router } from "express";
import { login, signUp } from "../controllers/userControllers.js";
import { loginSchema, signUpSchema } from "../schemas/userSchemas.js";
import { validateSchemas } from "../middlewares/validateSchema.js";

const userRouter = Router()

userRouter.post('/cadastro', validateSchemas(signUpSchema), signUp)
userRouter.post('/', validateSchemas(loginSchema), login)

export default userRouter
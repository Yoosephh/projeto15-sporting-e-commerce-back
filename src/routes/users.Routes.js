import { Router } from "express";
import { myCart, login, signUp, userInfo, newSelectedProducts, purchaseConfirmed } from "../controllers/userControllers.js";
import { loginSchema, selectedProductsSchema, signUpSchema } from "../schemas/userSchemas.js";
import { validateSchemas } from "../middlewares/validateSchema.js";
import { validateAuth } from "../middlewares/validateAuth.js";

const userRouter = Router()

userRouter.post('/cadastro', validateSchemas(signUpSchema), signUp)
userRouter.get('/cadastro', validateAuth, userInfo)
userRouter.post('/', validateSchemas(loginSchema), login)
userRouter.get('/meu-carrinho', validateAuth, myCart)
userRouter.post('/meu-carrinho', validateAuth, validateSchemas(selectedProductsSchema), newSelectedProducts)
userRouter.post('/comprador', validateAuth, purchaseConfirmed)

export default userRouter
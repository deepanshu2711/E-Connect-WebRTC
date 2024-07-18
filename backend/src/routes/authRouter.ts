import express from "express"
import { SignInController, SignUpController } from "../controller/authController"

export const authRouter = express.Router()

authRouter.post("/signIn", SignInController)
authRouter.post("/signUp", SignUpController)
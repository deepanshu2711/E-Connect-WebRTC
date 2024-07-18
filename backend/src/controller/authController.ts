import { Request, Response } from "express";
import { UserModel } from "../model/userModel";

export const SignInController = async (req: Request, res: Response) => {
    const { email, password } = req.body

    if (!email || !password) {
        return res.status(400).json({ message: "All fields are required" })
    }

    try {
        const user = await UserModel.findOne({ email, password })
        if (!user) {
            return res.status(401).json({ message: "Invalid credentials" })
        }

        return res.status(200).json({ message: "Login successful", user })
    } catch (error) {
        console.log("SignInController Error:", error)
        return res.status(500).json({ message: "Internal server error" })
    }
}



export const SignUpController = async (req: Request, res: Response) => {
    const { email, password, userName } = req.body

    if (!email || !password || !userName) {
        return res.status(400).json({ message: "All fields are required" })
    }

    try {
        const existingUser = await UserModel.findOne({ email })
        if (existingUser) {
            return res.status(409).json({ message: "User already exists" })
        }
        const user = await UserModel.create({ email, password, userName })
        return res.status(200).json({ message: "Login successful", user })
    } catch (error) {
        console.log("SignUpController Error:", error)
        return res.status(500).json({ message: "Internal server error" })
    }
}


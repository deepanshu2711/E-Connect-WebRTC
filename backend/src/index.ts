import express from "express";
import cors from "cors"
import mongoose from "mongoose"
import { WebSocketServer } from "./ws";
import { authRouter } from "./routes/authRouter";
import dotenv from "dotenv"
import { meetRouter } from "./routes/meetRouter";
dotenv.config()


mongoose.connect(process.env.MONGO as string).then(() => console.log("MongoDB connected"))

const app = express();

app.use(express.json());
app.use(cors({
    origin: "*",
    credentials: true
}))

app.use("/api", authRouter)
app.use("/api", meetRouter)

const server = app.listen(8080, () => {
    console.log("Server started on port 8080");
});


WebSocketServer(server)

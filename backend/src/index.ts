import express from "express";
import { WebSocketServer } from "./ws";

const app = express();

const server = app.listen(8080, () => {
    console.log("Server started on port 8080");
});


WebSocketServer(server)

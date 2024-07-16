"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const ws_1 = require("ws");
const wss = new ws_1.WebSocketServer({ port: 8080 });
let SenderSocket = null;
let ReciverSocket = null;
const RoomMap = new Map();
wss.on("connection", (ws) => {
    ws.onerror = (error) => {
        console.log(error);
    };
    ws.onmessage = (data) => {
        const message = JSON.parse(data.data);
        if (message.type === "sender") {
            console.log("sender connected");
            SenderSocket = ws;
        }
        else if (message.type === "receiver") {
            console.log("receiver connected");
            ReciverSocket = ws;
        }
        else if (message.type === "roomId") {
            console.log("RoomID Recived");
            console.log(message.data);
            const roomId = message.data.roomId;
            if (!RoomMap.has(roomId)) {
                RoomMap.set(roomId, []);
            }
            const roomConnections = RoomMap.get(roomId);
            if (roomConnections.length < 2) {
                roomConnections.push(ws);
                RoomMap.set(roomId, roomConnections);
                console.log(`User connected to room ${roomId}. Total users in room: ${roomConnections.length}`);
            }
            else {
                console.log(`Room ${roomId} is full. Disconnecting user.`);
                ws.send(JSON.stringify({ type: 'error', message: 'Room is full' }));
                ws.close();
            }
        }
    };
});
console.log("server started at port 8080");

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
            const roomId = message.data.roomId;
            if (!RoomMap.has(roomId)) {
                RoomMap.set(roomId, []);
            }
            const roomConnections = RoomMap.get(roomId);
            if (roomConnections.length < 2) {
                roomConnections.push(ws);
                RoomMap.set(roomId, roomConnections);
                if (roomConnections.length === 2) {
                    console.log("Other user joined");
                    SenderSocket === null || SenderSocket === void 0 ? void 0 : SenderSocket.send(JSON.stringify({ type: 'userJoined' }));
                }
                // console.log(`User connected to room ${roomId}. Total users in room: ${roomConnections.length}`);
            }
            else {
                // console.log(`Room ${roomId} is full. Disconnecting user.`);
                ws.send(JSON.stringify({ type: 'error', message: 'Room is full' }));
                ws.close();
            }
        }
        else if (message.type === "createOffer") {
            console.log("create offer");
            if (ws !== SenderSocket) {
                console.log("not sender");
                return;
            }
            ReciverSocket === null || ReciverSocket === void 0 ? void 0 : ReciverSocket.send(JSON.stringify({ type: 'createOffer', sdp: message.sdp }));
        }
        else if (message.type === "createAnswer") {
            console.log("create answer");
            if (ws !== ReciverSocket) {
                return;
            }
            SenderSocket === null || SenderSocket === void 0 ? void 0 : SenderSocket.send(JSON.stringify({ type: 'createAnswer', sdp: message.sdp }));
        }
        else if (message.type === "iceCandidate") {
            console.log("ice candidate");
            if (ws === SenderSocket) {
                ReciverSocket === null || ReciverSocket === void 0 ? void 0 : ReciverSocket.send(JSON.stringify({ type: 'iceCandidate', candidate: message.candidate }));
            }
            else if (ws === ReciverSocket) {
                SenderSocket === null || SenderSocket === void 0 ? void 0 : SenderSocket.send(JSON.stringify({ type: 'iceCandidate', candidate: message.candidate }));
            }
        }
        else if (message.type === "endCall") {
            console.log("end call");
            if (ws === SenderSocket) {
                ReciverSocket === null || ReciverSocket === void 0 ? void 0 : ReciverSocket.send(JSON.stringify({ type: 'endCall' }));
                SenderSocket === null || SenderSocket === void 0 ? void 0 : SenderSocket.send(JSON.stringify({ type: 'endCall' }));
                RoomMap.delete(message.data.roomId);
                console.log(RoomMap.has(message.data.roomId));
            }
            else if (ws === ReciverSocket) {
                SenderSocket === null || SenderSocket === void 0 ? void 0 : SenderSocket.send(JSON.stringify({ type: 'endCall' }));
                ReciverSocket === null || ReciverSocket === void 0 ? void 0 : ReciverSocket.send(JSON.stringify({ type: 'endCall' }));
                RoomMap.delete(message.data.roomId);
                console.log(RoomMap.has(message.data.roomId));
            }
        }
    };
});
console.log("server started at port 8080");

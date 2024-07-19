import { Server } from "http";
import { WebSocket } from "ws";


let SenderSocket: null | WebSocket = null
let ReciverSocket: null | WebSocket = null
const RoomMap = new Map()

export const WebSocketServer = (Server: Server) => {
    const wss = new WebSocket.Server({ server: Server });
    wss.on("connection", (ws) => {
        ws.onerror = (error) => {
            console.log(error);
        }
        ws.onmessage = (data: any) => {
            const message = JSON.parse(data.data);
            if (message.type === "sender") {
                console.log("sender connected")
                SenderSocket = ws
            } else if (message.type === "receiver") {
                console.log("receiver connected")
                ReciverSocket = ws
            } else if (message.type === "roomId") {
                const roomId = message.data.roomId;
                if (!RoomMap.has(roomId)) {
                    RoomMap.set(roomId, []);
                }
                const roomConnections = RoomMap.get(roomId);
                if (roomConnections.length < 2) {
                    roomConnections.push(message.data.email);
                    RoomMap.set(roomId, roomConnections);

                    if (roomConnections.length === 2) {
                        console.log("Other user joined")
                        console.log(RoomMap.get(roomId)[0])
                        console.log(RoomMap.get(roomId)[1])
                        SenderSocket?.send(JSON.stringify({ type: 'userJoined', data: RoomMap.get(roomId)[1] }));
                        ReciverSocket?.send(JSON.stringify({ type: 'userJoined', data: RoomMap.get(roomId)[0] }));
                    }
                    // console.log(`User connected to room ${roomId}. Total users in room: ${roomConnections.length}`);
                } else {
                    // console.log(`Room ${roomId} is full. Disconnecting user.`);
                    ws.send(JSON.stringify({ type: 'error', message: 'Room is full' }));
                    ws.close();
                }

            } else if (message.type === "createOffer") {
                console.log("create offer")
                if (ws !== SenderSocket) {
                    console.log("not sender")
                    return
                }
                ReciverSocket?.send(JSON.stringify({ type: 'createOffer', sdp: message.sdp }));
            } else if (message.type === "createAnswer") {
                console.log("create answer")
                if (ws !== ReciverSocket) {
                    return
                }
                SenderSocket?.send(JSON.stringify({ type: 'createAnswer', sdp: message.sdp }));
            } else if (message.type === "iceCandidate") {
                console.log("ice candidate")
                if (ws === SenderSocket) {
                    ReciverSocket?.send(JSON.stringify({ type: 'iceCandidate', candidate: message.candidate }))
                } else if (ws === ReciverSocket) {
                    SenderSocket?.send(JSON.stringify({ type: 'iceCandidate', candidate: message.candidate }))
                }
            } else if (message.type === "endCall") {
                console.log("end call")
                if (ws === SenderSocket) {
                    ReciverSocket?.send(JSON.stringify({ type: 'endCall' }))
                    RoomMap.delete(message.data.roomId)

                } else if (ws === ReciverSocket) {
                    SenderSocket?.send(JSON.stringify({ type: 'endCall' }))
                    RoomMap.delete(message.data.roomId)
                }
            }
        }
    })

}
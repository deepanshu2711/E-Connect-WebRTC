import { useEffect, useRef, useState } from "react";
import { useSocket } from "../provider/webSocketProvider";
import { MdCallEnd } from "react-icons/md";
import { useNavigate, useParams } from "react-router-dom";

const SenderRoom = () => {
  const socket = useSocket();
  const [pc, setPc] = useState<RTCPeerConnection | null>(null);
  const myVideoRef = useRef<HTMLVideoElement | null>(null);
  const [myStream, setMyStream] = useState<MediaStream | null>(null);
  const remoteRef = useRef<HTMLVideoElement | null>(null);
  const [startTime, setStartTime] = useState<string>("");
  const [endTime, setEndTime] = useState<string>("");
  const navigate = useNavigate();
  const params = useParams();

  useEffect(() => {
    if (socket.socket === null) {
      return;
    }
    socket.socket.onmessage = (event) => {
      const message = JSON.parse(event.data);
      if (message.type === "userJoined") {
        console.log(message.data);
        InitiateConnection();
        setStartTime(Date.now().toLocaleString("en-US"));
      }
    };
  }, [socket.socket]);

  const InitiateConnection = async () => {
    console.log("InitiateConnection");
    console.log(socket.isConnected);
    if (!socket.socket || socket.isConnected === false) {
      console.log("socket not connected");
      return;
    }

    const pc = new RTCPeerConnection({
      iceServers: [
        {
          urls: "stun:stun.l.google.com:19302",
        },
      ],
    });

    pc.onicecandidate = (event) => {
      console.log(event);
      if (event.candidate) {
        socket.socket?.send(
          JSON.stringify({ type: "iceCandidate", candidate: event.candidate })
        );
      }
    };

    pc.ontrack = (event) => {
      console.log(event);
      if (remoteRef.current) {
        remoteRef.current.srcObject = new MediaStream([event.track]);
      }
    };

    socket.socket.onmessage = async (event) => {
      const message = JSON.parse(event.data);
      if (message.type === "createAnswer") {
        console.log("sender recived remote description");
        await pc.setRemoteDescription(message.sdp);
      } else if (message.type === "iceCandidate") {
        pc.addIceCandidate(message.candidate);
      } else if (message.type === "endCall") {
        console.log("sender recived end call");
        pc.close();
        socket.socket?.close();
        setEndTime(Date.now().toLocaleString("en-US"));
        //save this data in database
      }
    };

    pc.onnegotiationneeded = async () => {
      const offer = await pc.createOffer();
      await pc.setLocalDescription(offer);
      socket.socket?.send(
        JSON.stringify({
          type: "createOffer",
          sdp: pc.localDescription,
        })
      );
    };

    getCameraStreamAndSend(pc);
  };

  const getCameraStreamAndSend = (pc: RTCPeerConnection) => {
    navigator.mediaDevices
      .getUserMedia({ video: true, audio: true })
      .then((stream) => {
        setMyStream(stream);
        if (myVideoRef.current) {
          myVideoRef.current.srcObject = stream;
        }
        stream.getTracks().forEach((track) => {
          pc?.addTrack(track);
        });
      });
  };

  const handleEndCall = () => {
    socket.socket?.send(
      JSON.stringify({ type: "endCall", data: params.roomId })
    );
    setEndTime(Date.now().toLocaleString("en-US"));
    navigate("/dashboard");
  };

  return (
    <div className="h-screen w-full bg-[#1C1F2E]">
      <div className="w-full h-full bg-gray-500">
        <video
          ref={remoteRef}
          autoPlay
          muted
          className="h-screen w-screen object-cover"
        />
      </div>
      <div className=" absolute top-5 left-5 rounded-xl w-[300px] h-[200px] bg-black">
        <div className="absolute top-0 left-0 py-2 px-5  bg-white">
          <p className="text-black font-semibold">You</p>
        </div>
        <video
          ref={myVideoRef}
          autoPlay
          muted
          className="h-full w-full border-4 object-cover rounded-xl"
        />
      </div>
      <div className="flex items-center gap-4 absolute bottom-10  left-[50%]">
        {/* <div className="h-16 w-16 rounded-full bg-black"></div>
        <div className="h-16 w-16 rounded-full bg-black"></div> */}
        {/* <div className="h-16 w-16 rounded-full bg-black"></div> */}
        <div
          onClick={handleEndCall}
          className="h-16 w-16 flex items-center justify-center rounded-full bg-rose-600"
        >
          <MdCallEnd className="h-10 w-10 text-white" />
        </div>
      </div>
    </div>
  );
};

export default SenderRoom;

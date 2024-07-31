import { useEffect, useRef } from "react";
import { useSocket } from "../provider/webSocketProvider";
import { MdCallEnd } from "react-icons/md";
import { useNavigate, useParams } from "react-router-dom";

const ReceiverRoom = () => {
  const myVideoRef = useRef<HTMLVideoElement | null>(null);
  const RemoteRef = useRef<HTMLVideoElement | null>(null);
  // const [pc, setPc] = useState<RTCPeerConnection | null>(null);
  const navigate = useNavigate();
  const socket = useSocket();
  const params = useParams();

  console.log(params);

  useEffect(() => {
    if (socket.socket === null) {
      return;
    }

    startReciving(socket.socket);
  }, [socket.socket]);

  const startReciving = (socket: WebSocket) => {
    const pc = new RTCPeerConnection({
      iceServers: [
        {
          urls: "stun:stun.l.google.com:19302",
        },
      ],
    });

    // setPc(pc);
    pc.ontrack = (event) => {
      console.log(event);
      if (RemoteRef.current) {
        RemoteRef.current.srcObject = new MediaStream([event.track]);
      }
    };

    socket.onmessage = (event) => {
      const message = JSON.parse(event.data);
      if (message.type === "createOffer") {
        pc.setRemoteDescription(message.sdp).then(() => {
          pc.createAnswer().then((answer) => {
            pc.setLocalDescription(answer);
            socket.send(
              JSON.stringify({
                type: "createAnswer",
                sdp: answer,
              })
            );
          });
        });
      } else if (message.type === "iceCandidate") {
        pc.addIceCandidate(message.candidate);
      } else if (message.type === "endCall") {
        pc.close();
        socket.close();
        navigate("/dashboard");
      }
    };

    getCameraStreamAndSend(pc);
  };

  const getCameraStreamAndSend = (pc: RTCPeerConnection) => {
    navigator.mediaDevices
      .getUserMedia({ video: true, audio: true })
      .then((stream) => {
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
    navigate("/dashboard");
  };

  return (
    <div className="h-screen w-full bg-[#1C1F2E]">
      <div className="w-full h-full bg-gray-500">
        <video
          ref={RemoteRef}
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
          className="h-full border-4 w-full object-cover rounded-xl"
        />
      </div>
      <div className="flex items-center gap-4 absolute bottom-10  left-[50%]">
        {/* <div className="h-16 w-16 rounded-full bg-black"></div>
        <div className="h-16 w-16 rounded-full bg-black"></div> */}
        {/* <div className="h-16 w-16 cursor-pointer flex items-center justify-center rounded-full bg-blue-600 hover:bg-blue-700">
          {videoOn ? (
            <PiVideoCameraDuotone
              className="h-10 w-10 text-white"
              onClick={togglevideoOn}
            />
          ) : (
            <PiVideoCameraSlashDuotone
              className="h-10 w-10 text-white"
              onClick={togglevideoOn}
            />
          )}
        </div> */}
        <div
          onClick={handleEndCall}
          className="h-16 w-16 cursor-pointer flex items-center justify-center rounded-full bg-rose-500 hover:bg-rose-600"
        >
          <MdCallEnd className="h-10 w-10 text-white" />
        </div>
      </div>
    </div>
  );
};

export default ReceiverRoom;

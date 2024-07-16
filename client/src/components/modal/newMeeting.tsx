import { useEffect, useState } from "react";
import { RxCross2 } from "react-icons/rx";
import { useSocket } from "../../provider/webSocketProvider";
import { useNavigate } from "react-router-dom";

const CreateNewMeetingModal = ({
  handleClose,
}: {
  handleClose: () => void;
}) => {
  const [roomId, setRoomId] = useState("");
  const [email, setEmail] = useState("");
  const navigate = useNavigate();
  const socket = useSocket();

  useEffect(() => {
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = "auto";
    };
  }, []);

  useEffect(() => {
    setRoomId(generateRandomString(10));
  }, []);

  const handleCreateMeeting = () => {
    if (socket.isConnected === false) {
      return;
    }
    socket.socket?.send(JSON.stringify({ type: "sender" }));
    socket.socket?.send(
      JSON.stringify({ type: "roomId", data: { roomId, email } })
    );

    navigate(`room/sender/${roomId}`);
  };

  function generateRandomString(length: number) {
    const characters =
      "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
    let result = "";

    for (let i = 0; i < length; i++) {
      const randomIndex = Math.floor(Math.random() * characters.length);
      result += characters.charAt(randomIndex);
    }

    return result;
  }

  return (
    <div className="fixed inset-0 flex items-center justify-center z-50">
      <div className="absolute inset-0 bg-black opacity-50"></div>
      <div className="relative bg-slate-950 w-[350px] p-4 z-10">
        <div className="flex items-center justify-between">
          <p className="text-white">Create New Meeting</p>
          <RxCross2
            className="h-5 w-5 text-white cursor-pointer"
            onClick={handleClose}
          />
        </div>
        <div className="flex  gap-1 flex-col mt-10">
          <label className="text-white text-[12px]">E-mail</label>
          <input
            required
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="p-2 focus-within:outline-none bg-[#1C1F2E] text-white"
            placeholder="johnDoe@gmail.com"
          />
        </div>
        <button
          onClick={handleCreateMeeting}
          className="bg-[#FF742E] mt-5 p-2 text-white text-center w-full"
        >
          Create Meeting
        </button>
      </div>
    </div>
  );
};

export default CreateNewMeetingModal;

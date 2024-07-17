import { useEffect, useState } from "react";
import { RxCross2 } from "react-icons/rx";
import { useSocket } from "../../provider/webSocketProvider";
import { useNavigate } from "react-router-dom";
import { IoIosCopy } from "react-icons/io";
import { IoCheckmarkDoneSharp } from "react-icons/io5";

const CreateNewMeetingModal = ({
  handleClose,
}: {
  handleClose: () => void;
}) => {
  const [roomId, setRoomId] = useState("");
  const [email, setEmail] = useState("");
  const [copyRoomId, setCopyRoomId] = useState(false);
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

  const handleCopyRoomID = () => {
    setCopyRoomId(true);
    navigator.clipboard.writeText(roomId);
  };

  return (
    <div className="fixed inset-0 flex items-center justify-center z-50">
      <div className="absolute inset-0 bg-black opacity-50"></div>
      <div className="relative bg-slate-950 w-[350px] rounded-xl p-4 z-10">
        <div className="flex items-center justify-between">
          <p className="text-white font-semibold">Create New Meeting</p>
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
            className="p-2 focus-within:outline-none rounded-lg bg-[#1C1F2E] text-white"
            placeholder="johnDoe@gmail.com"
          />
        </div>
        <p className="mt-5 text-white text-[12px] mb-1">Room Id</p>
        <div className="flex items-center justify-between gap-1 rounded-lg  bg-[#1C1F2E] p-2">
          <p className="text-white">{roomId}</p>

          {copyRoomId ? (
            <IoCheckmarkDoneSharp
              onClick={handleCopyRoomID}
              className="text-emerald-500 cursor-pointer h-5 w-5 mr-2"
            />
          ) : (
            <IoIosCopy
              onClick={handleCopyRoomID}
              className="text-white cursor-pointer h-5 w-5 mr-2"
            />
          )}
        </div>
        <button
          onClick={handleCreateMeeting}
          className="bg-[#FF742E] mt-5 p-2 rounded-lg font-semibold text-white text-center w-full"
        >
          Create Meeting
        </button>
      </div>
    </div>
  );
};

export default CreateNewMeetingModal;

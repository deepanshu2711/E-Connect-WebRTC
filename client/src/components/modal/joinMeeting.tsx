import { useEffect, useState } from "react";
import { RxCross2 } from "react-icons/rx";
import { useSocket } from "../../provider/webSocketProvider";
import { useNavigate } from "react-router-dom";
import { User } from "../../types";
import { IoCheckmarkDoneSharp } from "react-icons/io5";

const JoinMeetingModal = ({
  handleClose,
  currentUser,
}: {
  handleClose: () => void;
  currentUser: User;
}) => {
  const [roomId, setRoomId] = useState("");
  const navigate = useNavigate();
  const socket = useSocket();
  useEffect(() => {
    document.body.style.overflow = "hidden";

    return () => {
      document.body.style.overflow = "auto";
    };
  }, []);

  const handleJoinMeeting = () => {
    if (socket.isConnected === false) {
      return;
    }
    socket.socket?.send(JSON.stringify({ type: "receiver" }));
    socket.socket?.send(
      JSON.stringify({
        type: "roomId",
        data: { roomId, email: currentUser.email },
      })
    );

    navigate(`room/receiver/${roomId}`);
  };

  return (
    <div className="fixed inset-0 flex items-center justify-center z-50">
      <div className="absolute inset-0 bg-black opacity-50"></div>
      <div className="relative bg-slate-950 w-[350px] p-4 z-10 rounded-xl">
        <div className="flex items-center justify-between">
          <p className="text-white font-semibold">Join Meeting</p>
          <RxCross2
            className="h-5 w-5 cursor-pointer text-white"
            onClick={handleClose}
          />
        </div>
        <div className="flex  gap-1 flex-col mt-10">
          <label className="text-white text-[12px]">E-mail</label>
          <div className="p-2 flex items-center justify-between focus-within:outline-none rounded-lg bg-[#1C1F2E] text-white">
            <p>{currentUser.email}</p>
            <IoCheckmarkDoneSharp className="text-emerald-500 cursor-pointer h-5 w-5 mr-2" />
          </div>
        </div>
        <div className="flex  gap-1 flex-col mt-5">
          <label className="text-white text-[12px]">Room Id</label>
          <input
            value={roomId}
            onChange={(e) => setRoomId(e.target.value)}
            className="p-2 focus-within:outline-none rounded-lg bg-[#1C1F2E] text-white"
            placeholder="wdahvkh12j"
          />
        </div>

        <button
          onClick={handleJoinMeeting}
          className="bg-[#830EF9] rounded-lg font-semibold mt-5 p-2 text-white text-center w-full"
        >
          Join Meeting
        </button>
      </div>
    </div>
  );
};

export default JoinMeetingModal;

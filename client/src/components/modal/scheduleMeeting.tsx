import { useEffect, useState } from "react";
import { RxCross2 } from "react-icons/rx";
import { IoIosCopy } from "react-icons/io";
import { IoCheckmarkDoneSharp } from "react-icons/io5";
import { ScheduledMeeting, User } from "../../types";
import axios from "axios";

const ScheduleMeeting = ({
  handleClose,
  currentUser,
}: {
  handleClose: () => void;
  currentUser: User;
}) => {
  const [roomId, setRoomId] = useState("");
  const [dateTime, setDateTime] = useState("");
  const [email, setEmail] = useState("");
  const [copyRoomId, setCopyRoomId] = useState(false);
  const [meetingScheduled, setMeetingScheduled] = useState(false);
  const [scheduledMeetingDetails, setScheduledMeetingDetails] =
    useState<ScheduledMeeting | null>(null);

  useEffect(() => {
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = "auto";
    };
  }, []);

  useEffect(() => {
    setRoomId(generateRandomString(10));
  }, []);

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
    navigator.clipboard.writeText(scheduledMeetingDetails?.roomId as string);
  };

  const handleScheduleMeeting = async () => {
    try {
      const responce = await axios.post(
        "http://localhost:8080/api/scheduleMeeting",
        {
          senderEmail: currentUser.email,
          receiverEmail: email,
          roomId: roomId,
          dateTime: dateTime,
        }
      );

      if (responce.status === 200) {
        setMeetingScheduled(true);
        setScheduledMeetingDetails(responce.data.data);
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="fixed inset-0 flex items-center justify-center z-50">
      <div className="absolute inset-0 bg-black opacity-50"></div>
      <div className="relative bg-slate-950 w-[350px] rounded-xl p-4 z-10">
        {meetingScheduled ? (
          <div>
            <div className="flex flex-col items-center gap-2 mt-5">
              <img src="/done.svg" className="h-[60px] w-[60px]" />
              <p className="text-white font-semibold tsxt-[16px]">
                Meeting Created
              </p>
            </div>
            <div
              onClick={handleCopyRoomID}
              className="flex items-center cursor-pointer bg-blue-600 p-1 text-white gap-4 rounded-lg  justify-center mt-5"
            >
              <p>Copy room Id</p>
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
              onClick={handleClose}
              className="p-1 bg-[#252A41] text-gray-300 text-center w-full rounded-lg mt-5"
            >
              Close
            </button>
          </div>
        ) : (
          <div>
            <div className="flex items-center justify-between">
              <p className="text-white font-semibold">Schedule Meeting</p>
              <RxCross2
                className="h-5 w-5 text-white cursor-pointer"
                onClick={handleClose}
              />
            </div>

            <div className="flex  gap-1 flex-col mt-10 w-full">
              <label className="text-white text-[12px]">Date and time</label>
              <input
                type="datetime-local"
                placeholder="Date and time"
                value={dateTime}
                onChange={(e) => setDateTime(e.target.value)}
                className="p-2  items-center w-[100%] justify-between rounded-lg  focus-within:outline-none  bg-[#1C1F2E] text-white font-size:16px font-family:sans-serif"
              />
            </div>

            <div className="flex  gap-1 flex-col mt-5">
              <div className="flex items-center gap-2">
                <label className="text-white text-[12px] mb-1">E-mail</label>
                <p className="text-[12px] text-gray-500">
                  (Email of the user with whom you want to join)
                </p>
              </div>
              <div className="p-2 flex items-center justify-between focus-within:outline-none rounded-lg bg-[#1C1F2E] text-white">
                <input
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  type="email"
                  className=" flex  items-center w-[100%] justify-between rounded-lg   focus-within:outline-none  bg-[#1C1F2E] text-white font-size:16px font-family:sans-serif"
                />
              </div>
            </div>

            <button
              onClick={handleScheduleMeeting}
              className="bg-[#F9A90E] mt-5 p-2 rounded-lg font-semibold text-white text-center w-full"
            >
              Schedule Meeting
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default ScheduleMeeting;

import { useEffect, useState } from "react";
import { useUser } from "../../provider/currentUserProvider";

import axios from "axios";
import { ScheduledMeeting } from "../../types";
import { useSocket } from "../../provider/webSocketProvider";
import { useNavigate } from "react-router-dom";

const UpComingMeetings = () => {
  const currentUser = useUser();
  const socket = useSocket();
  const navigate = useNavigate();
  const [allMeetings, setAllMeetings] = useState<ScheduledMeeting[]>([]);

  useEffect(() => {
    const fetchuserMeetings = async () => {
      try {
        const responce = await axios.get(
          `http://localhost:8080/api/getUserUpcomingMeetings/${currentUser.user?.email}`
        );
        console.log(responce.data);

        if (responce.status === 200) {
          setAllMeetings(responce.data.data);
        }
      } catch (error) {
        console.log(error);
      }
    };
    fetchuserMeetings();
  }, [currentUser]);

  const checkMeetingStatus = (dateTime: string) => {
    const currentDate = new Date();
    const meetingDate = new Date(dateTime);
    return currentDate < meetingDate;
  };

  const handleJoinMeeting = (
    roomId: string,
    senderEmail: string,
    receiverEmail: string
  ) => {
    if (socket.isConnected === false) {
      return;
    }

    const path =
      senderEmail === currentUser.user?.email
        ? `/dashboard/room/sender/${roomId}`
        : `/dashboard/room/receiver/${roomId}`;

    socket.socket?.send(
      JSON.stringify({
        type: senderEmail === currentUser.user?.email ? "sender" : "receiver",
      })
    );

    socket.socket?.send(
      JSON.stringify({
        type: "roomId",
        data: {
          roomId,
          email:
            senderEmail === currentUser.user?.email
              ? senderEmail
              : receiverEmail,
        },
      })
    );

    navigate(path);
  };

  return (
    <div className="p-4 h-[100%] bg-slate-950">
      <h1 className="text-white text-3xl font-semibold">Upcoming Meetings</h1>
      <div className="grid grid-cols-3 gap-4 mt-10">
        {allMeetings &&
          allMeetings.length > 0 &&
          allMeetings.map((meeting) => (
            <div className="bg-[#1C1F2E] p-4 flex flex-col gap-1 rounded-xl">
              <div className="flex items-center justify-between">
                <div>
                  <img src="/upcomming.svg" className="h-5 w-5 text-white" />
                  <p className="text-white font-semibold">Meeting Name here</p>
                  <p className="text-gray-300 font-semibold text-[14px]">
                    {new Date(
                      meeting.dateTime || "2024-07-20T17:48:04.168+00:00"
                    ).toLocaleString()}
                  </p>
                </div>
                <div>
                  <button
                    disabled={checkMeetingStatus(meeting.dateTime)}
                    onClick={() =>
                      handleJoinMeeting(
                        meeting.roomId,
                        meeting.senderEmail,
                        meeting.receiverEmail
                      )
                    }
                    className="bg-blue-600 text-gray-300 text-[14px] rounded-xl max-w-fit p-2 disabled:bg-gray-700"
                  >
                    Join Meeting
                  </button>
                </div>
              </div>
              <p className="text-gray-300 mt-5">Participants :</p>
              <div className="flex items-center justify-between">
                <div className="flex flex-wrap items-center gap-2 ">
                  <p className="bg-slate-950 text-gray-300 text-[14px] rounded-xl max-w-fit p-2">
                    {meeting?.senderEmail}
                  </p>
                  <p className="bg-slate-950 text-gray-300 text-[14px] rounded-xl max-w-fit p-2">
                    {meeting?.receiverEmail}
                  </p>
                </div>
              </div>
            </div>
          ))}
      </div>
    </div>
  );
};

export default UpComingMeetings;

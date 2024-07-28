import { useEffect, useState } from "react";
import { BiPlus } from "react-icons/bi";
import { FaRegUser } from "react-icons/fa6";
import { LuCalendar } from "react-icons/lu";
import CreateNewMeetingModal from "../components/modal/newMeeting";
import JoinMeetingModal from "../components/modal/joinMeeting";
import { useUser } from "../provider/currentUserProvider";
import { ScheduledMeeting, User } from "../types";
import ScheduleMeeting from "../components/modal/scheduleMeeting";
import axios from "axios";

const Dashboard = () => {
  const [currentTime, setCurrentTime] = useState(new Date());
  const [OpenCreateNewMeeting, setOpenCreateNewMeeting] = useState(false);
  const [OpenJoinMeeting, setOpenJoinMeeting] = useState(false);
  const [openScheduleMeeting, setOpenScheduleMeeting] = useState(false);
  const [allMeetings, setAllMeetings] = useState<ScheduledMeeting[]>([]);
  const [pendingMeetings, setPendingMeetings] = useState<ScheduledMeeting[]>(
    []
  );
  const currentUser = useUser();

  console.log(currentUser);

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

  useEffect(() => {
    const filterMeetings = () => {
      const now = new Date();
      const filtered = allMeetings.filter((meeting) => {
        const meetingDate = new Date(meeting.dateTime);
        return meeting.status === "Pending" && meetingDate > now;
      });
      setPendingMeetings(filtered);
    };

    filterMeetings();
  }, [allMeetings]);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentTime(new Date());
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  const formatDate = (date: Date): string => {
    const options: Intl.DateTimeFormatOptions = {
      weekday: "long",
      day: "numeric",
      month: "long",
      year: "numeric",
    };
    return date.toLocaleDateString(undefined, options);
  };

  const handleCreateNewMeeting = () => {
    setOpenCreateNewMeeting(!OpenCreateNewMeeting);
  };

  const handleJoinMeeting = () => {
    setOpenJoinMeeting(!OpenJoinMeeting);
  };

  const handleScheduleMeeting = () => {
    setOpenScheduleMeeting(!openScheduleMeeting);
  };

  return (
    <div className="p-4 h-[100%] bg-slate-950">
      <div className="relative w-full h-[223px]">
        <img
          src="/hero.png"
          className="w-full h-full object-cover transform scale-x-[-1] rounded-lg "
        />
        <div className="absolute bottom-4 left-4 flex flex-col gap-2">
          <p className="text-white text-5xl font-bold">
            {currentTime.toLocaleTimeString()}
          </p>
          <p className="text-[#ECF0FF] text-[18px] font-medium">
            {formatDate(currentTime)}
          </p>
        </div>
      </div>
      <div className="flex items-center gap-4 mt-4">
        <div
          onClick={handleCreateNewMeeting}
          className="bg-[#FF742E] cursor-pointer flex flex-col justify-between p-4 rounded-xl h-[150px] w-[200px]"
        >
          <div className="bg-white/50 h-[36px] flex items-center justify-center w-[36px]  rounded-lg">
            <BiPlus className="h-[30px] text-white  w-[30px]" />
          </div>
          <div>
            <p className="text-white font-semibold text-[18px]">New Meeting</p>
            <p className="text-[#ECF0FF] text-[12px]">
              Create an instant meeting
            </p>
          </div>
        </div>

        <div
          onClick={handleJoinMeeting}
          className="bg-[#830EF9] cursor-pointer flex flex-col justify-between p-4 rounded-xl h-[150px] w-[200px]"
        >
          <div className="bg-white/50 h-[36px] flex items-center justify-center w-[36px]  rounded-lg">
            <FaRegUser className="h-[20px] text-white  w-[20px]" />
          </div>
          <div>
            <p className="text-white font-semibold text-[18px]">Join Meeting</p>
            <p className="text-[#ECF0FF] text-[12px]">
              Join a meeting via room Id
            </p>
          </div>
        </div>

        <div
          onClick={handleScheduleMeeting}
          className="bg-[#F9A90E] cursor-pointer flex flex-col justify-between p-4 rounded-xl h-[150px] w-[200px]"
        >
          <div className="bg-white/50 h-[36px] flex items-center justify-center w-[36px]  rounded-lg">
            <LuCalendar className="h-[25px] text-white w-[25px]" />
          </div>
          <div>
            <p className="text-white font-semibold text-[18px]">
              Schedule Meeting
            </p>
            <p className="text-[#ECF0FF] text-[12px]">Plan your meeting</p>
          </div>
        </div>
      </div>

      {pendingMeetings && pendingMeetings.length > 0 && (
        <div className="flex flex-col gap-4 mt-4">
          <p className="text-white font-semibold text-[22px]">
            Today’s Upcoming Meetings
          </p>
          <div className="grid grid-cols-3 gap-4">
            {pendingMeetings &&
              pendingMeetings.length > 0 &&
              pendingMeetings.map((meeting) => (
                <div className="bg-[#1C1F2E] p-4 flex w-full justify-between  gap-1 rounded-xl">
                  <div className="flex items-center justify-between">
                    <div>
                      <img
                        src="/upcomming.svg"
                        className="h-5 w-5 text-white"
                      />
                      <p className="text-white font-semibold">
                        Meeting Name here
                      </p>
                      <p className="text-gray-300 font-semibold text-[14px]">
                        {new Date(
                          meeting.dateTime || "2024-07-20T17:48:04.168+00:00"
                        ).toLocaleString()}
                      </p>
                    </div>
                    <div></div>
                  </div>
                  {/* <p className="text-gray-300 mt-5">Participants :</p> */}
                  <div className="flex ">
                    <div className="flex flex-col items-center gap-2 ">
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
      )}

      {OpenCreateNewMeeting && (
        <CreateNewMeetingModal
          handleClose={handleCreateNewMeeting}
          currentUser={currentUser.user as User}
        />
      )}

      {OpenJoinMeeting && (
        <JoinMeetingModal
          handleClose={handleJoinMeeting}
          currentUser={currentUser.user as User}
        />
      )}

      {openScheduleMeeting && (
        <ScheduleMeeting
          handleClose={handleScheduleMeeting}
          currentUser={currentUser.user as User}
        />
      )}
    </div>
  );
};

export default Dashboard;

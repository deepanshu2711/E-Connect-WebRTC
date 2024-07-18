import { useEffect, useState } from "react";
import { BiPlus } from "react-icons/bi";
import { FaRegUser } from "react-icons/fa6";
import { LuCalendar } from "react-icons/lu";
import CreateNewMeetingModal from "../components/modal/newMeeting";
import JoinMeetingModal from "../components/modal/joinMeeting";

const Dashboard = () => {
  const [currentTime, setCurrentTime] = useState(new Date());
  const [OpenCreateNewMeeting, setOpenCreateNewMeeting] = useState(false);
  const [OpenJoinMeeting, setOpenJoinMeeting] = useState(false);

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

  return (
    <div className="p-4 h-[100%] bg-slate-950">
      <div className="relative w-full h-[253px]">
        <img
          src="https://s3-alpha-sig.figma.com/img/617d/6a49/dbb41d63aba7130ea6afa867345c68c7?Expires=1722211200&Key-Pair-Id=APKAQ4GOSFWCVNEHN3O4&Signature=CUbIcMWV-KLSS6oYDusUAEAhHiTkJExvV99SJJSLm2HZanjlE993HnMLHAKNxSz3CnILduqUldUX4eqBDqswajDt9~oiSQ2YSu-j8Wu7t1HK-Kh3DoymXPBWd-HVZo4TpYkqBCpknSviUdC-yo6K07xgOXStp7e74KvfBerfgp4wcWGA2jm0XPLEPeQQCd7Dzmg2Y5bOiRKJKat-3FYGB-f2LzPKxZ7xjeVyqynggQ1bN2O7klMt-~8Rsn5x1NfC5cDUFIW7r4W3gNPqM64UtBPXIFdBQ88evMZHq4nBtBSTo4ybahvY7Sr5Z53aVORDBLwdBM0QErfJqQ~~X0ezZA__"
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
          className="bg-[#FF742E] cursor-pointer flex flex-col justify-between p-4 rounded-xl h-[200px] w-[200px]"
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
          className="bg-[#830EF9] cursor-pointer flex flex-col justify-between p-4 rounded-xl h-[200px] w-[200px]"
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
          onClick={handleJoinMeeting}
          className="bg-[#F9A90E] cursor-pointer flex flex-col justify-between p-4 rounded-xl h-[200px] w-[200px]"
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

      {OpenCreateNewMeeting && (
        <CreateNewMeetingModal handleClose={handleCreateNewMeeting} />
      )}

      {OpenJoinMeeting && <JoinMeetingModal handleClose={handleJoinMeeting} />}
    </div>
  );
};

export default Dashboard;
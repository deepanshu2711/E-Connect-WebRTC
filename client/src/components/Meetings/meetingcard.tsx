import { Meeting } from "../../types";

const Meetingcard = ({ meeting }: { meeting: Meeting }) => {
  const calculateDuration = () => {
    const start = parseInt(meeting.startTime.replace(/,/g, ""), 10);
    const end = parseInt(meeting.endTime.replace(/,/g, ""), 10);
    const durationMs = end - start;
    return durationMs;
  };
  const formatDuration = (durationMs: number) => {
    const seconds = Math.floor(durationMs / 1000);
    return `${seconds} seconds`;
  };
  const durationMs = calculateDuration();
  const formattedDuration = formatDuration(durationMs);

  return (
    <div className="bg-[#1C1F2E] p-4 flex flex-col gap-1 rounded-xl">
      <img src="/previous.svg" className="h-5 w-5 text-white" />
      <p className="text-white font-semibold">Meeting Name here</p>
      <p className="text-gray-300 font-semibold text-[14px]">
        {new Date(
          meeting.createdAt || "2024-07-20T17:48:04.168+00:00"
        ).toLocaleString()}
      </p>
      <div className="flex items-center gap-2">
        <p className="text-white text-[14px] font-semibold">
          Meeting Duration :
        </p>
        <p className="text-gray-300 font-semibold text-[14px]">
          {formattedDuration}
        </p>
      </div>
      <p className="text-gray-300 mt-5">Participants :</p>
      <div className="flex items-center justify-between">
        <div className="flex flex-wrap items-center gap-2 ">
          <p className="bg-slate-950 text-gray-300 text-[14px] rounded-xl max-w-fit p-2">
            {meeting.senderEmail}
          </p>
          <p className="bg-slate-950 text-gray-300 text-[14px] rounded-xl max-w-fit p-2">
            {meeting.reciverEmail}
          </p>
        </div>
      </div>
    </div>
  );
};

export default Meetingcard;

import Meetingcard from "./meetingcard";

const PreviousMeetings = () => {
  return (
    <div className="p-4 h-[100%] bg-slate-950">
      <h1 className="text-white text-3xl font-semibold">Previous Meetings</h1>
      <div className="grid grid-cols-3 gap-10 mt-10">
        <Meetingcard />
        <Meetingcard />
        <Meetingcard />
        <Meetingcard />
        <Meetingcard />
        <Meetingcard />
        <Meetingcard />
        <Meetingcard />
        <Meetingcard />
      </div>
    </div>
  );
};

export default PreviousMeetings;

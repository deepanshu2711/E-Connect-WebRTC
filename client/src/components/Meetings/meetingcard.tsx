const Meetingcard = () => {
  return (
    <div className="bg-[#1C1F2E] p-4 flex flex-col gap-1 rounded-xl">
      <img src="/previous.svg" className="h-5 w-5 text-white" />
      <p className="text-white font-semibold">Meeting Name here</p>
      <p className="text-gray-300 text-[12px]">
        March 15 ,2024 11:00 AM - 12:00 PM
      </p>

      <div className="flex flex-col gap-2 mt-5">
        <p className="text-gray-300">Participants :</p>
        <p className="bg-slate-950 text-gray-300 text-[14px] rounded-xl max-w-fit p-2">
          deepanshusaini2711@gmail.com
        </p>
      </div>
    </div>
  );
};

export default Meetingcard;

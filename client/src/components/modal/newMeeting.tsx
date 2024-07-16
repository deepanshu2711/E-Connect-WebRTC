import { useEffect } from "react";
import { RxCross2 } from "react-icons/rx";

const CreateNewMeetingModal = ({
  handleClose,
}: {
  handleClose: () => void;
}) => {
  useEffect(() => {
    document.body.style.overflow = "hidden";

    return () => {
      document.body.style.overflow = "auto";
    };
  }, []);

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
            className="p-2 focus-within:outline-none bg-[#1C1F2E] text-white"
            placeholder="johnDoe@gmail.com"
          />
        </div>
        {/* <div className="flex  gap-1 flex-col mt-5">
          <label className="text-white text-[12px]">Room Id</label>
          <input
            className="p-2 focus-within:outline-none bg-[#1C1F2E] text-white"
            placeholder="ahvkh12jhv34242"
          />
        </div> */}

        <button className="bg-[#FF742E] mt-5 p-2 text-white text-center w-full">
          Create Meeting
        </button>
      </div>
    </div>
  );
};

export default CreateNewMeetingModal;

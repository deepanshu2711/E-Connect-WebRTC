import { GoHome } from "react-icons/go";

const SideBarItems = () => {
  return (
    <div className="p-2 flex items-center bg-[#0E78F9] w-full rounded-lg">
      <GoHome className="h-5 w-5 text-white" />
      <p className="ml-2 text-white">Home</p>
    </div>
  );
};

export default SideBarItems;

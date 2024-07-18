import { GoHome } from "react-icons/go";
import { LuLogOut } from "react-icons/lu";
import { useUser } from "../../provider/currentUserProvider";
import { useNavigate } from "react-router-dom";

const SideBarItems = () => {
  const curentUser = useUser();
  const navigate = useNavigate();

  const handleLogOut = () => {
    curentUser.setUser(null);
    navigate("/signIn");
  };

  return (
    <div className="flex flex-col gap-3">
      <div className="p-2 flex items-center bg-[#0E78F9] w-full rounded-lg">
        <GoHome className="h-5 w-5 text-white" />
        <p className="ml-2 text-white">Home</p>
      </div>
      <div
        onClick={handleLogOut}
        className="p-2 flex items-center hover:bg-[#0E78F9] cursor-pointer  w-full rounded-lg"
      >
        <LuLogOut className="h-5 w-5 text-white" />
        <p className="ml-2 text-white">Logout</p>
      </div>
    </div>
  );
};

export default SideBarItems;

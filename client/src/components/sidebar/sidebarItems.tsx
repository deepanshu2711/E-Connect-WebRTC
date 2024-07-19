import { GoHome } from "react-icons/go";
import { LuLogOut } from "react-icons/lu";
import { useUser } from "../../provider/currentUserProvider";
import { useLocation, useNavigate } from "react-router-dom";

const SideBarItems = () => {
  const curentUser = useUser();
  const navigate = useNavigate();
  const location = useLocation();

  const handleLogOut = () => {
    curentUser.setUser(null);
    navigate("/signIn");
  };

  const handleClick = (link: string) => {
    navigate(link);
  };

  return (
    <div className="flex flex-col gap-3">
      <div
        onClick={() => handleClick("/dashboard")}
        className={`p-2 flex items-center hover:bg-blue-600 cursor-pointer  ${
          location.pathname === "/dashboard" && "bg-[#0E78F9]"
        } w-full rounded-lg`}
      >
        <GoHome className="h-5 w-5 text-white" />
        <p className="ml-2 text-white">Home</p>
      </div>
      <div
        onClick={() => handleClick("/previousMeetings")}
        className={`p-2 flex cursor-pointer items-center hover:bg-blue-600  ${
          location.pathname === "/previousMeetings" && "bg-[#0E78F9]"
        } w-full rounded-lg`}
      >
        <img src="/previous.svg" className="h-5 w-5 text-white" />
        <p className="ml-2 text-white">Previous</p>
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

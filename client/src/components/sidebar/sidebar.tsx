import SideBarItems from "./sidebarItems";

const Sidebar = () => {
  return (
    <div className="bg-[#1C1F2E] flex flex-col h-screen">
      <div className="py-5 flex items-center px-2 gap-2">
        <img src="/Zoom-icon.png" className="h-[30px] w-[30px] object-cover" />
        <h1 className="font-semibold text-lg text-white">E-Connect</h1>
      </div>
      <div className="w-full p-2">
        <SideBarItems />
      </div>
    </div>
  );
};

export default Sidebar;

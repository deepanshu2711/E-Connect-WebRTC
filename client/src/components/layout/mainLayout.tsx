import Header from "../Header/header";
import Sidebar from "../sidebar/sidebar";

const MainLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className="flex">
      <div className="w-[15%]  min-h-screen fixed top-0 bottom-0 left-0 ">
        <Sidebar />
      </div>
      <div className="flex-1 flex flex-col ml-[15%] h-screen">
        <Header />
        <div className="flex-1">{children}</div>
      </div>
    </div>
  );
};

export default MainLayout;

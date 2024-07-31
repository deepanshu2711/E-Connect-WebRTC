import { useNavigate } from "react-router-dom";

const Landing = () => {
  const navigate = useNavigate();
  const handleClick = () => {
    // window.location.href = "/signUp";
    navigate("/signUp");
  };
  const handlGetStarted = () => {
    // window.location.href = "/signIn";
    navigate("/signIn");
  };

  return (
    <div className="h-screen flex flex-col bg-slate-950">
      <div className="py-5 flex border-b border-gray-900  shadow-gray-900 px-10  items-center justify-between  gap-2">
        <div className="flex items-center gap-2">
          <img
            src="/Zoom-icon.png"
            className="h-[35px] w-[35px] object-cover"
          />
          <h1 className="font-semibold text-xl text-white">E-Connect</h1>
        </div>
        <button
          onClick={handleClick}
          className="py-2 px-5 rounded-lg bg-blue-600 text-white font-semibold "
        >
          Sign Up
        </button>
      </div>
      <div className="flex-1 flex items-center w-full justify-around h-full">
        <div className="col-span-1 flex flex-col gap-10">
          <h1 className="text-5xl font-semibold text-gray-100 max-w-[500px] leading-tight">
            Bring people together with E-Connect
          </h1>
          <p className="text-gray-300 max-w-[500px]">
            Revolutionary video calling app plays on the idea of seeing smiles
            during video calls
          </p>
          <button
            onClick={handlGetStarted}
            className="py-2 max-w-fit px-5 rounded-lg bg-blue-600 text-white font-semibold"
          >
            Get Started
          </button>
        </div>
        <div className="col-span-1">
          <img src="/landing.svg" />
        </div>
      </div>
    </div>
  );
};

export default Landing;

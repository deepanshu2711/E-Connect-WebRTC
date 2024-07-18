import axios from "axios";
import { useState } from "react";
import { FaGithub } from "react-icons/fa6";
import { Link } from "react-router-dom";

const SignInPage = () => {
  const [password, setPassword] = useState("");
  const [email, setEmail] = useState("");

  const handleSignIn = async () => {
    try {
      const responce = await axios.post("http://localhost:8080/api/signIn", {
        email,
        password,
      });
      console.log(responce.data);
      if (responce.status === 200) {
        alert("SignIn successfully");
      }
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <div className="bg-slate-950 flex flex-col items-center justify-center h-screen">
      <div className="bg-[#1C1F2E] rounded-xl  min-w-[450px] min-h-[400px]">
        <div className="bg-[#1C1F2E]  rounded-xl flex flex-col  px-10 py-4">
          <div className="flex flex-col gap-1 items-center">
            <div className="flex items-center gap-2 mb-4">
              <img
                src="/Zoom-icon.png"
                className="h-[35px] w-[35px] object-cover"
              />
              <h1 className="font-semibold  text-white">E-Connect</h1>
            </div>
            <h1 className="text-gray-300 text-xl font-semibold text-center">
              Sign in to E-Connect
            </h1>
            <p className="text-gray-400 text-[12px]">
              Welcome back! Please sign in to continue
            </p>
          </div>
          <div className="flex items-center justify-around gap-4 mt-6">
            <div className="flex items-center gap-2 w-full  justify-center bg-slate-950 px-1 py-1 rounded-xl">
              <FaGithub className="h-[22px] w-[22px] text-white" />
              <p className="text-gray-100">Github</p>
            </div>
            <div className="flex items-center gap-2 justify-center w-full  bg-gray-100 px-1 py-1 rounded-xl">
              <img src="/google.svg" className="h-[20px] w-[20px]" />
              <p className="">Google</p>
            </div>
          </div>
          <div className="flex items-center gap-1 mt-5">
            <div className="h-[1px] w-full bg-gray-600" />
            <p className="text-gray-100">or</p>
            <div className="h-[1px] w-full bg-gray-600" />
          </div>

          <div className="flex flex-col gap-2 mt-4">
            <div className="felx flex-col gap-2">
              <p className="text-gray-100 text-[12px] mb-1">Email address</p>
              <input
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="p-1 rounded-lg focus-within:outline-none w-full bg-slate-950 text-gray-100"
                type="email"
              />
            </div>
            <div className="felx flex-col gap-2">
              <p className="text-gray-100 text-[12px] mb-1">Password</p>
              <input
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="p-1 rounded-lg focus-within:outline-none w-full bg-slate-950 text-gray-100"
                type="password"
              />
            </div>
            <button
              onClick={handleSignIn}
              className="py-1 mt-3 text-[14px]  px-5 rounded-lg bg-blue-600 text-white"
            >
              Sign In
            </button>
          </div>
        </div>
        <div className="mt-5 flex items-center rounded-b-xl justify-center bg-slate-800 w-full p-4">
          <p className="text-gray-100 text-[12px]">
            Don't have an account?{" "}
            <Link
              to={"/signUp"}
              className="text-blue-500 cursor-pointer hover:underline"
            >
              Sign Up
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default SignInPage;

import { useEffect, useRef } from "react";

const SenderRoom = () => {
  const myVideoRef = useRef<HTMLVideoElement | null>(null);

  useEffect(() => {
    navigator.mediaDevices
      .getUserMedia({
        video: true,
        audio: true,
      })
      .then((stream) => {
        if (myVideoRef.current) {
          myVideoRef.current.srcObject = stream;
        }
      });
  }, []);

  return (
    <div className="h-screen w-full bg-[#1C1F2E]">
      <div className="w-full h-full bg-gray-500">
        {/* <video
          src="/test.mp4"
          autoPlay
          muted
          className="h-screen w-screen object-cover"
        /> */}
      </div>
      <div className=" absolute top-5 left-5 rounded-xl w-[300px] h-[200px] bg-black">
        <video
          ref={myVideoRef}
          autoPlay
          muted
          className="h-full w-full object-cover rounded-xl"
        />
      </div>
      <div className="flex items-center gap-4 absolute bottom-10  left-[43%]">
        <div className="h-16 w-16 rounded-full bg-black"></div>
        <div className="h-16 w-16 rounded-full bg-black"></div>
        <div className="h-16 w-16 rounded-full bg-black"></div>
      </div>
    </div>
  );
};

export default SenderRoom;

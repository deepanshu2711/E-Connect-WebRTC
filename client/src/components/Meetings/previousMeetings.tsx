import axios from "axios";
import Meetingcard from "./meetingcard";
import { useUser } from "../../provider/currentUserProvider";
import { useEffect, useState } from "react";
import { Meeting } from "../../types";

const PreviousMeetings = () => {
  const currentUser = useUser();
  const [allMeetings, setAllMeetings] = useState<Meeting[]>([]);

  useEffect(() => {
    const fetchuserMeetings = async () => {
      try {
        const responce = await axios.get(
          `http://localhost:8080/api/getUserPreviousMeetings/${currentUser.user?.email}`
        );
        console.log(responce.data);

        if (responce.status === 200) {
          setAllMeetings(responce.data.data);
        }
      } catch (error) {
        console.log(error);
      }
    };
    fetchuserMeetings();
  }, [currentUser]);
  return (
    <div className="p-4 h-[100%] bg-slate-950">
      <h1 className="text-white text-3xl font-semibold">Previous Meetings</h1>
      <div className="grid grid-cols-3 gap-4 mt-10">
        {allMeetings &&
          allMeetings.length > 0 &&
          allMeetings.map((meeting) => <Meetingcard meeting={meeting} />)}
      </div>
    </div>
  );
};

export default PreviousMeetings;

import express from "express"
import { fetchUserMeetingsController, fetchUserUpComingMeetingsController, handleScheduledMeetingJoined, saveMeetDetailsController, scheduledMeetingsController } from "../controller/meetController"

export const meetRouter = express.Router()

meetRouter.post("/meetingDetails", saveMeetDetailsController)
meetRouter.post("/scheduleMeeting", scheduledMeetingsController)
meetRouter.get("/getUserPreviousMeetings/:email", fetchUserMeetingsController)
meetRouter.get("/getUserUpcomingMeetings/:email", fetchUserUpComingMeetingsController)
meetRouter.get("/scheduledMeetingJoined/:roomId", handleScheduledMeetingJoined)




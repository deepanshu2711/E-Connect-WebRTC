import express from "express"
import { fetchUserMeetingsController, saveMeetDetailsController } from "../controller/meetController"

export const meetRouter = express.Router()

meetRouter.post("/meetingDetails", saveMeetDetailsController)
meetRouter.get("/getUserPreviousMeetings/:email", fetchUserMeetingsController)


import express from "express"
import { saveMeetDetailsController } from "../controller/meetController"

export const meetRouter = express.Router()

meetRouter.post("/meetingDetails", saveMeetDetailsController)


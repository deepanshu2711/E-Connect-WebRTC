import { Request, Response } from "express";
import { MeetModel } from "../model/meetModel";
import { ScheduledMeetModel } from "../model/scheduledMeetModel";

export const saveMeetDetailsController = async (req: Request, res: Response) => {
    const { senderEmail, reciverEmail, startTime, endTime } = req.body

    if (!senderEmail || !reciverEmail || !startTime || !endTime) {
        return res.status(400).send("All fields are required");
    }

    try {
        const newMeet = await MeetModel.create({
            senderEmail,
            reciverEmail,
            startTime,
            endTime
        })
        return res.status(201).json({
            success: true,
            message: "Meet Details saved successfully",
            data: newMeet
        })

    } catch (error) {
        console.log("Save Meet Details Controller Error", error)
        return res.status(500).send("Internal server error")
    }
}


export const fetchUserMeetingsController = async (req: Request, res: Response) => {
    const { email } = req.params
    if (!email) {
        return res.status(400).send("All fields are required")
    }
    try {
        const meetings = await MeetModel.find({ $or: [{ senderEmail: email }, { reciverEmail: email }] })
        return res.status(200).json({
            success: true,
            message: "Meetings fetched successfully",
            data: meetings
        })
    } catch (error) {
        console.log("Fetch User Meetings Controller Error", error)
        return res.status(500).send("Internal server error")
    }
}


export const scheduledMeetingsController = async (req: Request, res: Response) => {

    const { dateTime, receiverEmail, senderEmail, roomId } = req.body

    if (!dateTime || !receiverEmail || !senderEmail || !roomId) {
        return res.status(400).send("All fields are required")
    }

    try {
        const scheduledMeet = await ScheduledMeetModel.create({ dateTime, receiverEmail, senderEmail, roomId })

        return res.status(200).json({
            success: true,
            message: "Meetings Scheduled successfully",
            data: scheduledMeet
        })

    } catch (error) {
        console.log("Scheduled Meerings", error)
        return res.status(500).send("Internal server error")
    }
}
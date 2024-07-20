import { Request, Response } from "express";
import { MeetModel } from "../model/meetModel";

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
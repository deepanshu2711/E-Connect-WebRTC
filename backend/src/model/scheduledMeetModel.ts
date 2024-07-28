import mongoose from "mongoose"

const ScheduledMeetSchema = new mongoose.Schema({
    senderEmail: {
        type: String,
        required: true
    },
    receiverEmail: {
        type: String,
        required: true
    },
    roomId: {
        type: String,
        required: true
    },
    dateTime: {
        type: String,
        required: true
    },
    status: {
        type: String,
        required: true
    }
}, { timestamps: true })


export const ScheduledMeetModel = mongoose.model("scheduledMeets", ScheduledMeetSchema)
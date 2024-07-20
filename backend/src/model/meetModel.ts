import mongoose from "mongoose"

const MeetSchema = new mongoose.Schema({
    senderEmail: {
        type: String,
        required: true
    },
    reciverEmail: {
        type: String,
        required: true
    },
    startTime: {
        type: String,
        required: true
    },
    endTime: {
        type: String,
        required: true
    },

}, { timestamps: true })

export const MeetModel = mongoose.model("meets", MeetSchema)
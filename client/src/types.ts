export type User = {
    _id: string;
    userName: string;
    email: string;
    password: string;
}


export type Meeting = {
    _id: string;
    senderEmail: string;
    reciverEmail: string;
    startTime: string;
    endTime: string;
    createdAt: string;
}


export type ScheduledMeeting = {
    _id: string;
    senderEmail: string;
    receiverEmail: string;
    dateTime: string;
    roomId: string
}

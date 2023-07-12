import { Schema, model } from 'mongoose';


const NotificationSchema = new Schema({
    message: {
        type: String,
        required: true,
        trim: true
    },

    link: {
        type: String,
        required: true,
    },
}, {
    toJSON: {
        virtuals: true,
    },
    id: false,
    timestamps: true
});


const Notification = model('Notification', NotificationSchema);

export default Notification;
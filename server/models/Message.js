import { Schema, model } from 'mongoose';

const MessageSchema = new Schema(
    {
        text: {
            type: String,
            required: true,
            trim: true
        },

        sender: {
            type: Schema.Types.ObjectId,
            ref: 'User'
        },
    }, {
    toJSON: {
        virtuals: true,
    },
    id: false,
    timestamps: true
});


const Message = model('Message', MessageSchema);

export default Message;
import { Schema, model } from "mongoose";

const ThreadSchema = new Schema(
    {
        user1: {
            type: Schema.Types.ObjectId,
            ref: "User",
        },
        user2: {
            type: Schema.Types.ObjectId,
            ref: "User",
        },

        messages: [{
            type: Schema.Types.ObjectId,
            ref: 'Message'
        }],

        createdAt: {
            type: Date,
            default: new Date(),
        },

    },
    {
        toJSON: {
            virtuals: true,
        },
        id: false,
    }
);

ThreadSchema.virtual('user1Info', {
    ref: 'User',
    localField: 'user1',
    foreignField: '_id'
});

ThreadSchema.virtual('user2Info', {
    ref: 'User',
    localField: 'user2',
    foreignField: '_id'
});

const Thread = model("Thread", ThreadSchema);

export default Thread;
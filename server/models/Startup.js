import { Schema, model } from 'mongoose';

const StartupSchema = new Schema({
    name: {
        type: String,
        required: true,
        trim: true
    },

    description: {
        type: String,
        required: true,
    },

    logo: {
        type: String,
    },

    industry: {
        type: [String],
        required: true,
    },

    website: {
        type: String,
        required: true,
    },

    amountNeeded: {
        type: Number,
    },

    backers: [{
        "investor": {
            type: Schema.Types.ObjectId,
            ref: 'Investor'
        }, "amount": Number
    }],

    likes: [{
        type: Schema.Types.ObjectId,
        ref: 'Investor'
    }],

    user: {
        type: Schema.Types.ObjectId,
        ref: 'User'
    }
},
    {
        toJSON: {
            virtuals: true,
        },
        id: false
    });

StartupSchema.virtual('investors', {
    ref: 'Investor',
    localField: '_id',
    foreignField: 'user'
});

const Startup = model('Startup', StartupSchema);

export default Startup;

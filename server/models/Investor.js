import { Schema, model } from 'mongoose';

const InvestorSchema = new Schema({
    investAmount: {
        type: String,
        required: true,
        trim: true
    },

    interests: {
        type: [String],
        required: true,
    },

    photo: {
        type: String,
    },

    likes: [{
        type: Schema.Types.ObjectId,
        ref: 'Startup'
    }],

    investments: [{
        "startup": {
            type: Schema.Types.ObjectId,
            ref: 'Startup'
        }, "amount": Number
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


const Investor = model('Investor', InvestorSchema);

export default Investor;

//record of the transaction through stripe finalizing the payment from the investor to the startup
const { Schema, model } = require('mongoose');

const investmentSchema = new Schema({
    investor: {
        type: Schema.Types.ObjectId,
        ref: 'Investor',
        required: true
    },
    startup: {
        type: Schema.Types.ObjectId,
        ref: 'Startup',
        required: true
    },
    stripeChargeId: {
        type: String,
        required: true
    },
    status: {
        type: String,
        required: true
    },
    amount: {
        type: Number,
        required: true
    },
    currency: {
        type: String,
        required: true
    },
    description: {
        type: String,
        required: true
    },
    timestamp: {
        type: Date,
        default: Date.now,
        required: true
    }
});

const Investment = model('Investment', investmentSchema);

module.exports = Investment;

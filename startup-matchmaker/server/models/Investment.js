//record of the transaction through stripe finalizing the payment from the investor to the startup
const mongoose = require('mongoose');
const { Schema } = mongoose;

const investmentSchema = new Schema({
  investor: { type: mongoose.Types.ObjectId, ref: 'Investor' },
  startup: { type: mongoose.Types.ObjectId, ref: 'Startup' },
  stripeChargeId: String,
  status: String,
  amount: Number,
  currency: String,
  description: String,
  timestamp: { type: Date, default: Date.now },
});

module.exports = mongoose.model('Investment', investmentSchema);


const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const conversationSchema = new Schema({
  investorId: {
    type: Schema.Types.ObjectId,
    ref: 'Investor',
    required: true,
  },
  startupId: {
    type: Schema.Types.ObjectId,
    ref: 'Startup',
    required: true,
  },
  messages: [{
    type: Schema.Types.ObjectId,
    ref: 'Message',
  }],
}, {
  timestamps: true,  // adds createdAt and updatedAt fields
});

const Conversation = mongoose.model('Conversation', conversationSchema);

module.exports = Conversation;

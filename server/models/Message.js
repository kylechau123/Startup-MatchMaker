const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const messageSchema = new Schema({
  conversationId: {
    type: Schema.Types.ObjectId,
    ref: 'Conversation',
    required: true,
  },
  sender: {
    type: Schema.Types.ObjectId,
    ref: 'Investor', // or 'Startup', depending on who sends the message
    required: true,
  },
  text: {
    type: String,
    required: true,
  },
}, {
  timestamps: true, // adds createdAt and updatedAt fields
});

const Message = mongoose.model('Message', messageSchema);

module.exports = Message;

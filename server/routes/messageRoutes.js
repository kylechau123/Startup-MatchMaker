// server/routes/messageRoutes.js
const express = require('express');
const router = express.Router();
const { checkAuth } = require('../middleware/authentication');
const {
  sendMessage,
  getMessages,
} = require('../controllers/messageController');

router.post('/', checkAuth, sendMessage);
router.get('/:conversationId', checkAuth, getMessages);

module.exports = router;

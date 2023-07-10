const express = require('express');
const router = express.Router();
const { checkAuth } = require('../middleware/authentication');
const {
  createConversation,
  getConversations,
  getConversation,
} = require('../controllers/conversationController');

router.post('/', checkAuth, createConversation);
router.get('/:userId', checkAuth, getConversations);
router.get('/:conversationId', checkAuth, getConversation);

module.exports = router;

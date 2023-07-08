// server/routes/messageRoutes.js
const express = require('express');
const graphqlHTTP = require('express-graphql');
const { Message } = require('../server/models/Message');
const schema = require('./schema');

const router = express.Router();

// Get all messages for a conversation
router.get('/conversation/:conversationId', async (req, res) => {
  const result = await graphqlHTTP.execute(schema, {
    query: `
      query GetMessages($conversationId: ID!) {
        messages(conversationId: $conversationId) {
          _id
          conversationId
          sender
          text
          createdAt
        }
      }
    `,
    variables: {
      conversationId: req.params.conversationId,
    },
  });

  res.json(result.data.messages);
});

// Send a message
router.post('/new', async (req, res) => {
  const { conversationId, sender, text } = req.body;

  const result = await graphqlHTTP.execute(schema, {
    query: `
      mutation SendMessage($conversationId: ID!, $sender: ID!, $text: String!) {
        sendMessage(conversationId: $conversationId, sender: $sender, text: $text) {
          _id
          conversationId
          sender
          text
          createdAt
        }
      }
    `,
    variables: {
      conversationId,
      sender,
      text,
    },
  });

  res.json(result.data.sendMessage);
});

module.exports = router;

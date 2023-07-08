const express = require('express');
const graphqlHTTP = require('express-graphql');
const schema = require('./schema');

const router = express.Router();

router.get('/:investorId/conversations', async (req, res) => {
  const { investorId } = req.params;

  const result = await graphqlHTTP.execute(schema, {
    query: `query InvestorConversations($investorId: String!) {
      investorConversations(investorId: $investorId) {
        id
        investorId
        startupId
        messages
      }
    }`,
    variables: {
      investorId,
    },
  });

  res.json(result.data.investorConversations);
});

module.exports = router;

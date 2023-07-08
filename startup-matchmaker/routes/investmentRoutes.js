const express = require('express');
const graphqlHTTP = require('express-graphql');
const schema = require('./schema');
const { Investment } = require('../models');
const router = express.Router();

// Get all investments for a specific investor
router.get('/investor/:investorId', async (req, res) => {
  const result = await graphqlHTTP.execute(schema, {
    query: `
      query GetInvestmentsByInvestor($investorId: ID!) {
        investmentsByInvestor(investorId: $investorId) {
          _id
          investor
          startup
          stripeChargeId
          status
          amount
          currency
          description
          timestamp
        }
      }
    `,
    variables: {
      investorId: req.params.investorId,
    },
  });

  res.json(result.data.investmentsByInvestor);
});

// Get all investments for a specific startup
router.get('/startup/:startupId', async (req, res) => {
  const result = await graphqlHTTP.execute(schema, {
    query: `
      query GetInvestmentsByStartup($startupId: ID!) {
        investmentsByStartup(startupId: $startupId) {
          _id
          investor
          startup
          stripeChargeId
          status
          amount
          currency
          description
          timestamp
        }
      }
    `,
    variables: {
      startupId: req.params.startupId,
    },
  });

  res.json(result.data.investmentsByStartup);
});

// Update an investment
router.put('/:investmentId', async (req, res) => {
  const { status, description } = req.body;
  
  const result = await graphqlHTTP.execute(schema, {
    query: `
      mutation UpdateInvestment($investmentId: ID!, $status: String!, $description: String!) {
        updateInvestment(investmentId: $investmentId, status: $status, description: $description) {
          _id
          investor
          startup
          stripeChargeId
          status
          amount
          currency
          description
          timestamp
        }
      }
    `,
    variables: {
      investmentId: req.params.investmentId,
      status,
      description,
    },
  });

  res.json(result.data.updateInvestment);
});

// Delete an investment
router.delete('/:investmentId', async (req, res) => {
  const result = await graphqlHTTP.execute(schema, {
    query: `
      mutation DeleteInvestment($investmentId: ID!) {
        deleteInvestment(investmentId: $investmentId) {
          _id
          investor
          startup
          stripeChargeId
          status
          amount
          currency
          description
          timestamp
        }
      }
    `,
    variables: {
      investmentId: req.params.investmentId,
    },
  });

  res.json(result.data.deleteInvestment);
});

module.exports = router;

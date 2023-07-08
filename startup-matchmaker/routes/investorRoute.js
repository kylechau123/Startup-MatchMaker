const express = require('express');
const graphqlHTTP = require('express-graphql');
const schema = require('../server/schemas');
const router = express.Router();
const { Investor } = require('../server/models/Investor');
// Get all investors
router.get('/', async (req, res) => {
  const result = await graphqlHTTP.execute(schema, {
    query: `
      query {
        investors {
          companyName
          email
          phoneNum
          userName
          startups
        }
      }
    `,
  });

  res.json(result.data.investors);
});

// Create a new investor
router.post('/', async (req, res) => {
  const { companyName, email, phoneNum, userName, password } = req.body;

  const result = await graphqlHTTP.execute(schema, {
    query: `
      mutation CreateInvestor($companyName: String!, $email: String!, $phoneNum: String!, $userName: String!, $password: String!) {
        createInvestor(companyName: $companyName, email: $email, phoneNum: $phoneNum, userName: $userName, password: $password) {
          companyName
          email
          phoneNum
          userName
          startups
        }
      }
    `,
    variables: {
      companyName,
      email,
      phoneNum,
      userName,
      password,
    },
  });

  res.json(result.data.createInvestor);
});

module.exports = router;

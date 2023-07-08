const express = require('express');
const graphqlHTTP = require('express-graphql');
const schema = require('./schema');
const router = express.Router();
const { Starup } = require('../server/models/Startup');
// Get all startups
router.get('/', async (req, res) => {
  const result = await graphqlHTTP.execute(schema, {
    query: `
      query {
        startups {
          companyName
          email
          phoneNum
          userName
        }
      }
    `,
  });

  res.json(result.data.startups);
});

// Create a new startup
router.post('/', async (req, res) => {
  const { companyName, email, phoneNum, userName, password } = req.body;

  const result = await graphqlHTTP.execute(schema, {
    query: `
      mutation CreateStartup($companyName: String!, $email: String!, $phoneNum: String!, $userName: String!, $password: String!) {
        createStartup(companyName: $companyName, email: $email, phoneNum: $phoneNum, userName: $userName, password: $password) {
          companyName
          email
          phoneNum
          userName
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

  res.json(result.data.createStartup);
});

module.exports = router;

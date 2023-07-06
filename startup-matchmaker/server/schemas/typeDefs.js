const { gql } = require('apollo-server-express');

const typeDefs = gql`
  type Startup {
    _id: ID
    companyName: String
    email: String
    phoneNum: String
    userName: String
    password: String
  }

  type Investor {
    _id: ID
    companyName: String
    email: String
    phoneNum: String
    userName: String
    password: String
    startups: [Startup]
  }

  type Auth {
    token: ID
    investor: Investor
    startup: Startup
  }

  type Query {
    allStartups: [Startup]
    getStartup(startup_id: ID!): Startup
    getInvestor(investor_id: ID!): Investor
  }

  type Mutation {
    addStartup(
      companyName: String
      email: String
      phoneNum: String
      userName: String
      password: String
    ): Auth

    addInvestor(
      companyName: String
      email: String
      phoneNum: String
      userName: String
      password: String
    ): Auth

    startupLogin(
      email: String
      password: String
    ): Auth

    investorLogin(
      email: String
      password: String
    ): Auth

    match(
      startup_id: ID!
    ): Investor
  }
`;

module.exports = typeDefs;

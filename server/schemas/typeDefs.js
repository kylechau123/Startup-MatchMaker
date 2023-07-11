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

  type Message {
    _id: ID
    conversationId: ID
    sender: ID
    text: String
    createdAt: String
    updatedAt: String
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
  
  type Conversation {
    _id: ID
    investorId: ID
    startupId: ID
    messages: [Message]
  }

  type Investment {
    _id: ID
    investor: ID
    startup: ID
    stripeChargeId: ID
    status: String
    amount: Int
    currency: String
    description: String
    timestamp: String
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
    messages(conversationId: ID!): [Message]
    investmentsByInvestor(investorId: ID!): [Investment]
    investmentsByStartup(startupId: ID!): [Investment]
    investorConversations(investorId: ID!): [Conversation]
    matchedStartups(investorId: ID!): [Startup]!
    matchedInvestors(startupId: ID!): [Investor]!
    startupConversations(startupId: ID!): [Conversation]!
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

    updateStartup(
        startup_id: ID!
        companyName: String
        email: String
        phoneNum: String
        userName: String
        password: String
      ): Startup

    investorLogin(
      email: String
      password: String
    ): Auth

    match(
      startup_id: ID!
    ): Investor
    
    sendMessage(
        conversationId: ID!, sender: ID!, text: String!
        ): Message
    
    createConversation(
        investorId: ID!, startupId: ID!
        ): Conversation!
    
    createInvestment(
        investorId: ID!, startupId: ID!, amount: Float!, currency: String!
        ): Investment!

    updateInvestment(
        investmentId: ID!, status: String!, description: String!
        ): Investment
    
    deleteInvestment(
        investmentId: ID!
        ): Investment
    
    deleteInvestor(
        investor_id: ID!
        ): String
    
     deleteStartup(
        startup_id: ID!
        ): String
  }
`;

module.exports = typeDefs;

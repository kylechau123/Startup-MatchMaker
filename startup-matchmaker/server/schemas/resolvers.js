const { AuthenticationError } = require('apollo-server-express');
const { Investor, Startup } = require('../models');
const { signToken } = require('../utils/auth');
const stripe = require('stripe')('sk_test_4eC39HqLyjWDarjtT1zdp7dc');

const resolvers = {
    Query: {

    },
    Mutations: {
        addStartup: async (parent, args) => {
            const startup = await Startup.create(args);
            const token = signToken(startup);
      
            return { token, startup };
          },
          addInvestor: async (parent, args) => {
            const investor = await Investor.create(args);
            const token = signToken(investor);
      
            return { token, investor };
          },
    }
}
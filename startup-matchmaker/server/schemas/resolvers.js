const { AuthenticationError } = require('apollo-server-express');
const { Investor, Startup } = require('../models');
const { signToken } = require('../utils/auth');
const stripe = require('stripe')('sk_test_4eC39HqLyjWDarjtT1zdp7dc');

const resolvers = {
    Query: {
        allStartups: async (parent, args) => {
            const startups = await Startup.find()
            return startups;
        },
        getStartup: async (parent, { startup_id }) => {
            const startups = await Startup.findById(startup_id)
            return startups;
        },
        getInvestor: async (parent, { investor_id }) => {
            const investor = await Investor.findById(investor_id)
            return investor;
        }
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
        startupLogin: async (parent, { email, password }) => {
            const startup = await Startup.findOne({ email });

            if (!startup) {
                throw new AuthenticationError('Incorrect credentials');
            }

            const correctPw = await startup.isCorrectPassword(password);

            if (!correctPw) {
                throw new AuthenticationError('Incorrect credentials');
            }

            const token = signToken(startup);

            return { token, startup };
        },
        investorLogin: async (parent, { email, password }) => {
            const investor = await Investor.findOne({ email });

            if (!investor) {
                throw new AuthenticationError('Incorrect credentials');
            }

            const correctPw = await investor.isCorrectPassword(password);

            if (!correctPw) {
                throw new AuthenticationError('Incorrect credentials');
            }

            const token = signToken(investor);

            return { token, investor };
        },
        match: async (parent, { startup_id }, context) => {
            console.log(context);
            if (context.user) {

                const investor = await Investor.findByIdAndUpdate(context.user._id, { $push: { startups: startup_id } });

                return investor;
            }

            throw new AuthenticationError('Not logged in');
        },
    }
}

module.exports = resolvers;
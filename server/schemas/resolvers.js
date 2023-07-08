const { AuthenticationError } = require('apollo-server-express');
const { Investor, Startup, Message, Conversation, Investment } = require('../models');
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
        },
        messages: async (parent, { conversationId }) => {
            const messages = await Message.find({ conversationId }).sort('createdAt');
            return messages;
          },
        investmentsByInvestor: async (parent, { investorId }) => {
            return await Investment.find({ investor: investorId });
          },
        investmentsByStartup: async (parent, { startupId }) => {
            return await Investment.find({ startup: startupId });
          },
        investorConversations: async (parent, { investorId }) => {
            const conversations = await Conversation.find({ investorId });
            return conversations;
        },
        matchedStartups: async (parent, { investorId }) => {
            const investor = await Investor.findById(investorId).populate('startups');
            return investor.startups;
          },
        matchedInvestors: async (parent, { startupId }) => {
            const startup = await Startup.findById(startupId);
            const investors = await Investor.find({ startups: startupId });
            return investors;
          },
        startupConversations: async (parent, { startupId }) => {
            const conversations = await Conversation.find({ startupId });
            return conversations;
          },
    },
    Mutation: {
        addStartup: async (parent, args) => {
            const startup = await Startup.create(args);
            const token = signToken(startup);

            return { token, startup };
        },
        sendMessage: async (parent, { conversationId, sender, text }) => {
            const message = await Message.create({ conversationId, sender, text });
            return message;
          },
        addInvestor: async (parent, args) => {
            const investor = await Investor.create(args);
            const token = signToken(investor);

            return { token, investor };
        },
        deleteInvestor: async (parent, { investor_id }) => {
            const investor = await Investor.findByIdAndDelete(investor_id);
            if(!investor) {
                throw new Error('Investor not found');
            }
            return "Investor deleted successfully";
        },
        deleteStartup: async (parent, { startup_id }) => {
            const startup = await Startup.findByIdAndDelete(startup_id);
            if(!startup) {
                throw new Error('Startup not found');
            }
            return "Startup deleted successfully";
        },
        updateInvestment: async (parent, { investmentId, status, description }) => {
            return await Investment.findByIdAndUpdate(
              investmentId,
              { status, description },
              { new: true } // This option returns the updated document
            );
          },
    
        updateStartup: async (parent, args, { startup_id }) => {
            const startup = await Startup.findByIdAndUpdate(startup_id, args, { new: true });
            return startup;
        },
        deleteInvestment: async (parent, { investmentId }) => {
            return await Investment.findByIdAndDelete(investmentId);
       },
        createConversation: async (parent, { investorId, startupId }) => {
            const conversation = await Conversation.create({ investorId, startupId });
            return conversation;
        },
        createInvestment: async (parent, { investorId, startupId, amount, currency }) => {
            const investment = await Investment.create({ investorId, startupId, amount, currency });
            return investment;
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
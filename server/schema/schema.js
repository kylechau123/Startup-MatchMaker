import { GraphQLSchema, GraphQLObjectType, GraphQLString, GraphQLID, GraphQLList } from 'graphql';
import Investor from '../models/Investor.js';
import { verifyAuthGQ } from '../middlewares/AuthMiddleware.js';
import User from '../models/User.js';
import Startup from '../models/Startup.js';

// Define the types
const InvestorType = new GraphQLObjectType({
    name: 'Investor',
    fields: () => ({
        _id: { type: GraphQLID },
        investAmount: { type: GraphQLString },
        interests: { type: new GraphQLList(GraphQLString) },
        photo: { type: GraphQLString },
        likes: { type: new GraphQLList(StartupType) },
        investments: { type: new GraphQLList(InvestmentType) },
        user: { type: UserType }
    })
});

const StartupType = new GraphQLObjectType({
    name: 'Startup',
    fields: () => ({
        _id: { type: GraphQLID },
        name: { type: GraphQLString },
        description: { type: GraphQLString },
        logo: { type: GraphQLString },
        industry: { type: new GraphQLList(GraphQLString) },
        website: { type: GraphQLString },
        amountNeeded: { type: GraphQLString },
        backers: { type: new GraphQLList(BackerType) },
        likes: { type: new GraphQLList(InvestorType) },
        user: { type: UserType },
        investors: { type: new GraphQLList(InvestorType) }
    })
});

const BackerType = new GraphQLObjectType({
    name: 'Backer',
    fields: () => ({
        investor: { type: InvestorType },
        amount: { type: GraphQLString }
    })
});

const InvestmentType = new GraphQLObjectType({
    name: 'Investment',
    fields: () => ({
        startup: { type: StartupType },
        amount: { type: GraphQLString }
    })
});

const UserType = new GraphQLObjectType({
    name: 'User',
    fields: () => ({
        _id: { type: GraphQLID },
        email: { type: GraphQLString },
        username: { type: GraphQLString },
        password: { type: GraphQLString },
        role: { type: GraphQLString },
        notifications: { type: new GraphQLList(NotificationType) },
        createdAt: { type: GraphQLString }
    })
});

const MessageType = new GraphQLObjectType({
    name: 'Message',
    fields: () => ({
        _id: { type: GraphQLID },
        text: { type: GraphQLString },
        sender: { type: UserType },
        createdAt: { type: GraphQLString }
    })
});

const NotificationType = new GraphQLObjectType({
    name: 'Notification',
    fields: () => ({
        _id: { type: GraphQLID },
        message: { type: GraphQLString },
        link: { type: GraphQLString },
        createdAt: { type: GraphQLString }
    })
});

const ThreadType = new GraphQLObjectType({
    name: 'Thread',
    fields: () => ({
        _id: { type: GraphQLID },
        user1: { type: UserType },
        user2: { type: UserType },
        messages: { type: new GraphQLList(MessageType) },
        createdAt: { type: GraphQLString },
        user1Info: { type: UserType },
        user2Info: { type: UserType }
    })
});

// Define the root query type
const RootQueryType = new GraphQLObjectType({
    name: 'Query',
    fields: {
        investor2: {
            type: InvestorType,
            args: {
                id: { type: GraphQLID }
            },
            async resolve(parent, args, context) {
                const investorId = args.id;
                try {
                    const investor = await Investor.findOne({ _id: investorId }).populate({
                        path: "user",
                        select: "-__v",
                    }).populate({
                        path: "likes",
                        select: "-__v",
                    }).select("-__v");


                    return investor;
                }
                catch (error) {
                    console.error(error);
                    return { message: "Something went wrong", success: false };
                }
            }
        },
        investor: {
            type: InvestorType,
            async resolve(parent, args, context) {
                const userId = verifyAuthGQ(context);
                const investor = await Investor.findOne({ user: userId }).populate({
                    path: "user",
                    select: "-__v",
                }).populate({
                    path: "likes",
                    select: "-__v",
                }).populate({
                    path: "investments.startup",
                    select: "-__v",
                }).select("-__v");

                return investor;
            }
        },
        startup2: {
            type: StartupType,
            args: {
                id: { type: GraphQLID }
            },
            async resolve(parent, args, context) {
                const startupId = args.id;
                try {
                    const startup = await Startup.findOne({ _id: startupId }).populate({
                        path: "user",
                        select: "-__v",
                    }).populate({
                        path: "likes",
                        select: "-__v",
                    }).select("-__v");


                    return startup;
                }
                catch (error) {
                    console.error(error);
                    return { message: "Something went wrong", success: false };
                }
            }
        },
        startup: {
            type: StartupType,
            async resolve(parent, args, context) {
                // Resolve the startup query based on the provided ID
                const userId = verifyAuthGQ(context);
                const startup = await Startup.findOne({ user: userId }).populate({
                    path: "user",
                    select: "-__v",
                }).populate({
                    path: "likes",
                    select: "-__v",
                }).select("-__v");

                return startup;
            }
        },
        user: {
            type: UserType,
            async resolve(parent, args, context) {
                // Resolve the user query based on the provided ID
                const userId = verifyAuthGQ(context);
                const user = User.findOne({ _id: userId }).select("-__v -password");
                return user;
            }
        },
        user: {
            type: UserType,
            args: {
                id: { type: GraphQLID }
            },
            async resolve(parent, args, context) {
                // Resolve the user query based on the provided ID
                const userId = args.id;
                const user = await User.findOne({ _id: userId }).select("-__v -password");
                return user;
            }
        },
        user2: {
            type: UserType,
            async resolve(parent, args, context) {
                // Resolve the user query based on the provided ID
                const userId = verifyAuthGQ(context);
                const user = await User.findOne({ _id: userId }).select("-__v -password");
                return user;
            }
        },
        notifications: {
            type: new GraphQLList(NotificationType),
            async resolve(parent, args, context) {
                const userId = verifyAuthGQ(context);
                const user = await User.findOne({ _id: userId }).populate({
                    path: "notifications",
                    select: "-__v",
                    options: {
                        sort: { createdAt: -1 },
                    }
                }).select("-__v -password");

                let notifications = user.notifications;

                return notifications;
            }
        }
    }
});

// Define the root mutation type
const RootMutationType = new GraphQLObjectType({
    name: 'Mutation',
    fields: {
        updateInvestor: {
            type: InvestorType,
            args: {
                investAmount: { type: GraphQLString },
                interests: { type: new GraphQLList(GraphQLString) },
                photo: { type: GraphQLString },
            },
            async resolve(parent, args, context) {
                const userId = verifyAuthGQ(context);
                let investor = await Investor.findOne({ user: userId }).select("-__v");
                const { investAmount, interests, photo } = args;

                if (!investor) {
                    investor = new Investor({
                        user: userId,
                        investAmount,
                        interests,
                        photo
                    });

                    await investor.save();

                    return investor;
                }

                if (investAmount) {
                    investor.investAmount = investAmount;
                }

                if (interests) {
                    investor.interests = interests;
                }

                if (photo) {
                    investor.photo = photo;
                }

                await investor.save();
                return investor;
            }
        },
        updateStartup: {
            type: StartupType,
            args: {
                name: { type: GraphQLString },
                description: { type: GraphQLString },
                website: { type: GraphQLString },
                logo: { type: GraphQLString },
                industry: { type: new GraphQLList(GraphQLString) },
                amountNeeded: { type: GraphQLString },
            },
            async resolve(parent, args, context) {
                const userId = verifyAuthGQ(context);
                let startup = await Startup.findOne({ user: userId }).select("-__v");
                const { name, description, website, logo, industry, amountNeeded } = args;

                if (!startup) {
                    startup = new Startup({
                        user: userId,
                        name,
                        description,
                        website,
                        logo,
                        industry,
                        amountNeeded
                    });

                    await startup.save();

                    return startup;
                }


                startup.name = name;
                startup.description = description;
                startup.website = website;
                startup.logo = logo;
                startup.industry = industry;
                startup.amountNeeded = amountNeeded;

                await startup.save();
                return startup;
            }
        },
    }
});

// Create the GraphQL schema
const schema = new GraphQLSchema({
    query: RootQueryType,
    mutation: RootMutationType
});

export default schema;

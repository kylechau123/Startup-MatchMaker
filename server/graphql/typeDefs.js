import { GraphQLObjectType, GraphQLString, GraphQLID, GraphQLList } from 'graphql';

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


export { InvestorType, StartupType, BackerType, InvestmentType, UserType, MessageType, NotificationType, ThreadType };
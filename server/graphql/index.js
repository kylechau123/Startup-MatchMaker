import { GraphQLSchema } from "graphql";
import { RootQueryType, RootMutationType } from "./resolvers.js";

// Create the GraphQL schema
const schema = new GraphQLSchema({
    query: RootQueryType,
    mutation: RootMutationType
});

export default schema;
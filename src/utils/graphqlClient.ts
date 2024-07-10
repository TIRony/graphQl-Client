import { GraphQLClient } from "graphql-request";

const endPoint = process.env.NEXT_PUBLIC_GRAPHQL_ENDPOINT;
const client = new GraphQLClient(endPoint as string);

export default client;

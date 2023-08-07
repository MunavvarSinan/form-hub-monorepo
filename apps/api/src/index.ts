import { ApolloServer } from '@apollo/server';
import { startStandaloneServer } from '@apollo/server/standalone';
import { typeDefs, resolvers } from './graphql';


const server = new ApolloServer({ typeDefs, resolvers });


const port = Number(process.env.PORT ?? 8080);
const startServer = async () => {
    const { url } = await startStandaloneServer(server, {
        listen: { host: '0.0.0.0', port },
        context: async () => {
            return {};
        },
    });
    console.log(`Server running at ${url}`);
};
startServer();
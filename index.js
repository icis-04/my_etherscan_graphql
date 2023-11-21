const { ApolloServer } = require("apollo-server");
// Imports Apollo Server from apollo-server package

const { importSchema } = require("graphql-import");
// Imports importSchema function from graphql-import package

const EtherDataSource = require("./datasource/ethDatasource");
// Imports EtherDataSource class from local ethDatasource file

const typeDefs = importSchema("./schema.graphql");
// Imports GraphQL schema from schema.graphql file

require("dotenv").config();
// Loads environment variables from .env file

const resolvers = {
  Query: {
    etherBalanceByAddress: (root, _args, { dataSources }) =>
      dataSources.ethDataSource.etherBalanceByAddress(),

    totalSupplyOfEther: (root, _args, { dataSources }) =>
      dataSources.ethDataSource.totalSupplyOfEther(),

    latestEthereumPrice: (root, _args, { dataSources }) =>
      dataSources.ethDataSource.getLatestEthereumPrice(),

    blockConfirmationTime: (root, _args, { dataSources }) =>
      dataSources.ethDataSource.getBlockConfirmationTime(),
  },
};

// Defines GraphQL resolvers

const server = new ApolloServer({
  typeDefs,
  resolvers,
  dataSources: () => ({
    ethDataSource: new EtherDataSource(),
  }),
});

// Creates Apollo Server instance

server.timeout = 0;

// Sets no timeout limit

server.listen("9000").then(({ url }) => {
  console.log(`🚀 Server ready at ${url}`);
});

// Starts Apollo Server on port 9000

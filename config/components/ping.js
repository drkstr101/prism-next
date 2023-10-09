const typeDefs = /* GraphQL */ `
  extend type Query {
    ping: PingResponse!
  }

  type PingResponse {
    message: String!
    date: DateTime!
  }
`;

const resolvers = {
  Query: {
    ping(_, {}, ctx) {
      return {
        message: 'Welcome to prism!',
        date: new Date(),
        // TODO - we need to figure out how to update the graphql context to pass this through
        // url: ctx.request.url,
        // headers: Object.assign({}, ctx.request.headers),
      };
    },
  },
};

module.exports = {
  resolvers,
  typeDefs,
};

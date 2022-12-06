const graphql = require("graphql");

const { GraphQLObjectType, GraphQLString, GraphQLID, GraphQLNonNull } = graphql;

const JobType = (types) =>
  new GraphQLObjectType({
    name: "Job",
    fields: () => ({
      id: { type: GraphQLID },
      title: { type: new GraphQLNonNull(GraphQLString) },
      description: { type: new GraphQLNonNull(GraphQLString) },
      createdAt: { type: GraphQLString },
      updatedAt: { type: GraphQLString },
    }),
  });

module.exports = JobType;

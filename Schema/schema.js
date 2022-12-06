const graphql = require("graphql");

const { authorQuery, authorMutation } = require("./action/author");
const { blogQuery, blogMutation } = require("./action/blog");
const { jobQuery, jobMutation } = require("./action/job");

const { GraphQLObjectType, GraphQLSchema } = graphql;

const RootQuery = new GraphQLObjectType({
  name: "RootQueryType",
  fields: {
    ...authorQuery,
    ...blogQuery,
    ...jobQuery,
  },
});

const Mutation = new GraphQLObjectType({
  name: "Mutation",
  fields: {
    ...authorMutation,
    ...blogMutation,
    ...jobMutation,
  },
});

module.exports = new GraphQLSchema({
  query: RootQuery,
  mutation: Mutation,
});

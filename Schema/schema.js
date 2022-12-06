const graphql = require("graphql");

// GraphQL type
const JobType = require("./type/JobType")
// const BlogType = require("./type/BlogType")
// const AuthorType = require("./type/AuthorType")
const { authorQuery, authorMutation } = require("./action/author")
const { blogQuery, blogMutation } = require("./action/blog")



const {
  GraphQLObjectType,
  GraphQLSchema,
} = graphql;

//Schema defines data on the Graph like object types(book type), the relation between
//these object types and describes how they can reach into the graph to interact with
//the data to retrieve or mutate the data


//RootQuery describes how users can use the graph and grab data.
//E.g Root query to get all authors, get all books, get a particular book
//or get a particular author.
const RootQuery = new GraphQLObjectType({
  name: "RootQueryType",
  fields: {
    ...JobType.jobQuery,
    ...authorQuery,
    ...blogQuery
  },
});

const Mutation = new GraphQLObjectType({
  name: "Mutation",
  fields: {
    ...JobType.jobMutation,
    ...authorMutation,
    ...blogMutation
  },
});

module.exports = new GraphQLSchema({
  query: RootQuery,
  mutation: Mutation,
});

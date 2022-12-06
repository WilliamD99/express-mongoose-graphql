const Author = require("../../Model/Author");
const graphql = require("graphql");

const {
  GraphQLObjectType,
  GraphQLID,
  GraphQLString,
  GraphQLInt,
  GraphQLList,
  GraphQLNonNull,
} = graphql;

const BlogType = (types) =>
  new GraphQLObjectType({
    name: "Blog",
    fields: () => ({
      id: { type: GraphQLID },
      title: { type: new GraphQLNonNull(GraphQLString) },
      description: { type: GraphQLInt },
      author: {
        type: types.AuthorType,
        resolve(parent, args) {
          return Author.findById(parent.authorId);
        },
      },
      category: { type: GraphQLString },
      excerpt: { type: GraphQLString },
    }),
  });

module.exports = BlogType;

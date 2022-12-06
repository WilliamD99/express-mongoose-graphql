const Blog = require("../../Model/Blog");
const graphql = require("graphql");

const {
    GraphQLObjectType,
    GraphQLID,
    GraphQLString,
    GraphQLList,
    GraphQLNonNull
} = graphql;

const AuthorType = (types) => new GraphQLObjectType({
    name: 'Author',
    fields: () => ({
        id: { type: GraphQLID },
        firstName: { type: new GraphQLNonNull(GraphQLString) },
        lastName: { type: new GraphQLNonNull(GraphQLString) },
        blogs: {
            type: new GraphQLList(types.BlogType),
            resolve(parent, args) {
                return Blog.find({ authorId: parent.id });
            }
        }
    })
})

module.exports = AuthorType
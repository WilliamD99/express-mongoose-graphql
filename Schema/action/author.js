const { AuthorType } = require('../type/index')
const Author = require("../../Model/Author")
const graphql = require("graphql");

const {
    GraphQLString,
    GraphQLID,
    GraphQLInt,
    GraphQLList,
    GraphQLNonNull,
} = graphql;

const authorQuery = {
    author: {
        type: AuthorType,
        args: { id: { type: GraphQLID } },
        resolve(parent, args) {
            return Author.findById(args.id);
        },
    },
    authors: {
        type: new GraphQLList(AuthorType),
        args: { limit: { type: GraphQLInt } },
        resolve(parent, args) {
            let limit = args.limit
            if (!limit) limit = 10
            return Author.aggregate([{ $limit: limit }]);
        },
    },
}

const authorMutation = {
    addAuthor: {
        type: AuthorType,
        args: {
            firstName: { type: new GraphQLNonNull(GraphQLString) },
            lastName: { type: new GraphQLNonNull(GraphQLString) },
            email: { type: GraphQLString },
            bio: { type: GraphQLString },
        },
        resolve(parent, args) {
            let author = new Author({
                firstName: args.firstName,
                lastName: args.lastName,
                fullName: `${args.firstName} ${args.lastName}`,
                email: args.email,
                bio: args.bio
            });
            return author.save();
        },
    },
    updateAuthor: {
        type: AuthorType,
        args: {
            id: { type: new GraphQLNonNull(GraphQLID) },
            firstName: { type: GraphQLString },
            lastName: { type: GraphQLString },
            email: { type: GraphQLString },
            bio: { type: GraphQLString },
        },
        resolve(parent, args) {
            return new Promise((resolve, reject) => {
                Author.findOneAndUpdate(
                    { _id: args.id },
                    {
                        $set: {
                            firstName: args.firstName,
                            lastName: args.lastName,
                            fullName: `${args.firstName} ${args.lastName}`,
                            email: args.email,
                            bio: args.bio,
                        },
                    },
                    { new: true }
                ).exec((err, res) => {
                    if (err) reject(err);
                    else resolve(res);
                });
            });
        },
    },
    deleteAuthor: {
        type: AuthorType,
        args: {
            id: { type: new GraphQLNonNull(GraphQLID) },
        },
        resolve(parent, args) {
            return new Promise((resolve, reject) => {
                Job.deleteOne({ _id: args.id }).exec((err, res) => {
                    if (err) reject(err);
                    else resolve(res);
                });
            });
        },
    },
}

module.exports = { authorQuery, authorMutation }
const graphql = require("graphql");
const {
    GraphQLString,
    GraphQLID,
    GraphQLInt,
    GraphQLList,
    GraphQLNonNull,
} = graphql;

const { BlogType } = require("../type/index")
const Blog = require("../../Model/Blog")

const blogQuery = {
    blog: {
        type: BlogType,
        args: { id: { type: GraphQLID } },
        resolve(parent, args) {
            return Blog.findById(args.id)
        }
    },
    blogs: {
        type: new GraphQLList(BlogType),
        args: { limit: { type: GraphQLInt } },
        resolve(parent, args) {
            let limit = args.limit
            if (!limit) limit = 10
            return Blog.aggregate([{ $limit: limit }]);
        },
    },
}

const blogMutation = {
    addBlog: {
        type: BlogType,
        args: {
            title: { type: new GraphQLNonNull(GraphQLString) },
            description: { type: new GraphQLNonNull(GraphQLString) },
            category: { type: GraphQLString },
            excerpt: { type: GraphQLString },
            authorId: { type: new GraphQLNonNull(GraphQLID) }
        },
        resolve(parent, args) {
            let blog = new Blog({
                title: args.title,
                description: args.description,
                createdAt: new Date().toLocaleString('en-US', { timeZone: "America/Vancouver" }),
                updatedAt: new Date().toLocaleString('en-US', { timeZone: "America/Vancouver" }),
                category: args.category,
                excerpt: args.excerpt,
                authorId: args.authorId
            });
            return blog.save();
        },
    },
    updateBlog: {
        type: BlogType,
        args: {
            id: { type: new GraphQLNonNull(GraphQLID) },
            title: { type: GraphQLString },
            description: { type: GraphQLString },
            category: { type: GraphQLString },
            excerpt: { type: GraphQLString },
        },
        resolve(parent, args) {
            return new Promise((resolve, reject) => {
                const date = new Date().toLocaleString('en-US', { timeZone: "America/Vancouver" });
                Blog.findOneAndUpdate(
                    { _id: args.id },
                    {
                        $set: {
                            title: args.title,
                            description: args.description,
                            category: args.category,
                            excerpt: args.excerpt,
                            updatedAt: date,
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
    deleteBlog: {
        type: BlogType,
        args: {
            id: { type: new GraphQLNonNull(GraphQLID) },
        },
        resolve(parent, args) {
            return new Promise((resolve, reject) => {
                Blog.deleteOne({ _id: args.id }).exec((err, res) => {
                    if (err) reject(err);
                    else resolve(res);
                });
            });
        },
    },
}

module.exports = { blogQuery, blogMutation }
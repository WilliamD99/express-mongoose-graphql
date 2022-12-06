const AuthorTypeInject = require("./AuthorType");
const BlogTypeInject = require("./BlogType");

const types = {};
types.AuthorType = AuthorTypeInject(types);
types.BlogType = BlogTypeInject(types);

const AuthorType = types.AuthorType;
const BlogType = types.BlogType;

module.exports = { AuthorType, BlogType };
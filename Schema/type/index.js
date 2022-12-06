const AuthorTypeInject = require("./AuthorType");
const BlogTypeInject = require("./BlogType");
const JobTypeInject = require("./JobType");

const types = {};
types.AuthorType = AuthorTypeInject(types);
types.BlogType = BlogTypeInject(types);
types.JobTypeInject = JobTypeInject(types);

const AuthorType = types.AuthorType;
const BlogType = types.BlogType;
const JobType = types.JobTypeInject;

module.exports = { AuthorType, BlogType, JobType };

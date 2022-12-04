const graphql = require("graphql");
const Job = require("../Model/Job");

const {
  GraphQLObjectType,
  GraphQLString,
  GraphQLID,
  GraphQLInt,
  GraphQLSchema,
  GraphQLList,
  GraphQLNonNull,
} = graphql;

//Schema defines data on the Graph like object types(book type), the relation between
//these object types and describes how they can reach into the graph to interact with
//the data to retrieve or mutate the data

const JobType = new GraphQLObjectType({
  name: "Job",
  fields: () => ({
    id: { type: GraphQLID },
    title: { type: GraphQLString },
    description: { type: GraphQLString },
    createdAt: { type: GraphQLString },
  }),
});

//RootQuery describes how users can use the graph and grab data.
//E.g Root query to get all authors, get all books, get a particular book
//or get a particular author.
const RootQuery = new GraphQLObjectType({
  name: "RootQueryType",
  fields: {
    job: {
      type: JobType,
      args: { id: { type: GraphQLID } },
      resolve(paren, args) {
        return Job.findById(args.id);
      },
    },
    jobs: {
      type: new GraphQLList(JobType),
      resolve(parent, args) {
        return Job.find({});
      },
    },
  },
});

const Mutation = new GraphQLObjectType({
  name: "Mutation",
  fields: {
    addJob: {
      type: JobType,
      args: {
        title: { type: new GraphQLNonNull(GraphQLString) },
        description: { type: new GraphQLNonNull(GraphQLString) },
        createdAt: { type: GraphQLString },
      },
      resolve(parent, args) {
        let job = new Job({
          title: args.title,
          description: args.description,
          createdAt: args.createdAt,
        });
        return job.save();
      },
    },
    updateJob: {
      type: JobType,
      args: {
        id: { type: new GraphQLNonNull(GraphQLString) },
        title: { type: GraphQLString },
        description: { type: GraphQLString },
        createdAt: { type: GraphQLString },
      },
      resolve(parent, args) {
        return new Promise((resolve, reject) => {
          const date = Date().toString();
          Job.findOneAndUpdate(
            { _id: args.id },
            {
              $set: {
                title: args.title,
                description: args.description,
                createdAt: date,
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
    deleteJob: {
      type: JobType,
      args: {
        id: { type: new GraphQLNonNull(GraphQLString) },
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
  },
});

module.exports = new GraphQLSchema({
  query: RootQuery,
  mutation: Mutation,
});

const graphql = require("graphql");
const { JobType } = require("../type/index");
const Job = require("../../Model/Job");

const { GraphQLString, GraphQLID, GraphQLInt, GraphQLList, GraphQLNonNull } =
  graphql;

const jobQuery = {
  job: {
    type: JobType,
    args: { id: { type: GraphQLID } },
    resolve(parent, args) {
      return Job.findById(args.id);
    },
  },
  jobs: {
    type: new GraphQLList(JobType),
    args: { limit: { type: GraphQLInt } },
    resolve(parent, args) {
      let limit = args.limit;
      if (!limit) limit = 10;
      return Job.aggregate([{ $limit: limit }]);
    },
  },
};

const jobMutation = {
  addJob: {
    type: JobType,
    args: {
      title: { type: new GraphQLNonNull(GraphQLString) },
      description: { type: new GraphQLNonNull(GraphQLString) },
    },
    resolve(parent, args) {
      let job = new Job({
        title: args.title,
        description: args.description,
        createdAt: new Date().toLocaleString("en-US", {
          timeZone: "America/Vancouver",
        }),
        updatedAt: new Date().toLocaleString("en-US", {
          timeZone: "America/Vancouver",
        }),
      });
      return job.save();
    },
  },
  updateJob: {
    type: JobType,
    args: {
      id: { type: new GraphQLNonNull(GraphQLID) },
      title: { type: GraphQLString },
      description: { type: GraphQLString },
    },
    resolve(parent, args) {
      return new Promise((resolve, reject) => {
        const date = new Date().toLocaleString("en-US", {
          timeZone: "America/Vancouver",
        });
        Job.findOneAndUpdate(
          { _id: args.id },
          {
            $set: {
              title: args.title,
              description: args.description,
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
  deleteJob: {
    type: JobType,
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
};

module.exports = { jobQuery, jobMutation };

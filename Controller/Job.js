const Job = require("../Model/Job");
const Author = require("../Model/Author")

// Get a job
const getJob = (req, res) => {
  res.send("Hello World");
};

// Get all job
const getAllJobs = (req, res) => {
  Author.find((err, jobs) => {
    if (err) {
      res.send(err);
    }
    res.json(jobs);
  });
};

// Post
const createJob = (req, res) => {
  const newJob = new Job({
    title: req.body.title,
    description: req.body.description,
    createdAt: req.body.createdAt,
  });
  newJob.save((err, newJob) => {
    if (err) {
      res.send(err);
    }
    res.json(newJob);
  });
};

// Update
const updateJob = (req, res) => {
  Job.findOneAndUpdate(
    { _id: req.params.jobId },
    {
      $set: {
        title: req.body.title,
        description: req.body.description,
        createdAt: req.body.createdAt,
      },
    },
    {
      new: true,
    },
    (err, Job) => {
      if (err) {
        res.send(err);
      } else {
        res.json(Job);
      }
    }
  );
};

// Delete
const deleteJob = (req, res) => {
  Job.deleteOne({ _id: req.params.jobId })
    .then(() => res.json({ message: "Job Deleted" }))
    .catch((err) => res.send(err));
};

module.exports = {
  getJob,
  createJob,
  getAllJobs,
  updateJob,
  deleteJob,
};

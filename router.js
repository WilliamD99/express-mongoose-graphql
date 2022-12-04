const {
  getJob,
  createJob,
  getAllJobs,
  updateJob,
  deleteJob,
} = require("./Controller/Job");

const router = require("express").Router();

router.get("/", (req, res) => {
  res.send("Let's build a CRUD API");
});

router.get("/job", getAllJobs);

router.post("/job", createJob);

router.put("/job/:jobId", updateJob);

router.delete("/job/:jobId", deleteJob);

module.exports = router;

const Job = require('../models/job');

// POST /api/jobs — Recruiter creates a new job
const createJob = async (req, res) => {
  try {
    const { title, description, company } = req.body;

    const newJob = await Job.create({
      title,
      description,
      company,
      postedBy: req.user.id 
    });

    res.status(201).json({ msg: 'Job posted successfully', job: newJob });
  } catch (err) {
    res.status(500).json({ msg: 'Server error while posting job' });
  }
};

// GET /api/jobs — Get all jobs (public)
const getAllJobs = async (req, res) => {
  try {
    const jobs = await Job.find().populate('postedBy', 'username email');
    res.status(200).json(jobs);
  } catch (err) {
    res.status(500).json({ msg: 'Server error while fetching jobs' });
  }
};

// GET /api/jobs/my-jobs — Recruiter’s own jobs (protected)
const getMyJobs = async (req, res) => {
  try {
    const jobs = await Job.find({ postedBy: req.user.id });
    res.status(200).json(jobs);
  } catch (err) {
    res.status(500).json({ msg: 'Error fetching your jobs' });
  }
};

module.exports = {
  createJob,
  getAllJobs,
  getMyJobs
};

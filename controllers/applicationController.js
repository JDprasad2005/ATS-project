const Application = require('../models/applications');
const mongoose = require('mongoose');


// POST /api/apply/:jobId — public apply to a job
const applyToJob = async (req, res) => {
  try {
    const { applicantName, email, resume, coverLetter } = req.body;
    const { jobId } = req.params;

    const application = await Application.create({
      job: jobId,
      applicantName,
      email,
      resume,
      coverLetter
    });

    res.status(201).json({ msg: 'Application submitted', application });
  } catch (err) {
    res.status(500).json({ msg: 'Error submitting application' });
  }
};

// GET /api/applications/:jobId — recruiter sees all applicants for a job
const getJobApplications = async (req, res) => {
  try {
    const { jobId } = req.params;
    const applications = await Application.find({ job: jobId }).populate('job');

    res.status(200).json(applications);
  } catch (err) {
    res.status(500).json({ msg: 'Error fetching applications' });
  }
};

module.exports = {
  applyToJob,
  getJobApplications
};

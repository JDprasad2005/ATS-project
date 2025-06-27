const express = require('express');
const router = express.Router();
const { createJob, getAllJobs, getMyJobs } = require('../controllers/jobController');
const verifyToken = require('../middleware/verifyJWT');

// Public Route – anyone can view all jobs
router.get('/', getAllJobs);

// Protected Route – recruiter posts a job
router.post('/', verifyToken, createJob);

// Protected Route – recruiter views their own jobs
router.get('/my-jobs', verifyToken, getMyJobs);

module.exports = router;

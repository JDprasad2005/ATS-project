const express = require('express');
const router = express.Router();
const { applyToJob, getJobApplications } = require('../controllers/applicationController');
const verifyToken = require('../middleware/verifyJWT');

// Public Route – anyone can apply
router.post('/apply/:jobId', applyToJob);

// Protected Route – recruiter views applicants for a job
router.get('/job/:jobId', verifyToken, getJobApplications);

module.exports = router;

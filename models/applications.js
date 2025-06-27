const mongoose = require('mongoose');

const applicationSchema = new mongoose.Schema({
  job: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Job',
    required: true
  },
  applicantName: { type: String, required: true },
  email: { type: String, required: true },
  resume: { type: String }, // You can replace this with file path or cloud link
  coverLetter: { type: String },
  status: { type: String, default: 'pending' }, // pending, shortlisted, rejected
  appliedAt: { type: Date, default: Date.now }
});

module.exports = mongoose.model('Application', applicationSchema);

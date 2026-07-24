const mongoose = require('mongoose');

const activityLogSchema = new mongoose.Schema({
  userId: String,
  action: { type: String, required: true },
  details: String,
  timestamp: { type: Date, default: Date.now }
});

module.exports = mongoose.model('ActivityLog', activityLogSchema);
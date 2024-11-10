const mongoose = require('mongoose');

const reportSchema = mongoose.Schema({
  eventType: {
    type: String,
    required: true,
  },
  location: {
    lat: { type: Number, required: true },
    lng: { type: Number, required: true },
  },
  description: {
    type: String,
    required: true,
  },
  severity: {
    type: String,
    required: true,
  },
  date: {
    type: Date,
    default: Date.now,
  },
});

module.exports = mongoose.model('Report', reportSchema);

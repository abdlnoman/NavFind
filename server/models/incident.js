const mongoose = require('mongoose');

const IncidentSchema = new mongoose.Schema({
  type: {
    type: String,
    enum: ['accident', 'roadwork', 'traffic', 'hazard'],
    required: true
  },
  description: {
    type: String,
    required: true
  },
  location: {
    type: {
      type: String,
      enum: ['Point'],
      required: true
    },
    coordinates: {
      type: [Number],
      required: true
    }
  },
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User'
  },
  createdAt: {
    type: Date,
    default: Date.now
  }
});

IncidentSchema.index({ location: '2dsphere' }); // Geospatial index

module.exports = mongoose.model('Incident', IncidentSchema);
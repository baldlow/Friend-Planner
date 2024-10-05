const mongoose = require('mongoose');

const eventSchema = new mongoose.Schema({
    summary: {type: String, required: true},
    description: {type: String},
    provider: {type: String},

    // GEOJSON, coordinate
    location: {
        type: {
            type: String, // Don't do `{ location: { type: String } }`
            enum: ['Point'], // 'location.type' must be 'Point'
            required: true
          },
          coordinates: {
            type: [Number],
            required: true
          }
    },

    unique: {type: String, required: true},

    startTime: {type: Date, required: true},
    endTime: {type: Date, required: true}, 

    created: {type: Date, default: (new Date()).toISOString()},
    updated: {type: Date, default: (new Date()).toISOString()}
  });

  const Event = mongoose.model('LocalEvent', eventSchema,  'local_events');
  module.exports = Event;
const mongoose = require('mongoose');

const eventSchema = new mongoose.Schema({
    summary: {type: String, required: true},
    calendarId: {type: String, required: true},
    startTime: {type: Date, required: true},
    endTime: {type: Date, required: true}, 

    created: {type: Date, default: (new Date()).toISOString()}
  });

  const Event = mongoose.model('Event', eventSchema,  'events');
  module.exports = Event;
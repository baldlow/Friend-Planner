const mongoose = require('mongoose');

const eventSchema = new mongoose.Schema({
    summary: String,
    calendarId: String,
    startTime: Date,
    endTime: Date 
  });

  const Event = mongoose.model('Event', eventSchema,  'events');
  module.exports = Event;
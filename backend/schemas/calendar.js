const mongoose = require('mongoose');

const eventSchema = new mongoose.Schema({
    friendlyName: String,
    calendarId: Number,
    shareableName: String,
  });

  const Event = mongoose.model('Calendar', eventSchema,  'calendars');
  module.exports = Event;
const mongoose = require('mongoose');

const eventSchema = new mongoose.Schema({
  friendlyName: String,
  calendarId: Number,
  shareableName: String,
});

const Calendar = mongoose.model('Calendar', eventSchema, 'calendars');
module.exports = Calendar;

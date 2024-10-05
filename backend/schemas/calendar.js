const mongoose = require('mongoose');

const eventSchema = new mongoose.Schema({
  friendlyName: {type: String, required: true},
  shareableName: {type: String, required: true},

  created: {type: Date, default: (new Date()).toISOString()}
});

const Calendar = mongoose.model('Calendar', eventSchema, 'calendars');
module.exports = Calendar;

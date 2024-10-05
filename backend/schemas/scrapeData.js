const mongoose = require('mongoose');

const scrapeSchema = new mongoose.Schema({
    provider: {type: String, required: true},

    created: {type: Date, default: (new Date()).toISOString()},
    updated: {type: Date, default: (new Date()).toISOString()}
  });

  const Scraped = mongoose.model('Scraped', scrapeSchema,  'scrape');
  module.exports = Scraped;
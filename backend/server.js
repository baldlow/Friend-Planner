const express = require('express');
const crypto = require('crypto');
const mongoose = require('mongoose');
const credentials = require("./connect_str.json")
const app = express();
const PORT = 3000;

app.use(express.json());

// connect to mongo
mongoose.connect(credentials.uri, {
  dbName: 'calendars',
})

// define mongodb schemas:
const Event = require("./schemas/events");
const Calendar = require("./schemas/calendar");

// this cache wont clear stuff on its own (so itll slowly fill up till memory overflow) 
let cache = {
  // shareablename: obj
}

app.post("/api/upload", async (req, res) => {
  // sample structure of a post json:
  /*
    {
      "name": "friendly name"
      "events": [{
        "summary": "Busy",
        "startTime": 1728185765, (unix timestamp)
        "endTime": 1728192965  
      }.. so on]
    }
  */

  // post data to database here (split events and post, generating a unique id for each)

  let calId = "";

  let name = req.body["name"].replace(/\s/g, ''); // remove whitespace from the friendlyname for sharing


  const c = new Calendar({
    friendlyName: req.body["name"], // friendly name for display
    // create a unique name (e.g. [simplified name]-[first 6 of md5 hash of user agent]) this should be unique enough but short enough to be typable
    shareableName: `${name}-${crypto.createHash('md5').update(req.header('user-agent')).digest('hex').slice(0,6)}`
  })
  await c.save();

  calId = c.shareableName;
  cache[calId] = {};

  req.body["events"].forEach(async element => {
    const e = new Event({
      summary: element["summary"],
      calendarId: calId,
      startTime: new Date(element.startTime),
      endTime: new Date(element.endTime)
    })

    cache[calId] = e;

    await e.save();
  });

  res.send({"created": calId});
})

app.get("/api/calendar/:calId", async (req, res) => {
  // req.params will have calId
  // query mongo for that calendar + all events with that calid
  // form a calendar json and res.send() it
})

app.get("/api/events", async (req, res) => {
  // TODO: create a scrape function that we can run once a day or something to populate a collection in mongo with events.
})

// Start the server
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});



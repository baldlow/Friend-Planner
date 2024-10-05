const express = require('express');
const crypto = require('crypto'); // used to hash
const mongoose = require('mongoose');
const credentials = require("./connect_str.json") // maybe make this an env var at one point

const app = express();
const PORT = 3000;

app.use(express.json());

// connect to mongo
mongoose.connect(credentials.uri, {
  dbName: 'calendars',
})

 database
// define mongodb schemas:
const Event = require("./schemas/events");
const Calendar = require("./schemas/calendar");

// this cache wont clear stuff on its own (so itll slowly fill up till memory overflow) 
let cache = {String
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

  let name = encodeURIComponent(req.body["name"].replace(/\s/g, '')); // remove whitespace from the friendlyname for sharing

  try {
    const c = new Calendar({
      friendlyName: req.body["name"], // friendly name for display
      // create a unique name (e.g. [simplified name]-[first 6 of the date iso string]) this should be unique enough but short enough to be typable
      shareableName: `${name}-${crypto.createHash('md5').update((new Date()).toISOString()).digest('hex').slice(0, 6)}`
    })
    await c.save();

    calId = c.shareableName;
    cache[calId] = {};
=======
// Route to add a user's schedule
app.post('/api/schedule', (req, res) => {
  const { id, availability } = req.body;
  schedules.push({ id, availability });
  res.status(201).send({ message: 'Schedule added successfully!' });
});


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

    res.send({ "created": calId });
  } catch (error) {
    console.log(error);
    res.status(500).send({ message: 'Server error' });
  }
})

app.get("/api/calendar/:calId", async (req, res) => {
  // req.params will have calId
  // query mongo for that calendar + all events with that calid
  // form a calendar json and res.send() it
  const { calId } = req.params;
  let data = {};
  try {
    const calendar = await Calendar.findOne({ shareableName: calId });
    data["name"] = calendar.friendlyName;
    data["shareableName"] = calendar.shareableName;

    const events = await Event.find({ calendarId: calId }).lean();
    data["events"] = events;

    if (!calendar) {
      res.status(404).send({ message: 'Calendar not found' }); 
    } else res.send(data);

  } catch (error) {
    console.log(error);
    res.status(500).send({ message: 'Server error' });
  }
});

app.get("/api/events", async (req, res) => {
  // TODO: create a scrape function that we can run once a day or something to populate a collection in mongo with events.
})

// Start the server
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});



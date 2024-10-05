const express = require('express');
const crypto = require('crypto'); // used to hash
const mongoose = require('mongoose');
const fs = require('fs');
const path = require('path');

const credentials = require("./connect_str.json") // maybe make this an env var at one point

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
const scrapeData = require("./schemas/scrapeData");
const localEvent = require("./schemas/localEvents");


// we aren't using this right now (implement this maybe)
// this cache wont clear stuff on its own (so itll slowly fill up till memory overflow) 
let cache = {
  // shareablename: obj
}

app.use(express.static(path.join(__dirname, 'public')))


app.post("/api/upload", async (req, res) => {
  // sample structure of a post json:
  /*
    {
      "name": "friendly name"
      "events": [{
        "summary": "Busy",
        "startTime":  , (ISO timestamp)
        "endTime": 2024-10-05T16:42:55.680Z  
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

    console.log(`${name}-${crypto.createHash('md5').update((new Date()).toISOString()).digest('hex').slice(0, 6)}`)

    calId = c.shareableName;
    cache[calId] = {};
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
  // req.param s will have calId
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
  try {
    fs.readdir("./util/", async (err, files) => {
      if (err) {
        res.send({ message: "Something went wrong." });
        console.log(err);
        return;
      }

      let allEvents = [];
      
      const scrapePromises = files.map(async (file) => {
        const provider = require(path.join(__dirname, "./util/", file));
        const providerName = file.replace(/\.[^/.]+$/, "").toUpperCase();
        
        let scrapeInfo = await scrapeData.findOne({provider: providerName})
        if (!scrapeInfo) {
          scrapeInfo = new scrapeData({
            provider: providerName,
          })
          if (!(Math.abs(new Date(scrapeInfo.updated) - new Date(Date.now()))/1000 <= 86400)) provider.scrape();  
        }

        await scrapeInfo.save();

        const events = localEvent.find({startTime: {$gte: Date.now()}});
        return events;
      });

      const results = await Promise.all(scrapePromises);

      allEvents = results.flat();

      allEvents.forEach(event => {
        let dbEvent = localEvent.findOne({unique: event.unique});
        if (!dbEvent.unique) (new localEvent(event)).save();

        // console.log(localEvent.findOne({unique: event.unique}));

      })

      

      res.send(allEvents);
    });
  } catch (error) {
    console.log(error);
    res.send({ message: "Error processing events" });
  }
});

// Start the server
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});



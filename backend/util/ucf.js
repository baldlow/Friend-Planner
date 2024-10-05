const crypto = require('crypto')
const cheerio = require('cheerio');
const dayjs = require('dayjs');
const utc = require('dayjs/plugin/utc');
const axios = require("axios");
dayjs.extend(utc);


const localEvent = require('../schemas/localEvents');

async function scrape() {

    await axios.get('https://events.ucf.edu/upcoming/')
        .then(async (res) => {
            const $ = cheerio.load(res.data);
            const eventsHtml = $('.event-list .event');

                eventsHtml.each(async (index, element) => {
                    let unique = crypto.createHash('md5').update(`${$(element).find('h3 > a').attr('href')}-${$(element).find('p').text}`).digest('hex');
                    let locEvent = await localEvent.findOne({unique: unique});
                    if (locEvent) return;

                let newEvent = (new localEvent({
                    summary: $(element).find('h3 > a').text().trim(),
                    url: $(element).find('h3 > a').attr('href'),
                    description: `${$(element).find('.location').text()} - ${$(element).find('.description').text()}`.trim(),
                    provider: "UCF",

                    // this is just UCF as a whole
                    location: {
                        type: "Point",
                        coordinates: [-81.19712501183949, 28.59899755]
                    },

                    unique: unique,

                    startTime: dayjs(convert($(element).find('.dtstart').attr('datetime'))).toDate(),
                    endTime: dayjs(convert($(element).find('.dtend').attr('datetime'))).toDate(),
                }))

                await newEvent.save();
            });
        })
        .catch((err) => {
            console.log(err);
            return { "message": "err" };
        })
        return 0;
}

// this is sketch
function convert(origStamp) {
    let spl = origStamp.split("-");
    let offset = Math.floor(spl[3]/3600)

    return (`${spl[0]}-${spl[1]}-${spl[2]}-0${offset}:00`)
}

module.exports = {scrape};

const crypto = require('crypto')
const cheerio = require('cheerio');
const axios = require("axios");


const localEvents = require('../schemas/localEvents');

async function scrape() {
    let events = [];

    await axios.get('https://events.ucf.edu/upcoming/')
        .then(async (res) => {
            const $ = cheerio.load(res.data);
            const eventsHtml = $('.event-list .event');

            eventsHtml.each((index, element) => {


                events[index] = (new localEvents({
                    summary: $(element).find('h3 > a').text().trim(),
                    url: $(element).find('h3 > a').attr('href'),
                    description: `${$(element).find('.location')} - ${$(element).find('p').text}`,
                    provider: "UCF",

                    // this is just UCF as a whole
                    location: {
                        type: "Point",
                        coordinates: [-81.19712501183949, 28.59899755]
                    },

                    unique: crypto.createHash('md5').update(`${$(element).find('h3 > a').attr('href')}-${$(element).find('p').text}`),

                    startTime: $(element).find('dtstart').attr('datetime'),
                    endTime: $(element).find('dtend').attr('datetime'),
                }))

            });

            return events;

        })
        .catch((err) => {
            console.log(err);
            return {"message": "err"};
        })

        

}

module.exports = scrape;

scrape().then(res => console.log(res));
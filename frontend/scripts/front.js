const upload_url = `${window.location.origin}/api/upload`
const domain = `${window.location.origin}`

let date = new Date();
var colors = ['#4DD384', '#4DCCD3', '#EBBF58', '#EB5858', '#EBDC58', '#6BEB58', '#5865EB', '#D758EB', '#EB589D', '#AC58EB'];
const months = [
    'January',
    'February',
    'March',
    'April',
    'May',
    'June',
    'July',
    'August',
    'September',
    'October',
    'November',
    'December'
];
let enabled = [];
let data = {
    "name": "",
    "month": "",
    "token": "",
    "prev-month": [],
    "curr-month": [],
    "next-month": []
};

let pack = {
    "name": "",
    "events": []
};

let cals = {};

let unav = {
    "prev-month": [],
    "curr-month": [],
    "next-month": []
};

function findInDict(dict, key, val) {
    for (var i = 0; i < dict[key].length; i++) {
        if (dict[key][i] == val) {
            return i;
        }
    }
}

function clear(a) {
    const k = Object.keys(a);
    for (var i = 0; i < k.length; i++) {
        if (Array.isArray(a[k[i]])) {
            //console.log(str(a[k[i]]));
            a[k[i]] = [];
        } else {
            a[k[i]] = "";
        }
    }
}

function str(a) {
    return JSON.stringify(a);
}

function pck(del) {
  pack = {
    "name": "",
    "events": []
};
    const name = document.getElementById('calInput').value;
    pack["name"] = name;
    //console.log(data);
    for (var i = 0; i < data["prev-month"].length; i++) {
        const start = new Date(date.getFullYear(), date.getMonth() - 1, data["prev-month"][i], 0);
        const end = new Date(date.getFullYear(), date.getMonth() - 1, data["prev-month"][i], 23, 59);
        const eventTemp = { // Create a new event object
            "summary": "Day Unavailable",
            "startTime": start.toISOString(),
            "endTime": end.toISOString()
        };
        pack["events"].push(eventTemp);
    }
    for (var i = 0; i < data["curr-month"].length; i++) {
        const start = new Date(date.getFullYear(), date.getMonth(), data["curr-month"][i], 0);
        const end = new Date(date.getFullYear(), date.getMonth(), data["curr-month"][i], 23, 59);
        const eventTemp = { // Create a new event object
            "summary": "Day Unavailable",
            "startTime": start.toISOString(),
            "endTime": end.toISOString()
        };
        pack["events"].push(eventTemp);
    }
    for (var i = 0; i < data["next-month"].length; i++) {
        const start = new Date(date.getFullYear(), date.getMonth() + 1, data["next-month"][i], 0);
        const end = new Date(date.getFullYear(), date.getMonth() + 1, data["next-month"][i], 23, 59);
        const eventTemp = { // Create a new event object
            "summary": "Day Unavailable",
            "startTime": start.toISOString(),
            "endTime": end.toISOString()
        };
        pack["events"].push(eventTemp);
    }

    console.log(name);
    cals[name] = pack;

    if (del) {
        clear(data);
    }
}

function parseISOString(s) {
    var b = s.split(/\D+/);
    return new Date(Date.UTC(b[0], --b[1], b[2], b[3], b[4], b[5], b[6]));
}

function tblFind(tbl1, val) {
    for (var i = 0; i < tbl1.length; i++) {
        if (tbl1[i] == val) {
            return true;
        }
    }
    return false;
}

function tblLocate(tbl1, val) {
    for (var i = 0; i < tbl1.length; i++) {
        if (tbl1[i] == val) {
            return i;
        }
    }
    return false;
}

function compareCals() {
    unav["prev-month"] = [];
    unav["curr-month"] = [];
    unav["next-month"] = [];
    const k = Object.keys(cals);
    console.log(cals);
    console.log(k.length);
    if (k.length > 1) {
        for (var i = 0; i < k.length; i++) {
          console.log(cals[k[i]]);
          console.log(cals[k[i]]["name"]);
          console.log(tblFind(enabled,cals[k[i]]["name"]));
            if (cals[k[i]] == undefined || tblFind(enabled, cals[k[i]]["name"]) == false) {
                console.log(k[i]);
                continue;
            }
            for (var f = 0; f < cals[k[i]]["events"].length; f++) {
                let dt = parseISOString(cals[k[i]]["events"][f]["startTime"]);
                if (dt.getMonth() < date.getMonth()) {
                    if (findInDict(unav, "prev-month", dt.getDate()) == undefined) {
                        unav["prev-month"].push(dt.getDate());
                    }
                } else if (dt.getMonth() > date.getMonth()) {
                    if (findInDict(unav, "next-month", dt.getDate()) == undefined) {
                        unav["next-month"].push(dt.getDate());
                    }
                } else {
                    if (findInDict(unav, "curr-month", dt.getDate()) == undefined) {
                        unav["curr-month"].push(dt.getDate());
                    }
                }
            }
        }
    } else {
        if (cals[k[0]] == undefined || tblFind(enabled, cals[k[0]]["name"]) == false) {
            return;
        }
        for (var f = 0; f < cals[k[0]]["events"].length; f++) {
            let dt = parseISOString(cals[k[0]]["events"][f]["startTime"]);
            if (dt.getMonth() < date.getMonth()) {
                if (findInDict(unav, "prev-month", dt.getDate()) == undefined) {
                    unav["prev-month"].push(dt.getDate());
                }
            } else if (dt.getMonth() > date.getMonth()) {
                if (findInDict(unav, "next-month", dt.getDate()) == undefined) {
                    unav["next-month"].push(dt.getDate());
                }
            } else {
                if (findInDict(unav, "curr-month", dt.getDate()) == undefined) {
                    unav["curr-month"].push(dt.getDate());
                }
            }
        }
    }
}

function update() {
    const dys = document.querySelectorAll('.date');
    dys.forEach(dy => {
        switch (dy.id) {
            case "prev-date":
                if (findInDict(unav, "prev-month", dy.innerHTML) != undefined || findInDict(data, "prev-month", dy.innerHTML) != undefined) {
                    dy.style.backgroundColor = 'red';
                } else {
                    dy.style.backgroundColor = '#E0E1E1';
                }
                break;
            case "next-date":
                if (findInDict(unav, "next-month", dy.innerHTML) != undefined || findInDict(data, "next-month", dy.innerHTML) != undefined) {
                    dy.style.backgroundColor = 'red';
                } else {
                    dy.style.backgroundColor = '#E0E1E1';
                }
                break;
            default:
                if (findInDict(unav, "curr-month", dy.innerHTML) != undefined || findInDict(data, "curr-month", dy.innerHTML) != undefined) {
                    dy.style.backgroundColor = 'red';
                } else {
                    dy.style.backgroundColor = '#E0E1E1';
                }
                break;
        }
    })
}

function newCal(cal) {
    const toggle = document.getElementById('toggle');
    let div = document.createElement("div");
    div.className = "calTog";
    div.id = cal["name"];
    div.style.backgroundColor = colors[Object.keys(cals).length - 1];
    let b1 = document.createElement("button");
    b1.className = "calDel";
    b1.innerHTML = "X";
    b1.onclick = function() {
        delete cals[this.parentElement.id];
        compareCals();
        update();
        this.parentElement.remove();
        enabled.splice(tblLocate(enabled, cal["name"]), 1);
        clear(data);
    };
    let b2 = document.createElement("button");
    b2.className = "calTogg";
    b2.innerHTML = cal["name"];
    b2.onclick = function() {
        if (tblFind(enabled, this.innerHTML)) {
            enabled.splice(tblLocate(enabled, this.innerHTML), 1);
        } else {
            enabled.push(this.innerHTML);
        }
        compareCals();
        update();
    };
    toggle.appendChild(div);
    div.appendChild(b1);
    div.appendChild(b2);
    enabled.push(cal["name"]);
    //console.log(cal["name"]);
    //cals[k[i]]["name"]console.log(cals);
    cals[cal["name"]] = cal;
}

function renderCalendar() {
    date.setDate(1);

    const monthDays = document.getElementById('calendar-body');
    const month = document.getElementById('month');
    const daysElement = document.getElementById('days');

    const lastDay = new Date(
        date.getFullYear(),
        date.getMonth() + 1,
        0
    ).getDate();

    const prevLastDay = new Date(
        date.getFullYear(),
        date.getMonth(),
        0
    ).getDate();

    const firstDayIndex = date.getDay();

    const lastDayIndex = new Date(
        date.getFullYear(),
        date.getMonth() + 1,
        0
    ).getDay();

    const nextDays = 7 - lastDayIndex - 1;

    const days = [
        'S',
        'M',
        'T',
        'W',
        'T',
        'F',
        'S'
    ];

    month.innerText = `${months[date.getMonth()]} ${date.getFullYear()}`;
    daysElement.innerHTML = days.map(day => `<div class="day">${day}</div>`).join('');

    let dates = '';

    for (let x = firstDayIndex; x > 0; x--) {
        dates += `<button class='date' id='prev-date'>${prevLastDay - x + 1}</button>`;
    }

    for (let i = 1; i <= lastDay; i++) {
        dates += `<button class='date'>${i}</button>`;
    }

    for (let j = 1; j <= nextDays; j++) {
        dates += `<button class='date' id='next-date'>${j}</button>`;
    }
    monthDays.innerHTML = dates;
}

renderCalendar();

const dtes = document.querySelectorAll('.date');

dtes.forEach(date => {
    date.addEventListener('click', function(event) {
        //console.log('Box clicked:', event.target);
        if (date.style.backgroundColor == 'red') {
            if (date.id == "prev-date") {
                data["prev-month"].splice(findInDict(data, "prev-month", date.innerHTML), 1)
            } else if (date.id == "next-date") {
                data["next-month"].splice(findInDict(data, "next-month", date.innerHTML), 1)
            } else {
                data["curr-month"].splice(findInDict(data, "curr-month", date.innerHTML), 1)
            }
        } else {
            if (date.id == "prev-date") {
                data["prev-month"].push(date.innerHTML);
            } else if (date.id == "next-date") {
                data["next-month"].push(date.innerHTML);
            } else {
                data["curr-month"].push(date.innerHTML);
            }
        }
        update();
    });
});

const createCal = document.getElementById('create');
const loadCal = document.getElementById('enter');
const calCodeIn = document.getElementById('codeinput');
const calCodeOut = document.getElementById('code');

createCal.addEventListener('click', function(event) {
  const name = document.getElementById('calInput').value;
    if (name == '' || document.getElementById(name)) {
        return;
    }
  pck(true); // Prepare the calendar data

  newCal(pack);
    document.getElementById('calInput').value='';

  fetch(upload_url, { // Update URL as needed
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(pack)
  })
    .then(response => response.json())
    .then(json => {
      console.log('Calendar created:', json);
      calCodeOut.innerText = `Your calendar code is: ${json.created}`; // Display the generated code
    })
    .catch(error => console.error('Error:', error));
});

loadCal.addEventListener('click', function(event) {
  const code = calCodeIn.value;
  if (!code) {
    return alert('Please enter a calendar code');
  }

  fetch(`${domain}/api/calendar/${code.trim()}`) // Update with your API endpoint
    .then(response => {
      if (!response.ok) {
        throw new Error('Calendar not found');
      }
      return response.json();
    })
    .then(calendar => {
      // Clear current calendar data
      let tempd = {
        "name":"",
        "events":[]
      };

      

      tempd["name"]=calendar.name;

      // Update with fetched data
      calendar.events.forEach(event => {
        const eventTmp = { // Create a new event object
          "summary": "Day Unavailable",
          "startTime": "",
          "endTime": ""
        };
        eventTmp["startTime"]=event.startTime;
        eventTmp["endTime"]=event.endTime;
        tempd["events"].push(eventTmp);
      });


      newCal(tempd);
    })
    .catch(error => {
      console.error('Error:', error);
      alert('Failed to load calendar');
    });
});
const upload_url = `${window.location.origin}/api/upload`
const domain = `${window.location.origin}`

let date = new Date();

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

const data = {
  "name": "",
  "month": "",
  "token": "",
  "prev-month": [],
  "curr-month": [],
  "next-month": []
};

const pack = {
  "name": "",
  "events": []
};

const cals = {
  data,
};

function findInDict(dict, key, val) {
  for (var i = 0; i < dict[key].length; i++) {
    if (dict[key][i] == val) {
      return i;
    }
  }
}

/*function pck() {
  const eventTemp = {
    "summary": "Day Unavailable",
    "startTime": "",
    "endTime": ""
  };
  const name = document.getElementById('calInput').value;
  pack["name"] = name;
  for (var i = 0; i < data["prev-month"].length; i++) {
    const start = new Date(date.getFullYear(), date.getMonth() - 1, data["prev-month"][i], 0);
    const end = new Date(date.getFullYear(), date.getMonth() - 1, data["prev-month"][i], 23, 59);
    eventTemp["startTime"] = start.toISOString();
    eventTemp["endTime"] = end.toISOString();
    pack["events"].push(eventTemp);
  }
  for (var i = 0; i < data["curr-month"].length; i++) {
    const start = new Date(date.getFullYear(), date.getMonth(), data["curr-month"][i], 0);
    const end = new Date(date.getFullYear(), date.getMonth(), data["curr-month"][i], 23, 59);
    eventTemp["startTime"] = start.toISOString();
    eventTemp["endTime"] = end.toISOString();
    pack["events"].push(eventTemp);
  }
  for (var i = 0; i < data["next-month"].length; i++) {
    const start = new Date(date.getFullYear(), date.getMonth() + 1, data["next-month"][i], 0);
    const end = new Date(date.getFullYear(), date.getMonth() + 1, data["next-month"][i], 23, 59);
    eventTemp["startTime"] = start.toISOString();
    eventTemp["endTime"] = end.toISOString();
    pack["events"].push(eventTemp);
  }
}*/
function pck() {
  pack["events"] = []; // Reset events to avoid duplicates
  const name = document.getElementById('calInput').value;
  pack["name"] = name;
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
}

function update() {
  const dys = document.querySelectorAll('.date');
  dys.forEach(dy => {
    switch (dy.id) {
      case "prev-date":
        if (findInDict(data, "prev-month", dy.innerHTML) != undefined) {
          dy.style.backgroundColor = 'red';
        } else {
          dy.style.backgroundColor = '#E0E1E1';
        }
        break;
      case "next-date":
        if (findInDict(data, "next-month", dy.innerHTML) != undefined) {
          dy.style.backgroundColor = 'red';
        } else {
          dy.style.backgroundColor = '#E0E1E1';
        }
        break;
      default:
        if (findInDict(data, "curr-month", dy.innerHTML) != undefined) {
          dy.style.backgroundColor = 'red';
        } else {
          dy.style.backgroundColor = '#E0E1E1';
        }
        break;
    }
  })
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

/*dtes.forEach(date => {
  date.addEventListener('click', function(event) {
    console.log('Box clicked:', event.target);
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
    console.log(JSON.stringify(data));
  });
});*/
dtes.forEach(date => {
  date.addEventListener('click', function(event) {
    console.log('Box clicked:', event.target);
    const isSelected = date.style.backgroundColor === 'red'; // Determine if currently selected

    // Determine which month the date belongs to and update the respective array
    if (date.id === "prev-date") {
      if (isSelected) {
        const index = findInDict(data, "prev-month", date.innerHTML);
        if (index !== undefined) {
          data["prev-month"].splice(index, 1); // Remove date if already selected
        }
      } else {
        data["prev-month"].push(date.innerHTML); // Add date if not selected
      }
    } else if (date.id === "next-date") {
      if (isSelected) {
        const index = findInDict(data, "next-month", date.innerHTML);
        if (index !== undefined) {
          data["next-month"].splice(index, 1);
        }
      } else {
        data["next-month"].push(date.innerHTML);
      }
    } else {
      if (isSelected) {
        const index = findInDict(data, "curr-month", date.innerHTML);
        if (index !== undefined) {
          data["curr-month"].splice(index, 1);
        }
      } else {
        data["curr-month"].push(date.innerHTML);
      }
    }

    // Update the background color of the clicked date
    date.style.backgroundColor = isSelected ? '#E0E1E1' : 'red';

    // Update the calendar display
    update();
    console.log(JSON.stringify(data));
  });
});


const createCal = document.getElementById('create');
const loadCal = document.getElementById('enter');
const calCodeIn = document.getElementById('codeinput');
const calCodeOut = document.getElementById('code');


createCal.addEventListener('click', function(event) {
  pck(); // Prepare the calendar data

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
      data["prev-month"] = [];
      data["curr-month"] = [];
      data["next-month"] = [];

      // Update with fetched data
      calendar.events.forEach(event => {
        const eventDate = new Date(event.startTime);
        const eventMonth = eventDate.getMonth();
        const currentMonth = date.getMonth();

        // Adjust month index since eventDate.getMonth() is 0-based
        if (eventMonth === currentMonth - 1) {
          data["prev-month"].push(eventDate.getDate());
        } else if (eventMonth === currentMonth) {
          data["curr-month"].push(eventDate.getDate());
        } else if (eventMonth === currentMonth + 1) {
          data["next-month"].push(eventDate.getDate());
        }
      });

      // Re-render the calendar UI after updating the data
      renderCalendar(); // Ensure to call this to refresh the displayed calendar
      update(); // This should visually update the buttons based on new data
    })
    .catch(error => {
      console.error('Error:', error);
      alert('Failed to load calendar');
    });
});


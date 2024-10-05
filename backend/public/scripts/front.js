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

const data={
  "name":"",
  "month":"",
  "token":"",
  "prev-month":[],
  "curr-month":[],
  "next-month":[]
};

const pack={
  "name":"",
  "events":[]
};

const cals={
  data,
};

function findInDict(dict, key, val){
  for(var i=0;i<dict[key].length;i++){
    if(dict[key][i]==val){
      return i;
    }
  }
}

function pck(){
  const eventTemp={
    "summary":"Day Unavailable",
    "startTime":"",
    "endTime":""
  };
  const name = document.getElementById('calInput').value;
  pack["name"]=name;
  for(var i=0;i<data["prev-month"].length;i++){
    const start = new Date(date.getFullYear(),date.getMonth()-1,data["prev-month"][i],0);
    const end = new Date(date.getFullYear(),date.getMonth()-1,data["prev-month"][i],23,59);
    eventTemp["startTime"]=start.toISOString();
    eventTemp["endTime"]=end.toISOString();
    pack["events"].push(eventTemp);
  }
  for(var i=0;i<data["curr-month"].length;i++){
    const start = new Date(date.getFullYear(),date.getMonth(),data["curr-month"][i],0);
    const end = new Date(date.getFullYear(),date.getMonth(),data["curr-month"][i],23,59);
    eventTemp["startTime"]=start.toISOString();
    eventTemp["endTime"]=end.toISOString();
    pack["events"].push(eventTemp);
  }
  for(var i=0;i<data["next-month"].length;i++){
    const start = new Date(date.getFullYear(),date.getMonth()+1,data["next-month"][i],0);
    const end = new Date(date.getFullYear(),date.getMonth()+1,data["next-month"][i],23,59);
    eventTemp["startTime"]=start.toISOString();
    eventTemp["endTime"]=end.toISOString();
    pack["events"].push(eventTemp);
  }
}

function update(){
  const dys = document.querySelectorAll('.date');
  dys.forEach(dy=>{
    switch(dy.id){    
    case "prev-date":
      if (findInDict(data,"prev-month",dy.innerHTML) != undefined){
      dy.style.backgroundColor='red';
    }else{
      dy.style.backgroundColor = '#E0E1E1';
    }
      break;
    case "next-date":
      if (findInDict(data,"next-month",dy.innerHTML) != undefined){
      dy.style.backgroundColor='red';
    }else{
      dy.style.backgroundColor = '#E0E1E1';
    }
      break;
    default:
      if (findInDict(data,"curr-month",dy.innerHTML) !=undefined){
      dy.style.backgroundColor='red';
    }else{
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

dtes.forEach(date => {
            date.addEventListener('click', function(event) {
                console.log('Box clicked:', event.target);
              if (date.style.backgroundColor=='red'){
                if(date.id=="prev-date"){
                  data["prev-month"].splice(findInDict(data,"prev-month",date.innerHTML),1)
                }else if(date.id=="next-date"){
                  data["next-month"].splice(findInDict(data,"next-month",date.innerHTML),1)
                }else{
                  data["curr-month"].splice(findInDict(data,"curr-month",date.innerHTML),1)
                }
              }else{
                if(date.id=="prev-date"){
                  data["prev-month"].push(date.innerHTML);
                }else if(date.id=="next-date"){
                  data["next-month"].push(date.innerHTML);
                }else{
                  data["curr-month"].push(date.innerHTML);
                }
              }
              update();
              console.log(JSON.stringify(data));
 });
});

const createCal = document.getElementById('create');
const loadCal = document.getElementById('enter');
const calCodeIn = document.getElementById('codeinput');
const calCodeOut = document.getElementById('code');

createCal.addEventListener('click', function(event) {
  // data['name']=calName.value;
  // data['month']= `${months[date.getMonth()]} ${date.getFullYear()}`;
  // fetch('/api/calendar/${calCodeIn.value}')
  // .then((response) => response.json())
  // .then((json) => console.log(json));
  pck()
  console.log(JSON.stringify(pack));
});
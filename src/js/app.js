const button = document.getElementById("days");
const eventSubmit = document.getElementById("eventSubmit");
const navListener = document.getElementById("nav");
const lsKey = "events";

let newEvent = [];
let allEvent = [];
let next = [];
let sum = [];

var day = new Date();

var month = [
  "January",
  "February",
  "March",
  "April",
  "May",
  "June",
  "July",
  "August",
  "September",
  "October",
  "November",
  "December"
];
var dayNumber = day.getDate();
var activeDay = dayNumber;
let newMonth = day.getMonth();
var year = day.getFullYear();
var test = year + " " + month[newMonth] + " " + 1;
var monthToString = new Date(test).toDateString();
var firstDay = monthToString.substring(0, 3);
var weekday = ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"];
var a = weekday.indexOf(firstDay);
var b = new Date(year, newMonth + 1, 0).getDate();
var newWeekDay = weekday[day.getDay()];

function edit (){
    test = year + " " + month[newMonth] + " " + 1;
    monthToString = new Date(test).toDateString();
    firstDay = monthToString.substring(0, 3);
    weekday = ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"];
    a = weekday.indexOf(firstDay);
    b = new Date(year, newMonth + 1, 0).getDate();
    newWeekDay = weekday[day.getDay()];

}
function newMonthNext() {
  if (newMonth !== next) {
    newMonth++;
    if (newMonth === 12) {
      newMonth = 0;
    }
    edit();
  }
}

function newMonthPrev() {
  if (newMonth === 0) {
    newMonth = 12;
  }
  if (newMonth !== next) {
    newMonth--;
edit();
  }
}

function loadHeader() {
  var list = document.getElementById("list");
  var newLi = document.createElement("li");

  newLi.id = "none34";
  newLi.textContent = year + " - " + month[day.getMonth()];
  list.appendChild(newLi);
}

function removeM() {
  if (!!document.getElementById("none34")) {
    document.getElementById("none34").remove();
    document.getElementById("daysRemove").remove();
    document.getElementById("weekdaysRemove").remove();
  }
  daysForWeek(a, b);
}

document.getElementById("prev").onclick = function() {
  var list = document.getElementById("list");
  var newLi = document.createElement("li");

  if (next !== sum) {
    sum = next--;
    if (sum === 0) {
      year--;
      next = 11;
    }
    newLi.id = "none34";
    newLi.textContent = year + " - " + month[next];
    list.appendChild(newLi);
  }

  newMonthPrev();
  removeM();
  checkDiv();
};

document.getElementById("next").onclick = function() {
  var list = document.getElementById("list");
  var newLi = document.createElement("li");
  if (next !== sum) {
    sum = next++;

    if (sum === 11) {
      year++;
      next = 0;
    }
    newLi.id = "none34";
    newLi.textContent = year + " - " + month[next];
    list.appendChild(newLi);
  }
  newMonthNext();
  removeM();
  checkDiv();
};

function daysForWeek(a, b) {
  var weekdays = document.getElementById("weekdays");
  var ul = document.createElement("ul");
  ul.className = "weekdays";
  ul.id = "weekdaysRemove";
  for (var c = 0; c < 7; c++) {
    var li = document.createElement("li");
    li.textContent = weekday[c];
    if (c > 5) {
      li.style.color = "red";
    }
    ul.appendChild(li);
  }
  weekdays.appendChild(ul);

  var allDays = document.getElementById("days");
  var ul = document.createElement("ul");
  ul.className = "days";
  ul.id = "daysRemove";

  var c;
  for (c = 0; c < 7; c++) {
    if (c === a) {
      break;
    }
    var li = document.createElement("button");
    li.className = "none";
    li.textContent = "";
    ul.appendChild(li);
  }

  var count = 1;
  for (0; c < 7; c++) {
    var li = document.createElement("button");
    li.className = "number";
    li.textContent = count;
    if (count === dayNumber) {
      li.className = "active";
    }
    count++;
    ul.appendChild(li);
  }
  for (var r = 3; r <= 7; r++) {
    for (var c = 0; c < 7; c++) {
      if (count > b) {
        if (b === dayNumber) {
          li.className = "active";
        }
        allDays.appendChild(ul);
        return allDays;
      }
      if (count == dayNumber + 1) {
        li.className = "active";
      }
      var li = document.createElement("button");
      li.className = "number";
      li.id = "number";
      li.textContent = count;
      if (count == dayNumber) {
        li.className = "active";
      }
      count++;
      ul.appendChild(li);
    }
    allDays.appendChild(ul);
  }
  return allDays;
}

function cardEvent() {
  var card = document.getElementById("card");

  var div = document.createElement("div");
  div.id = "none";
  div.className = "card-header bg-transparent border-success";
  div.textContent = Number(activeDay) === dayNumber ? "Today " + activeDay : activeDay;

  var div2 = document.createElement("div");
  div2.id = "none2";
  div2.className = "card-body";

  var h5 = document.createElement("h5");
  h5.id = "button";
  h5.className = "card-title";

  card.appendChild(div);
  card.appendChild(div2);
  div2.appendChild(h5);

  for (let key in allEvent) {
    if (allEvent[key].date === activeDay && allEvent[key].month === month[newMonth] && allEvent[key].year === year) {
      var newline = document.createElement("li");
      newline.id = allEvent[key].id;
      newline.textContent = allEvent[key].title;
      h5.appendChild(newline);

      allEvent.forEach((allEvents, index) => {

        const deleteBtn = document.createElement("button");
        const editBtn = document.createElement("button");

        deleteBtn.textContent = "X";
        deleteBtn.id = "none8";
        editBtn.textContent = allEvents.isEditing ? "Save" : " Edit ";
        editBtn.id = "none9";
        newline.appendChild(deleteBtn);
        newline.appendChild(editBtn);

        deleteBtn.addEventListener("click", () => {
          allEvent.splice(index, 1);
          window.localStorage.setItem(lsKey, JSON.stringify(allEvent));
       
          checkDiv();
        });

        editBtn.addEventListener("click", () => {
          allEvent[index].isEditing = !allEvents.isEditing;
          window.localStorage.setItem(lsKey, JSON.stringify(allEvent));
          
          checkDiv();
        });
      });
      
    }
  }
}

button.addEventListener("click", event => {
  if (event.target.tagName === "BUTTON") {
    newEvent = { date: event.target.textContent };
    activeDay = Number(event.target.textContent);
    checkDiv();
    checkDivEdit();
  }
});

function checkDiv() {
  if (!!document.getElementById("none") && !!document.getElementById("none2")) {
    document.getElementById("none").remove();
    document.getElementById("none2").remove();
  }
  cardEvent();
  checkDivEdit();
}

function checkDivEdit() {
  if (!!document.getElementById("none8") && !!document.getElementById("none9")) {
    document.getElementById("none8").remove();
    document.getElementById("none9").remove();
  }
}

function createButton() {
  if (!document.getElementById("none2")) {
    var card = document.getElementById("card");
    var div2 = document.createElement("div");
    div2.id = "none2";
    div2.className = "card-body text-success";
    var h5 = document.createElement("h5");
    h5.className = "card-title";

    card.appendChild(div2);
    div2.appendChild(h5);
  }

  var btn = document.getElementById("button");

  var div = document.createElement("div");
  div.className = "card-title";
  var input = document.createElement("textarea");
  input.placeholder = "Write your event here...";
  input.id = "area";
  input.rows = "3";
  input.className = "form-control";

  var button = document.createElement("button");
  button.id = "eventSubmit";
  button.className = "btn btn-outline-success";
  var btnText = document.createTextNode("Submit");
  button.appendChild(btnText);

  var ALPHABET =
    "0123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ";
  var ID_LENGTH = 8;
  var rtn = "";
  var generate = function() {
    for (var i = 0; i < ID_LENGTH; i++) {
      rtn += ALPHABET.charAt(Math.floor(Math.random() * ALPHABET.length));
    }
    return rtn;
  };
  generate();

  button.onclick = function() {
    var inputTextArea = document.getElementById("area").value;
    const newEvent = {
      id: rtn,
      date: activeDay,
      title: inputTextArea,
      month: month[newMonth],
      year: year,
      isEditing: false
    };
    allEvent.push(newEvent);
    window.localStorage.setItem(lsKey, JSON.stringify(allEvent));
    checkDiv();
    checkDivEdit();
    return;
  };

  btn.appendChild(div);
  div.appendChild(input);
  btn.appendChild(button);
}

function navBar() {
  var nav = document.getElementById("nav");

  var ul = document.createElement("ul");
  ul.className = "nav nav-tabs border-success";

  var liH = document.createElement("li");
  liH.className = "nav-item";
  var liN = document.createElement("li");
  liN.className = "nav-item";
  var liE = document.createElement("li");
  liE.className = "nav-item";
  var liD = document.createElement("li");
  liD.className = "nav-item";

  var buttonHome = document.createElement("button");
  buttonHome.name = "refresh";
  buttonHome.className = "nav-link text-dark";
  var btnHome = document.createTextNode("Home");
  buttonHome.appendChild(btnHome);
  var buttonNew = document.createElement("button");
  buttonNew.name = "new";
  buttonNew.className = "nav-link text-dark";
  var btnNew = document.createTextNode("New");
  buttonNew.appendChild(btnNew);

  nav.appendChild(ul);
  ul.appendChild(liH);
  ul.appendChild(liN);
  ul.appendChild(liE);
  ul.appendChild(liD);
  liH.appendChild(buttonHome);
  liN.appendChild(buttonNew);
}

navListener.addEventListener("click", event => {
  if (event.target.tagName === "BUTTON") {
    switch (event.target.name) {
      case "refresh":
        location.reload();
        break;
      case "new":
        checkDiv();
        createButton();
        break;
      default:
        console.log("No");
    }
  }
});

document.addEventListener("DOMContentLoaded", () => {
  const storageDate = window.localStorage.getItem(lsKey);
  allEvent = JSON.parse(storageDate) || [];

  loadHeader();
  daysForWeek(a, b);
  cardEvent();
  navBar();
});

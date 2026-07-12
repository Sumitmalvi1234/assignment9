// =====================================
// ELEMENTS
// =====================================

const dashboard = document.getElementById("dashboard");
const pages = document.querySelectorAll(".page");
const cards = document.querySelectorAll(".card");
const backButtons = document.querySelectorAll(".back");

const time = document.getElementById("time");
const date = document.getElementById("date");
const greeting = document.getElementById("greeting");

const themeToggle = document.getElementById("themeToggle");

// =====================================
// NAVIGATION
// =====================================

cards.forEach((card) => {
  card.addEventListener("click", () => {
    dashboard.classList.add("hidden");

    pages.forEach((page) => {
      page.classList.add("hidden");
    });

    const target = document.getElementById(card.dataset.page);

    if (target) {
      target.classList.remove("hidden");
    }
  });
});

backButtons.forEach((button) => {
  button.addEventListener("click", () => {
    pages.forEach((page) => {
      page.classList.add("hidden");
    });

    dashboard.classList.remove("hidden");
  });
});

// =====================================
// DATE & TIME
// =====================================

function updateDateTime() {
  const now = new Date();

  if (time) {
    time.innerHTML = now.toLocaleTimeString();
  }

  if (date) {
    date.innerHTML = now.toDateString();
  }
}

updateDateTime();

setInterval(updateDateTime, 1000);

// =====================================
// GREETING
// =====================================

function updateGreeting() {
  if (!greeting) return;

  const hour = new Date().getHours();

  if (hour < 12) {
    greeting.innerHTML = "🌅 Good Morning";
  } else if (hour < 17) {
    greeting.innerHTML = "☀️ Good Afternoon";
  } else if (hour < 20) {
    greeting.innerHTML = "🌇 Good Evening";
  } else {
    greeting.innerHTML = "🌙 Good Night";
  }
}

updateGreeting();

setInterval(updateGreeting, 60000);

// =====================================
// DYNAMIC BACKGROUND
// =====================================

function updateBackground() {
  const hour = new Date().getHours();

  if (hour < 12) {
    document.body.style.background =
      "linear-gradient(135deg,#FFE29F,#FFA99F,#FF719A)";
  } else if (hour < 17) {
    document.body.style.background = "linear-gradient(135deg,#89F7FE,#66A6FF)";
  } else if (hour < 20) {
    document.body.style.background = "linear-gradient(135deg,#F6D365,#FDA085)";
  } else {
    document.body.style.background = "linear-gradient(135deg,#141E30,#243B55)";
  }
}

updateBackground();

setInterval(updateBackground, 60000);

// =====================================
// THEME
// =====================================

if (themeToggle) {
  if (localStorage.getItem("theme") === "dark") {
    document.body.classList.add("dark");

    themeToggle.checked = true;
  }

  themeToggle.addEventListener("change", () => {
    document.body.classList.toggle("dark");

    if (document.body.classList.contains("dark")) {
      localStorage.setItem("theme", "dark");
    } else {
      localStorage.setItem("theme", "light");
    }
  });
}
// =====================================
// TODO LIST
// =====================================

const todoInput = document.getElementById("todoInput");
const addTodo = document.getElementById("addTodo");
const todoList = document.getElementById("todoList");

let todos = JSON.parse(localStorage.getItem("todos")) || [];

function saveTodos() {
  localStorage.setItem("todos", JSON.stringify(todos));
}

function displayTodos() {
  if (!todoList) return;

  todoList.innerHTML = "";

  todos.forEach((todo, index) => {
    const li = document.createElement("li");

    li.innerHTML = `
            <input type="checkbox" ${todo.done ? "checked" : ""}>
            <span style="${todo.done ? "text-decoration:line-through;color:gray;" : ""}">
                ${todo.text}
            </span>
            <button class="deleteTodo">Delete</button>
        `;

    const checkbox = li.querySelector("input");

    checkbox.addEventListener("change", function () {
      todos[index].done = this.checked;

      saveTodos();

      displayTodos();
    });

    li.querySelector(".deleteTodo").addEventListener("click", function () {
      todos.splice(index, 1);

      saveTodos();

      displayTodos();
    });

    todoList.appendChild(li);
  });
}

if (addTodo) {
  addTodo.addEventListener("click", function () {
    const task = todoInput.value.trim();

    if (task === "") return;

    todos.push({
      text: task,

      done: false,
    });

    todoInput.value = "";

    saveTodos();

    displayTodos();
  });
}

displayTodos();

// =====================================
// DAILY PLANNER
// =====================================

const plannerTime = document.getElementById("plannerTime");
const plannerTask = document.getElementById("plannerTask");
const addPlanner = document.getElementById("addPlanner");
const plannerList = document.getElementById("plannerList");

let planner = JSON.parse(localStorage.getItem("planner")) || [];

function savePlanner() {
  localStorage.setItem("planner", JSON.stringify(planner));
}

function displayPlanner() {
  if (!plannerList) return;

  plannerList.innerHTML = "";

  planner.forEach((item, index) => {
    const li = document.createElement("li");

    li.innerHTML = `
            <strong class="plannerTime">${item.time}</strong>
            <span>${item.task}</span>
            <button class="deletePlanner">Delete</button>
        `;

    li.querySelector(".deletePlanner").addEventListener("click", function () {
      planner.splice(index, 1);

      savePlanner();

      displayPlanner();
    });

    plannerList.appendChild(li);
  });
}

if (addPlanner) {
  addPlanner.addEventListener("click", function () {
    const time = plannerTime.value;

    const task = plannerTask.value.trim();

    if (time === "" || task === "") return;

    planner.push({
      time: time,

      task: task,
    });

    plannerTime.value = "";

    plannerTask.value = "";

    savePlanner();

    displayPlanner();
  });
}

displayPlanner();
// =====================================
// DAILY GOALS
// =====================================

const goalInput = document.getElementById("goalInput");
const addGoal = document.getElementById("addGoal");
const goalList = document.getElementById("goalList");
const progress = document.getElementById("progress");
const progressText = document.getElementById("progressText");

let goals = JSON.parse(localStorage.getItem("goals")) || [];

function saveGoals() {
  localStorage.setItem("goals", JSON.stringify(goals));
}

function updateProgress() {
  if (!progress) return;

  let completed = goals.filter((goal) => goal.done).length;

  let percent = goals.length === 0 ? 0 : (completed / goals.length) * 100;

  progress.style.width = percent + "%";

  if (progressText) {
    progressText.innerHTML = `${completed} of ${goals.length} Completed`;
  }
}

function displayGoals() {
  if (!goalList) return;

  goalList.innerHTML = "";

  goals.forEach((goal, index) => {
    const li = document.createElement("li");

    li.innerHTML = `
            <input type="checkbox" ${goal.done ? "checked" : ""}>
            <span style="${goal.done ? "text-decoration:line-through;color:gray;" : ""}">
                ${goal.text}
            </span>
            <button class="deleteGoal">Delete</button>
        `;

    const checkbox = li.querySelector("input");

    checkbox.addEventListener("change", function () {
      goals[index].done = this.checked;

      saveGoals();

      displayGoals();
    });

    li.querySelector(".deleteGoal").addEventListener("click", function () {
      goals.splice(index, 1);

      saveGoals();

      displayGoals();
    });

    goalList.appendChild(li);
  });

  updateProgress();
}

if (addGoal) {
  addGoal.addEventListener("click", function () {
    const text = goalInput.value.trim();

    if (text === "") return;

    goals.push({
      text: text,

      done: false,
    });

    goalInput.value = "";

    saveGoals();

    displayGoals();
  });
}

displayGoals();

// =====================================
// MOTIVATION QUOTES
// =====================================

const quotes = [
  {
    quote: "Success doesn't come to you. You go to it.",
    author: "Marva Collins",
  },

  {
    quote: "Discipline beats motivation.",
    author: "Unknown",
  },

  {
    quote: "Dream big. Work hard. Stay humble.",
    author: "Unknown",
  },

  {
    quote: "Small progress is still progress.",
    author: "Unknown",
  },

  {
    quote: "Believe you can and you're halfway there.",
    author: "Theodore Roosevelt",
  },

  {
    quote: "Don't watch the clock. Do what it does. Keep going.",
    author: "Sam Levenson",
  },

  {
    quote: "Consistency creates success.",
    author: "Unknown",
  },

  {
    quote: "Your future is created by what you do today.",
    author: "Robert Kiyosaki",
  },

  {
    quote: "Never give up.",
    author: "Unknown",
  },

  {
    quote: "Focus on your goal, not the obstacle.",
    author: "Unknown",
  },
];

const quote = document.getElementById("quote");
const author = document.getElementById("author");
const newQuote = document.getElementById("newQuote");

function randomQuote() {
  if (!quote) return;

  const random = Math.floor(Math.random() * quotes.length);

  quote.innerHTML = quotes[random].quote;

  if (author) {
    author.innerHTML = "- " + quotes[random].author;
  }
}

randomQuote();

if (newQuote) {
  newQuote.addEventListener("click", randomQuote);
}

setInterval(randomQuote, 10000);

// =====================================
// POMODORO TIMER
// =====================================

const timer = document.getElementById("timer");
const startTimer = document.getElementById("startTimer");
const pauseTimer = document.getElementById("pauseTimer");
const resetTimer = document.getElementById("resetTimer");

let totalSeconds = 25 * 60;
let pomodoroInterval = null;
let running = false;

function updatePomodoro() {
  const minutes = Math.floor(totalSeconds / 60);
  const seconds = totalSeconds % 60;

  if (timer) {
    timer.innerHTML = `${String(minutes).padStart(2, "0")}:${String(seconds).padStart(2, "0")}`;
  }
}

updatePomodoro();

if (startTimer) {
  startTimer.addEventListener("click", function () {
    if (running) return;

    running = true;

    pomodoroInterval = setInterval(function () {
      if (totalSeconds > 0) {
        totalSeconds--;

        updatePomodoro();
      } else {
        clearInterval(pomodoroInterval);

        running = false;

        alert("Pomodoro Session Completed 🎉");
      }
    }, 1000);
  });
}

if (pauseTimer) {
  pauseTimer.addEventListener("click", function () {
    clearInterval(pomodoroInterval);

    running = false;
  });
}

if (resetTimer) {
  resetTimer.addEventListener("click", function () {
    clearInterval(pomodoroInterval);

    running = false;

    totalSeconds = 25 * 60;

    updatePomodoro();
  });
}

// =====================================
// WELCOME MESSAGE
// =====================================

const welcome = document.getElementById("welcome");

if (welcome) {
  const username = localStorage.getItem("username") || "User";

  welcome.innerHTML = `Welcome, ${username} 👋`;
}

// =====================================
// TODAY'S DATE
// =====================================

const today = document.getElementById("today");

if (today) {
  today.innerHTML = new Date().toLocaleDateString("en-IN", {
    weekday: "long",

    day: "numeric",

    month: "long",

    year: "numeric",
  });
}

// =====================================
// LIVE CLOCK
// =====================================

const clock = document.getElementById("clock");

function updateClock() {
  if (clock) {
    clock.innerHTML = new Date().toLocaleTimeString();
  }
}

updateClock();

setInterval(updateClock, 1000);

// =====================================
// DAILY TIP
// =====================================

const tips = [
  "💧 Drink enough water.",

  "📖 Read at least 10 pages today.",

  "🚶 Take a short walk.",

  "🎯 Focus on one task at a time.",

  "😴 Sleep for at least 7 hours.",

  "📵 Reduce unnecessary screen time.",

  "📝 Review your goals every morning.",

  "😊 Stay positive and keep learning.",
];

const tip = document.getElementById("tip");

if (tip) {
  tip.innerHTML = tips[Math.floor(Math.random() * tips.length)];
}

// =====================================
// BATTERY STATUS
// =====================================

const battery = document.getElementById("battery");

if (battery && "getBattery" in navigator) {
  navigator.getBattery().then(function (b) {
    function updateBattery() {
      battery.innerHTML = `🔋 ${Math.round(b.level * 100)}%`;
    }

    updateBattery();

    b.addEventListener("levelchange", updateBattery);
  });
}

// =====================================
// INTERNET STATUS
// =====================================

const internet = document.getElementById("internet");

function updateInternet() {
  if (!internet) return;

  internet.innerHTML = navigator.onLine ? "🟢 Online" : "🔴 Offline";
}

updateInternet();

window.addEventListener("online", updateInternet);

window.addEventListener("offline", updateInternet);

// =====================================
// VISIT COUNTER
// =====================================

const visits = document.getElementById("visits");

if (visits) {
  let count = Number(localStorage.getItem("visits")) || 0;

  count++;

  localStorage.setItem("visits", count);

  visits.innerHTML = count;
}

// =====================================
// SCREEN RESOLUTION
// =====================================

const screenSize = document.getElementById("screen");

if (screenSize) {
  screenSize.innerHTML = `${screen.width} × ${screen.height}`;
}

// =====================================
// STOPWATCH
// =====================================

const stopwatch = document.getElementById("stopwatch");

let stopwatchSeconds = 0;
let stopwatchTimer = null;

function updateStopwatch() {
  if (!stopwatch) return;

  const hrs = Math.floor(stopwatchSeconds / 3600);
  const mins = Math.floor((stopwatchSeconds % 3600) / 60);
  const secs = stopwatchSeconds % 60;

  stopwatch.innerHTML = `${String(hrs).padStart(2, "0")}:${String(mins).padStart(2, "0")}:${String(secs).padStart(2, "0")}`;
}

function startStopwatch() {
  if (stopwatchTimer) return;

  stopwatchTimer = setInterval(function () {
    stopwatchSeconds++;

    updateStopwatch();
  }, 1000);
}

function stopStopwatch() {
  clearInterval(stopwatchTimer);

  stopwatchTimer = null;
}

function resetStopwatch() {
  clearInterval(stopwatchTimer);

  stopwatchTimer = null;

  stopwatchSeconds = 0;

  updateStopwatch();
}

updateStopwatch();

// =====================================
// SIMPLE WEATHER
// =====================================

const weather = document.getElementById("weather");

if (weather) {
  weather.innerHTML = "☀️  ";
}

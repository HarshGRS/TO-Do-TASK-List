
let isAuthenticated = false;

document.addEventListener('DOMContentLoaded', function () {
  const signInBtn = document.getElementById('google-signin-btn');
  const loginStatus = document.getElementById('login-status');
  const taskForm = document.getElementById('task-form');
  const tasksSection = document.getElementById('tasks');
  const historySection = document.getElementById('history-section');

  const taskInput = document.getElementById('task-input');
  const datetimePicker = document.getElementById('datetime-picker');
  const taskList = document.getElementById('task-list');
  const taskHistory = document.getElementById('task-history');

  flatpickr("#datetime-picker", {
    enableTime: true,
    dateFormat: "Y-m-d H:i",
    minDate: "today"
  });

  signInBtn.addEventListener('click', () => {
    isAuthenticated = true;
    loginStatus.textContent = "Sign in successfully ✅";
    loginStatus.style.color = "#00ff00";
    taskForm.style.display = "block";
    tasksSection.style.display = "block";
    historySection.style.display = "block";
    signInBtn.style.display = "none";
  });

  taskForm.addEventListener('submit', function (e) {
    e.preventDefault();
    if (!isAuthenticated) {
      alert("Please sign in first.");
      return;
    }

    const taskText = taskInput.value.trim();
    const dueTime = datetimePicker.value;

    if (taskText && dueTime) {
      const li = document.createElement('li');
      li.textContent = `${taskText} — due: ${dueTime}`;
      taskList.appendChild(li);

      const historyItem = document.createElement('li');
      historyItem.textContent = `${taskText} — added: ${new Date().toLocaleString()}`;
      taskHistory.appendChild(historyItem);

      taskInput.value = '';
      datetimePicker.value = '';
    }
  });

  const greetingEl = document.getElementById('greeting');
  const hour = new Date().getHours();
  let greetingText = "Welcome!";

  if (hour < 12) greetingText = "Good Morning ☀️!";
  else if (hour < 18) greetingText = "Good Afternoon 🌞!";
  else greetingText = "Good Evening 🌙!";

  greetingEl.textContent = greetingText;
});

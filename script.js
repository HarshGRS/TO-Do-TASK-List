// Simulated auth state (for demo)
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

  // Flatpickr setup
  flatpickr("#datetime-picker", {
    enableTime: true,
    dateFormat: "Y-m-d H:i",
    minDate: "today"
  });

  // Simulate Sign In
  signInBtn.addEventListener('click', () => {
    // In real app, redirect to OAuth login or call backend
    isAuthenticated = true;

    // Show success
    loginStatus.textContent = "Sign in successfully ✅";
    loginStatus.style.color = "#00ff00";

    // Show form and sections
    taskForm.style.display = "block";
    tasksSection.style.display = "block";
    historySection.style.display = "block";

    // Hide sign-in button
    signInBtn.style.display = "none";
  });

  // Add Task
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

      // Save to history
      const historyItem = document.createElement('li');
      historyItem.textContent = `${taskText} — completed/added: ${new Date().toLocaleString()}`;
      taskHistory.appendChild(historyItem);

      taskInput.value = '';
      datetimePicker.value = '';
    }
  });

  // Dynamic greeting
  const greetingEl = document.getElementById('greeting');
  const hour = new Date().getHours();
  let greetingText = "Welcome!";

  if (hour < 12) greetingText = "Good Morning ☀️!";
  else if (hour < 18) greetingText = "Good Afternoon 🌞!";
  else greetingText = "Good Evening 🌙!";

  greetingEl.textContent = greetingText;
});

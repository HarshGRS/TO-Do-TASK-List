document.addEventListener("DOMContentLoaded", () => {
  flatpickr("#datetime-picker", {
    enableTime: true,
    dateFormat: "Y-m-d H:i"
  });

  const taskForm = document.getElementById("task-form");
  const taskList = document.getElementById("task-list");
  const taskHistory = document.getElementById("task-history");

  taskForm.addEventListener("submit", async (e) => {
    e.preventDefault();
    const task = document.getElementById("task-input").value;
    const dueDate = document.getElementById("datetime-picker").value;

    const res = await fetch("/api/tasks", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ task, dueDate })
    });

    const newTask = await res.json();
    displayTask(newTask);
    taskForm.reset();
  });

  function displayTask(task) {
    const li = document.createElement("li");
    li.textContent = `${task.task} (Due: ${task.dueDate})`;
    taskList.appendChild(li);

    const hist = document.createElement("li");
    hist.textContent = `Added: ${task.task} @ ${task.dueDate}`;
    taskHistory.appendChild(hist);
  }

  window.handleCredentialResponse = async function(response) {
    const res = await fetch("/auth/google", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ credential: response.credential })
    });

    if (res.ok) {
      document.getElementById("signin-status").textContent = "Sign in successful ✅";
      document.getElementById("signin-status").style.color = "limegreen";
      document.getElementById("task-form").style.display = "block";
      document.getElementById("tasks").style.display = "block";
    } else {
      document.getElementById("signin-status").textContent = "Authentication failed ❌";
    }
  };
});
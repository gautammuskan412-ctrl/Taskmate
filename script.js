
let tasks = [];
let currentFilter = "all";

let input = document.getElementById("taskInput");
let addBtn = document.getElementById("addBtn");
let taskList = document.getElementById("taskList");

function showTasks(filter) {
    currentFilter = filter;
    taskList.innerHTML = "";

    let count = 0;

    for (let i = 0; i < tasks.length; i++) {

        if (filter == "all" ||
            (filter == "pending" && tasks[i].completed == false) ||
            (filter == "completed" && tasks[i].completed == true)) {

            count++;

            let div = document.createElement("div");
            div.className = "task";

            let check = document.createElement("input");
            check.type = "checkbox";
            check.checked = tasks[i].completed;

            let name = document.createElement("span");
            name.className = "task-name";
            name.innerText = tasks[i].name;

            if (tasks[i].completed == true) {
                name.classList.add("done");
            }

            let edit = document.createElement("button");
            edit.innerText = "Edit";
            edit.className = "edit-btn";

            let del = document.createElement("button");
            del.innerText = "Delete";
            del.className = "delete-btn";

            check.addEventListener("change", function() {
                tasks[i].completed = check.checked;
                showTasks(currentFilter);
            });

            edit.addEventListener("click", function() {
                let newName = prompt("Edit your task:", tasks[i].name);

                if (newName != null && newName.trim() != "") {
                    tasks[i].name = newName.trim();
                    showTasks(currentFilter);
                }
            });

            del.addEventListener("click", function() {
                tasks.splice(i, 1);
                showTasks(currentFilter);
            });

            div.appendChild(check);
            div.appendChild(name);
            div.appendChild(edit);
            div.appendChild(del);

            taskList.appendChild(div);
        }
    }

    document.getElementById("emptyMessage").style.display =
        count == 0 ? "block" : "none";

    updateCount();
}

function updateCount() {
    let total = tasks.length;
    let completed = 0;

    for (let i = 0; i < tasks.length; i++) {
        if (tasks[i].completed == true) {
            completed++;
        }
    }

    let pending = total - completed;

    document.getElementById("total").innerText = total;
    document.getElementById("completed").innerText = completed;
    document.getElementById("pending").innerText = pending;

    let percent = 0;

    if (total > 0) {
        percent = Math.round((completed / total) * 100);
    }

    document.getElementById("bar").style.width = percent + "%";
    document.getElementById("percent").innerText =
        percent + "% Completed";
}

addBtn.addEventListener("click", function() {
    let taskName = input.value.trim();

    if (taskName == "") {
        alert("Please enter a task!");
    } else {
        let newTask = {
            name: taskName,
            completed: false
        };

        tasks.push(newTask);
        input.value = "";
        showTasks(currentFilter);
    }
});

input.addEventListener("keypress", function(event) {
    if (event.key == "Enter") {
        addBtn.click();
    }
});

showTasks("all");



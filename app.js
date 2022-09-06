const tasks = $("#collection");
const task = $(".collection-item");
const tasksone = $(".collection:first-child");

// INITIALIZE APP
runApp();

// APP FUNCTIONS
function runApp() {
  // init display
  $("document").ready(displayTasks);
  // CREATE NEW TASK
  $("form").on("submit", createTask);
  // ACTIONS ON LIST ITEMS
  $(".card-action").on("click", cardActions);
  // SEARCH TASKS
  $("input[type='text']").on("input", searchTasks)

//  LOOP LS
function displayTasks() {
  const tasksStore = JSON.parse(localStorage.getItem("tasks"));
  if (!tasksStore) {
    tasks.append(
      $("<li/>", {
        class: "collection-item",
        html: "<h6>There Are No Tasks Here Yet</h6>",
      }).append("<h1/>", {
        text: "No Tasks Here Yet",
        style: "color:black;",
      })
    );
  } else {
    tasksStore.forEach(function (task) {
      const li = $("<li/>", {
        class: "collection-item",
        text: task,
        click: function (click) {
          $(this).toggleClass("done");
        },
      })
        .append(
          $("<a/>", {
            class: "secondary-content pull-right remove-item",
            html: "<i class='fa fa-remove remove-item'></i>",
          })
        )
        .appendTo(tasks);
    });
  }
}
// CREATE LI ELEMENTS
function createTask(e) {
  if ($("#task").val() === "") {
    alert("You Didn't Type In A Task");
  } else {
    const li = $("<li/>", {
      class: "collection-item",
      text: $("#task").val(),
      click: function (click) {
        $(this).toggleClass("done");
      },
    })
      .append(
        $("<a/>", {
          class: "remove- item secondary-content pull-right",
          html: "<i class='fa fa-remove remove-item'></i>",
        })
      )
      .appendTo(tasks);

    save($("#task").val());
    $("#task").val("");
  }

  e.preventDefault();
}

function cardActions(e) {
  if ($(e.target).hasClass("remove-item")) {
    if (confirm("Delete Task?")) {
      $(e.target.parentElement.parentElement).slideUp("slow", function () {
        e.target.parentElement.parentElement.remove();
        deleteTask($(e.target).parent().parent().text());
      });
    }
  } else if ($(e.target).hasClass("btn")) {
    tasks.children().fadeOut("3000", function () {
      tasks.children().remove();
      deleteAll();
    });
  }
}

function save(task) {
  let tasksArray = [];
  if (localStorage.getItem("tasks")) {
    tasksArray = JSON.parse(localStorage.getItem("tasks"));
    tasksArray.push(task);
    localStorage.setItem("tasks", JSON.stringify(tasksArray));
  } else {
    tasksArray.push(task);
    localStorage.setItem("tasks", JSON.stringify(tasksArray));
  }
  location.reload();
}

function deleteTask(task) {
  let data = JSON.parse(localStorage.getItem("tasks"));
  if (!data) {
    alert("No tasks to Clear");
  } else {
    data.forEach(function (item, i) {
      if (item === task) {
        data.splice(i, 1);
        localStorage.setItem("tasks", JSON.stringify(data));
      }
    });
  }
}

function deleteAll() {
  localStorage.clear();
  location.reload();
}

function searchTasks() {
  query = $("#search").val().toLowerCase();
  tasks.children().each(function(itemIndex, element) {
    if (query.length > 0 && $(element).text().toLowerCase().indexOf(query) !== -1) {
      element.style.display = "hidden"
      $(element).css({
        display: "block",
        color: "green"
      })
    } else if(query.length === 0) {
      $(element).css({
        display: "block",
        color: "black"
      })
    }   else {
      $(element).css({
        display: "none"
      })
    } 
  })
}}
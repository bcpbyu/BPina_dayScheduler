// Variable for the saved data, and display curent time
var schedule = [];
var time = [];
var date = moment().format('MMMM Do YYYY, h:mm a');
var hour = moment().format("h");
var after = moment().format("a");

// Filling time and schedule variable so there's no empty variable error
for (var i = 0; i < 9; i++) {
    time[i] = i;
    schedule[i] = "";
}

// Call load function
load();

// Event for save buttons, save the data in the textarea to local storage
$(".btn-primary").on("click", function () {
    var times = $(this).attr("id");
    var input = $(this).siblings("textarea").val();
    schedule[parseInt(times)] = input;
    console.log(times);
    localStorage.setItem("input", JSON.stringify(schedule));
    console.log(JSON.parse(localStorage.getItem("input")));
    console.log("----------------------");
});

// Event for reset button, emptys saved to-dos and reloads page
$("#reset").on("click", function () {
    localStorage.removeItem("input");
    location.reload();
});

// This function displays the date and time
function timeDis() {
    $("#currentDay").text(date);
}

// This function constantly updates the current time
function timeChange() {
    setInterval(function () {
        date = moment().format('MMMM Do YYYY, h:mm a');
        after = moment().format("a");

        colors();
        timeDis();
    }, 1000);
}

// This function change the color of the textareas depending on the time
function colors() {
    var timeAdj = hour - 9;

    if (after == "pm") {
        timeAdj = timeAdj + 12;
    }

    for (var i = 0; i < 9; i++) {
        if (time[i] < timeAdj) {

            // Past color change
            $("#" + time[i]).siblings("textarea").css("background-color", "#d6d6d6");

        }
        else if (time[i] > timeAdj) {

            // Future color change
            $("#" + time[i]).siblings("textarea").css("background-color", "#ffd5d4");

        }
        else {

            // Present color change
            $("#" + time[i]).siblings("textarea").css("background-color", "#d4ffd7");

        }
    }
}

// This function calls the colors, timeDis, and timeChange functions. Also update textareas with the saved to-dos
function load() {
    colors();
    timeDis();
    timeChange();

    var input = JSON.parse(localStorage.getItem("input"));

    if (input == null) {
        localStorage.setItem("input", JSON.stringify(schedule));
        input = JSON.parse(localStorage.getItem("input"));
    }
    for (var i = 0; i < time.length; i++) {
        if (input[i] == null) {
            schedule[i] = "";
        }
        schedule = input;
        $("#" + time[i]).siblings("textarea").val(schedule[i]);
    }
}
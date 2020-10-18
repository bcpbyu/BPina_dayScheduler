// Variable for teh saved data, and display curent time
var schedule = [];
var time = [];
var months = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"]
var d = new Date();
var date = [];
date[0] = d.getMonth();
date[1] = d.getDate();
date[2] = d.getFullYear();
date[3] = d.getHours();
date[4] = d.getMinutes();
var after;

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

// This function makes the date and time from javascript make sense then displays it
function timeDis() {
    if (date[3] > 11) {
        after = "pm";
    }
    else {
        after = "am";
    }
    if (date[3] > 12) {
        date[3] = date[3] - 12;
    }
    if (date[4] < 10) {
        date[4] = "0" + date[4];
    }

    $("#date").text(months[date[0]] + " " + date[1] + ", " + date[2]);
    
    $("#time").text(date[3] + " : " + date[4] + " " + after);
}

// This function constantly update the current time
function timeChange() {
    setInterval(function () {
        d = new Date();
        date[3] = d.getHours();
        date[4] = d.getMinutes();

        colors();
        timeDis();
    }, 1000)
}

// This function change the color of the textareas depending on the time
function colors() {
    var timeAdj = date[3] - 9;
    
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

// This function calls the colors, timeDis, and timeChange functions. Also update textareas 
// with the saved to-dos
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
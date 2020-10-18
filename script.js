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
//console.log(date);


for (var i = 0; i < 9; i++) {
    time[i] = i;
    schedule[i] = "";
}

load();

$(".btn-primary").on("click", function () {
    var times = $(this).attr("id");
    var input = $(this).siblings("textarea").val();
    schedule[parseInt(times)] = input;
    console.log(times);
    localStorage.setItem("input", JSON.stringify(schedule));
    console.log(JSON.parse(localStorage.getItem("input")));
    console.log("----------------------");
});

$("#reset").on("click", function () {
    localStorage.removeItem("input");
    location.reload();
});

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

function timeChange() {
    setInterval(function () {
        d = new Date();
        date[3] = d.getHours();
        date[4] = d.getMinutes();
        // console.log(date[3]);
        // console.log(date[4]);
        // console.log(d.getSeconds());
        colors();
        timeDis();

    },
        1000)
}

function colors() {
    var timeAdj = date[3] - 9;
    
    for (var i = 0; i < 9; i++) {
        if (time[i] < timeAdj) {
            // past
            $("#" + time[i]).siblings("textarea").css("background-color", "#d6d6d6");
        }
        else if (time[i] > timeAdj) {
            // future
            $("#" + time[i]).siblings("textarea").css("background-color", "#ffd5d4");
        }
        else {
            // present
            $("#" + time[i]).siblings("textarea").css("background-color", "#d4ffd7");
        }
    }
}

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
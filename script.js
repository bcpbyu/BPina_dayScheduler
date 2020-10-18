var schedule = [];
var time = [];
var months = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"]
var d = new Date();
var date = [];
date[0] = d.getMonth();
date[1] = d.getDay();
date[2] = d.getFullYear();
date[3] = d.getHours();
date[4] = d.getMinutes();
console.log(date);
var after;

for (var i = 0; i < 9; i++) {
    time[i] = i;
    schedule[i] = "";
}

load();


$("button").on("click", function () {
    var times = $(this).attr("id");
    var input = $(this).siblings("textarea").val();
    schedule[parseInt(times)] = input;
    console.log(times);
    localStorage.setItem("input", JSON.stringify(schedule));
    console.log(JSON.parse(localStorage.getItem("input")));
    console.log("----------------------");
});

function timeDis(){
    if (date[3] > 11) {
        after = "pm";
    }
    else{
        after= "am";
    }
    if (date[3] > 12) {
        date[3]=date[3]-12;
    }
    if (date[4] < 10) {
        date[4] = "0" + date[4];
    }
    $("#date").text(months[date[0]] + " " + date[1] + ", " + date[2]);
    $("#time").text(date[3] + " : " + date[4] + " " + after);
}

function timeChange(){
    setInterval(function () {
    d = new Date();
    date[3] = d.getHours();
    date[4] = d.getMinutes();
    // console.log(date[3]);
    // console.log(date[4]);
    // console.log(d.getSeconds());
    timeDis();
    colors();
    }, 
    1000)
}

function colors() {
    for (var i=0; i < 9; i++){
        $("#"+time[i]).siblings("textarea").css("backround-color", "grey");
    }
}

function load() {
    timeDis();
    timeChange();
    colors();
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


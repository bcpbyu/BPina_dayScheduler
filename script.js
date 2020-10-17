function save() {

    var time = $(this).attr("id");
    var input;
    console.log(time);
    console.log(input);
    console.log("The time: " + time);

};

$("button").on("click",function() {
    save();
})
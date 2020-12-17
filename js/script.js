
$(document).ready(function() {

    var now = moment();
    var today = moment().day(now._d.getDay()).format("dddd");
    var date = moment().date(now._d.getDate()).format("Do");
    var month = moment().month(now._d.getMonth()).format("MMMM");
    $("#currentDay").text(`${today}, ${month} ${date}`);

    var lastUpdate;

    if (lastUpdate) {
        if (lastUpdate !== now._d.getDay()) {
            console.log("New day, clearing tasks");
            // clearTasks();
        }
    }

    renderBlocks();


    // Pull saved tasks from local storage
    var tasks;
    var tRead;
    if (tRead = localStorage.getItem("tasks")) {
        tasks = JSON.parse(tRead);
    } else {
        tasks = ["", "", "", "", "", "", "", "", ""];
        localStorage.setItem("tasks", JSON.stringify(tasks));
    }

    console.log(tasks);
    $(".saveBtn").click(function(event) {
        var target = $(event.target);
        var hour = parseInt(target.attr("data-hour"));
        var taskDescr = $(`#descr-${hour}`).val();

        // save taskDescr to local storage of tasks for the day
        tasks[hour - 9] = taskDescr;
        localStorage.setItem("tasks", JSON.stringify(tasks));
        lastUpdate = 5 //moment()._d.getDay();
        console.log(lastUpdate + " " + now._d.getDay())
    });

    // Function to draw all time blocks and load any saved task content
    function renderBlocks() {
        for (var i = 0; i < 9; i++) {
            var newBlock = $("<div>");
            newBlock.addClass("input-group");
            newBlock.addClass("time-block");

            
        }
    }

    function clearTasks() {

    }
});

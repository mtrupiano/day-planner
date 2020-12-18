
$(document).ready(function() {

    var now = moment();
    var today = moment().day(now._d.getDay()).format("dddd");
    var date = moment().date(now._d.getDate()).format("Do");
    var month = moment().month(now._d.getMonth()).format("MMMM");
    $("#currentDay").text(`${today}, ${month} ${date}`);

    var lastUpdate = localStorage.getItem("lastUpdate") ? parseInt(localStorage.getItem("lastUpdate")) : 0;
    console.log(now._d.getDay());
    
    var tasks;
    if (lastUpdate) {
        if (lastUpdate !== now._d.getDay()) {
            console.log("New day, clearing tasks");
            tasks = ["", "", "", "", "", "", "", "", ""];
            localStorage.setItem("tasks", JSON.stringify(tasks));
            // clearTasks();
        }
    }

    
    
    // Pull saved tasks from local storage
    var tRead;
    if (tRead = localStorage.getItem("tasks")) {
        tasks = JSON.parse(tRead);
    } else {
        tasks = ["", "", "", "", "", "", "", "", ""];
        localStorage.setItem("tasks", JSON.stringify(tasks));
    }
    renderBlocks();

    console.log(tasks);
    $(".saveBtn").click(function(event) {
        var target = $(event.target);
        var hour = parseInt(target.attr("data-hour"));
        var taskDescr = $(`#descr-${hour}`).val();

        // save taskDescr to local storage of tasks for the day
        tasks[hour - 9] = taskDescr;
        localStorage.setItem("tasks", JSON.stringify(tasks));
        localStorage.setItem("lastUpdate", moment()._d.getDay());
        console.log(lastUpdate + " " + now._d.getDay())
        renderBlocks();
    });

    // Function to draw all time blocks and load any saved task content
    function renderBlocks() {
        var timeBlockContainer = $(".container");
        timeBlockContainer.html("");
        var iDay;
        for (var i = 0; i < 9; i++) {
            iDay = i + 9 > 12 ? (i + 9) % 12 : i + 9
            var newRow = $("<div>");
            newRow.addClass("row");

            var newBlock = $("<div>");
            newBlock.addClass("input-group");
            newBlock.addClass("time-block");

            var newBlockLabel = $("<label>").addClass("hour");
            newBlockLabel.text(`${iDay} ${i + 9 >= 12 ? "PM" : "AM"}`);

            var newBlockTextArea = $("<textarea>").addClass("description");
            newBlockTextArea.attr("id", `descr-${iDay}`);
            newBlockTextArea.attr("cols", "30");
            newBlockTextArea.attr("rows", "4");
            newBlockTextArea.text(tasks[i]);

            var newBlockSaveBtn = $("<button>").addClass("saveBtn");
            newBlockSaveBtn.attr("data-hour", `${iDay}`)
            newBlockSaveBtn.text("Save");

            newBlock.append(newBlockLabel);
            newBlock.append(newBlockTextArea);
            newBlock.append(newBlockSaveBtn);
            newRow.append(newBlock);
            timeBlockContainer.append(newRow);
        }
    }

    function clearTasks() {

    }
});

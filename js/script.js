

$(document).ready(function() {

    var now = moment();
    var day = moment().day(now._d.getDay()).format("dddd");
    var date = moment().date(now._d.getDate()).format("Do");
    var month = moment().month(now._d.getMonth()).format("MMMM");
    $("#currentDay").text(`${day}, ${month} ${date}`);

    
});

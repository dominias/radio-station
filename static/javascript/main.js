document.addEventListener("DOMContentLoaded", function() {
    tempTimeslot = JSON.parse(timedata);
    timeslotData = tempTimeslot[0];

    var week = document.querySelector(".week-option");
    var next = document.querySelector(".next-week");
    var last = document.querySelector(".last-week");
    week.innerHTML = timeslotData.week;

    populate();

    next.addEventListener("click", function () {
        if (timeslotData.id != 3) {
            timeslotData = tempTimeslot[timeslotData.id];

            week.innerHTML = timeslotData.week;

            populate();
        }

        else {
            console.log("Cannot go any further in the future.");
            
        }
    });
    
    last.addEventListener("click", function () {
        if (timeslotData.id != 1) {
            timeslotData = tempTimeslot[timeslotData.id - 2];

            week.innerHTML = timeslotData.week;

            populate();
        }

        else {
            console.log("Cannot go any further in the past.");
            
        }
    });
});

function vis(id) {
    var button = document.getElementById(id);

    if (button.style.color != "gray") button.style.color = "gray";
    else button.style.color = "black";

    if (id == "slot-vis") var change = document.getElementById("timeslots");
    else if (id == "date-vis") var change = document.getElementById("weekdates");

    if (change.style.display != "none") change.style.display = "none";
    else change.style.display = "grid";
 }

 function populate() {
    const dates = document.querySelectorAll(".date-option");

    const timeslotList = document.getElementById("slot");
    timeslotList.innerHTML = "";

    dates.forEach((date, i) => {

        date.addEventListener("click", function() {
            timeslots = timeslotData.dates[i].timeslots;
            
            timeslotList.innerHTML = "";

            timeslots.forEach(timeslot => {
                const text = document.createTextNode(timeslot.time);
                const elem = document.createElement("button");

                if (timeslot.open == "Closed") elem.setAttribute("class", "timeslot-closed");
                else elem.setAttribute("class", "timeslot")
                
                elem.setAttribute("id", timeslot.id);
                elem.appendChild(text);

                timeslotList.append(elem);

                elem.addEventListener("click", function() {
                    let details = document.getElementById("details");

                    details.style.display = "grid"

                    document.getElementById("slot-name").innerText = timeslot.name;
                    document.getElementById("slot-time").innerText = timeslot.time;

                    open = document.getElementById("slot-open");
                    open.innerText = timeslot.open;
                    
                    if (timeslot.open == "Closed") open.style.backgroundColor = "red";
                });
            });
        });
    });
}
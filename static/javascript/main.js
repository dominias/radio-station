document.addEventListener("DOMContentLoaded", function() {
    tempTimeslot = JSON.parse(timedata);
    timeslotData = tempTimeslot[0];

    listData = JSON.parse(listdata);

    let week = document.querySelector(".week-option");
    let next = document.querySelector(".next-week");
    let last = document.querySelector(".last-week");
    week.innerHTML = timeslotData.week;

    populate();

    next.addEventListener("click", function () {
        if (timeslotData.id != 3) {
            timeslotData = tempTimeslot[timeslotData.id];

            week.innerHTML = timeslotData.week;

            populate();
        }
    });
    
    last.addEventListener("click", function () {
        if (timeslotData.id != 1) {
            timeslotData = tempTimeslot[timeslotData.id - 2];

            week.innerHTML = timeslotData.week;

            populate();
        }
    });
});

function vis(id) {
    let button = document.getElementById(id);

    button.style.color = (button.style.color != "gray") ? "gray" : "#c2bcbc";

    let change = document.getElementById("weekdates");

    change.style.display = (change.style.display != "none") ? "none" : "grid";
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

                if (timeslot.taken) elem.setAttribute("class", "timeslot-closed");
                else elem.setAttribute("class", "timeslot")
                
                elem.appendChild(text);

                timeslotList.append(elem);

                elem.addEventListener("click", function() {
                    let details = document.getElementById("details");

                    details.style.display = "grid"

                    document.getElementById("slot-name").innerText = timeslot.name;
                    document.getElementById("slot-time").innerText = timeslot.time;

                    open = document.getElementById("slot-open");
                    open.innerText = (!timeslot.taken) ? "OPEN" : "TAKEN";
                    
                    open.style.backgroundColor = (!timeslot.taken) ? "#2B8768" : "red";
                    
                    let listButton = document.getElementById("slot-list");

                    if (timeslot.taken) {
                        listButton.style.visibility = "visible";
                        
                        list = listData.find(list => list.id == timeslot.list);
                        
                        listButton.innerText = list.name;

                        listButton.addEventListener("click", function() { window.location.href = "./list/single/" + list.name; });
                    }

                    else { listButton.style.visibility = "hidden"; }
                });
            });
        });
    });
}
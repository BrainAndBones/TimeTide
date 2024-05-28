const days = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saterday"];
var month = 4;
var names = ["Caleb", "Marcus", "Hellmund", "X"];
var months = ["January","February","March", "April", "May", "June", "July", "August", "September","October", "November", "December" ];
var monthLengths = [31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31];
function setFeB(){
    year = new Date().getFullYear();
    if(year % 4 == 0 && year % 100 != 0){
        monthLengths[1] = 29;
        console.log("February Changed");
    }
}
setFeB();
function getFirstDay(currentMonth){
//Change the first number for the month
    const dayOfWeek = new Date(new Date().getFullYear(), currentMonth, 1).getDay()
    //const dayName = days[dayOfWeek];
    return dayOfWeek;
}
function tableCreate() {
    var body = document.getElementsByTagName('body')[0];
    var tbl = document.createElement('table');
    tbl.style.width = '100%';
    tbl.style.height = '75px';
    tbl.style.textAlign = 'center';
    tbl.setAttribute('border', '1');

    var tbdy = document.createElement('tbody');

    //Title
    var title = document.createElement('caption');
    title.innerText = months[month];
    tbl.appendChild(title);

    //main table

    var date = -getFirstDay(month)-6;
    var tableMonth = month;
    for (var i = 0; i < 6; i++) {
        var tr = document.createElement('tr');
        for (var j = 0; j < 7; j++) {
            if(j < 6 && j > 0){
                var td = document.createElement('td');
                td.appendChild(document.createTextNode('\u0020'));
                tr.appendChild(td);
                if (i == 0) {
                    td.innerText = days[j]; 
                } else {
                    if(date > monthLengths[tableMonth]){
                        date = 1;
                        tableMonth++;
                    }
                    if(date < 1){
                        date = tableMonth > 0 ? date + monthLengths[tableMonth-1] : date + monthLengths[tableMonth+11];
                        tableMonth = tableMonth > 0 ? tableMonth-1: tableMonth+11;
                    }
                    td.innerText = date; 

                    var drop = document.createElement('select');
                    drop.id = `dropDown${tableMonth}${date}`;

                    var boundHandler = saveSchedule.bind(null, date, tableMonth);
                    drop.addEventListener("change", boundHandler);

                    for(var x = 0; x < names.length; x++){
                        var opt = document.createElement("option");
                        opt.value = x;
                        opt.textContent = names[x];
                        if(x == getSchedule(date, tableMonth)){
                            opt.selected = true;
                        }
                        drop.appendChild(opt)
                    }
                    td.appendChild(drop);
                }
            }date++;  
        }
        tbdy.appendChild(tr);
    }
    tbl.appendChild(tbdy);
    body.appendChild(tbl);
}
function getValue(date, tableMonth) {
    const element = document.getElementById(`dropDown${tableMonth}${date}`);
    const value = element.value;
    return value;
}
function saveSchedule(day, givenMonth){
    try{
        localStorage.setItem(`${months[givenMonth]}scheduleName${day}`, getValue(day, givenMonth));
        console.log("Saved");
    }
    catch(err){
        document.write("Local Storage Error, You are out of luck");
	}
}
function getSchedule(day, givenMonth){
	try{
	    return localStorage.getItem(`${months[givenMonth]}scheduleName${day}`);
	}
	catch(err){
        document.write("Local Storage Error, You are out of luck");
    }
}
tableCreate();

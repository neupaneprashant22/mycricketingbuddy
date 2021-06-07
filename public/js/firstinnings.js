var cookies = document.cookie.split("data=");
var myobjstring = cookies[1];
var myobj = JSON.parse(myobjstring);
var team1 = myobj.team1;
var team2 = myobj.team2;
var toss = myobj.toss;
var maxovers = myobj.overs;
var maxwickets = myobj.wickets;
var decide = myobj.decide;
var totalruns = 0;
var totalwickets = 0;
var totalBalls = 0;
var runs_over = 0;
var isstart = false;
var isextra = false;

//batsman variables
var batsman_number = 1;
var overs = 0.0;
var batsman = [];
var ball_faced = [];
var runs_scored = [];
var isout = [];
var oncrease = [1, 2];
for (var i = 1; i <= 11; i += 1) {
  isout[i] = false;
}
var onstrike = 1;
var batsman_table = document.querySelector(".first-innings-table-batsman");

//bowler vairables
bowler_number = 1;
bowler_name = [];
bowler_overs = [];
bowler_balls = [];
bowler_maiden = [];
bowler_wickets = [];
bowler_runs = [];
current_bowler = 1;
var bowler_table = document.querySelector(".first-innings-table-bowler");

if (toss == "team1") {
  toss = team1;
} else if (toss == "team2") {
  toss = team2;
}
var decided = myobj.decided;
document.getElementById("match-of").innerHTML =
  "Match: " + team1 + " vs " + team2;
document.getElementById("toss").innerHTML +=
  "Toss: " + toss + " won the toss and decided to " + decide + " first.";

//taking input the name of the first two batsman
batsman[1] = prompt("Enter the name of bastman no." + batsman_number);
add_batsman();
batsman_number += 1;
batsman[2] = prompt("Enter the name of bastman no." + batsman_number);
add_batsman();
bowler_name[1] = prompt("Enter the name of the first bowler");
add_bowler();

//function for adding batsman row
function add_batsman() {
  runs_scored[batsman_number] = 0;
  ball_faced[batsman_number] = 0;
  //creating table elements
  let tabr,
    td = [];
  tabr = document.createElement("tr");
  td[0] = document.createElement("td");
  td[1] = document.createElement("td");
  td[2] = document.createElement("td");
  td[3] = document.createElement("td");
  td[4] = document.createElement("td");
  td[5] = document.createElement("td");

  tabr.setAttribute("id", "batsmanrow-" + batsman_number);
  td[0].setAttribute("id", "sn" + batsman_number);
  td[1].setAttribute("id", "btnam" + batsman_number);
  td[2].setAttribute("id", "btrun" + batsman_number);
  td[3].setAttribute("id", "btbf" + batsman_number);
  td[4].setAttribute("id", "btsr" + batsman_number);
  td[5].setAttribute("id", "status" + batsman_number);

  td[0].textContent = batsman_number;
  td[1].textContent = batsman[batsman_number];
  td[2].textContent = runs_scored[batsman_number];
  td[3].textContent = ball_faced[batsman_number];
  td[4].textContent =
    Number(runs_scored[batsman_number]) / Number(ball_faced[batsman_number]);
  td[5].textContent = "Not Out";

  batsman_table.appendChild(tabr);

  var tablerow1 = document.querySelector("#batsmanrow-" + batsman_number);
  tablerow1.appendChild(td[0]);
  tablerow1.appendChild(td[1]);
  tablerow1.appendChild(td[2]);
  tablerow1.appendChild(td[3]);
  tablerow1.appendChild(td[4]);
  tablerow1.appendChild(td[5]);

  // showUpdated();
}

function add_bowler() {
  bowler_overs[bowler_number] = 0.0;
  bowler_maiden[bowler_number] = 0;
  bowler_wickets[bowler_number] = 0;
  bowler_runs[bowler_number] = 0;
  bowler_balls[bowler_number] = 0;

  //creating table elements
  let tabr,
    td = [];
  tabr = document.createElement("tr");
  td[0] = document.createElement("td");
  td[1] = document.createElement("td");
  td[4] = document.createElement("td");
  td[3] = document.createElement("td");
  td[2] = document.createElement("td");
  td[5] = document.createElement("td");

  tabr.setAttribute("id", "bowlerrow-" + bowler_number);
  td[0].setAttribute("id", "sn" + bowler_number);
  td[1].setAttribute("id", "bwnam" + bowler_number);
  td[4].setAttribute("id", "bwwkt" + bowler_number);
  td[3].setAttribute("id", "bwmaiden" + bowler_number);
  td[2].setAttribute("id", "bwover" + bowler_number);
  td[5].setAttribute("id", "bweco" + bowler_number);

  td[0].textContent = bowler_number;
  td[1].textContent = bowler_name[bowler_number];
  td[4].textContent = bowler_wickets[bowler_number];
  td[3].textContent = bowler_maiden[bowler_number];
  td[2].textContent = bowler_overs[bowler_number];
  td[5].textContent = bowler_runs[bowler_number] / bowler_balls[bowler_number];

  bowler_table.appendChild(tabr);
  var tablerow2 = document.querySelector("#bowlerrow-" + bowler_number);

  tablerow2.appendChild(td[0]);
  tablerow2.appendChild(td[1]);
  tablerow2.appendChild(td[4]);
  tablerow2.appendChild(td[3]);
  tablerow2.appendChild(td[2]);
  tablerow2.appendChild(td[5]);

  // showUpdated();
}
var norun = document.querySelector("#norun");
var one = document.querySelector("#onerun");
var two = document.querySelector("#tworuns");
var three = document.querySelector("#threeruns");
var four = document.querySelector("#fourruns");
var five = document.querySelector("#fiveruns");
var six = document.querySelector("#sixruns");
var wide = document.querySelector("#wide");
var noball = document.querySelector("#noball");
var out = document.querySelector("#wicket");
var startsecond = document.querySelector("#startsecond-btn");

startsecond.addEventListener("click", function (e) {
  event.stopPropagation();
  event.preventDefault();
  myobj.target = totalruns + 1;
  myobjstring = JSON.stringify(myobj);
  console.log(myobjstring);
  document.cookie = "data=" + myobjstring;
  window.location.href = "./secondinnings";
});

norun.addEventListener("click", function (e) {
  event.stopPropagation();
  event.preventDefault();
  if (isstart != true) {
    isextra = false;
    ball_faced[onstrike] += 1;
    bowler_overs[current_bowler] += 0.1;
    overs += 0.1;
    totalBalls += 1;
    bowler_balls[current_bowler] += 1;
    showUpdated();
  } else {
    alert("First innings has ended");
  }
});

one.addEventListener("click", function (e) {
  event.stopPropagation();
  event.preventDefault();
  if (isstart != true) {
    isextra = false;
    ball_faced[onstrike] += 1;
    runs_scored[onstrike] += 1;
    bowler_overs[current_bowler] += 0.1;
    bowler_runs[current_bowler] += 1;
    totalruns += 1;
    overs += 0.1;
    totalBalls += 1;
    runs_over += 1;
    bowler_balls[current_bowler] += 1;
    showUpdated();
    if (onstrike == oncrease[0]) {
      onstrike = oncrease[1];
    } else {
      onstrike = oncrease[0];
    }
    checkStatus();
  } else {
    alert("First innings has ended");
  }
});

three.addEventListener("click", function (e) {
  if (isstart != true) {
    isextra = false;
    event.stopPropagation();
    event.preventDefault();
    ball_faced[onstrike] += 1;
    runs_scored[onstrike] += 3;
    totalruns += 3;
    bowler_runs[current_bowler] += 3;
    bowler_overs[current_bowler] += 0.1;
    overs += 0.1;
    totalBalls += 1;
    runs_over += 3;
    bowler_balls[current_bowler] += 1;
    showUpdated();
    if (onstrike == oncrease[0]) {
      onstrike = oncrease[1];
    } else {
      onstrike = oncrease[0];
    }
    checkStatus();
  } else {
    alert("First innings has ended");
  }
});
five.addEventListener("click", function (e) {
  isextra = false;
  event.stopPropagation();
  event.preventDefault();
  if (isstart != true) {
    ball_faced[onstrike] += 1;
    runs_scored[onstrike] += 5;
    bowler_overs[current_bowler] += 0.1;
    bowler_runs[current_bowler] += 5;
    totalruns += 5;
    overs += 0.1;
    totalBalls += 1;
    runs_over += 5;
    bowler_balls[current_bowler] += 1;
    showUpdated();
    if (onstrike == oncrease[0]) {
      onstrike = oncrease[1];
    } else {
      onstrike = oncrease[0];
    }
    checkStatus();
  } else {
    alert("First innings has ended");
  }
});
two.addEventListener("click", function (e) {
  event.stopPropagation();
  event.preventDefault();
  if (isstart != true) {
    isextra = false;
    ball_faced[onstrike] += 1;
    runs_scored[onstrike] += 2;
    bowler_overs[current_bowler] += 0.1;
    bowler_runs[current_bowler] += 2;
    totalruns += 2;
    overs += 0.1;
    totalBalls += 1;
    runs_over += 2;
    bowler_balls[current_bowler] += 1;
    showUpdated();
    checkStatus();
  } else {
    alert("First innings has ended");
  }
});
four.addEventListener("click", function (e) {
  event.stopPropagation();
  event.preventDefault();
  if (isstart != true) {
    isextra = false;
    ball_faced[onstrike] += 1;
    runs_scored[onstrike] += 4;
    bowler_overs[current_bowler] += 0.1;
    bowler_runs[current_bowler] += 4;
    totalruns += 4;
    overs += 0.1;
    totalBalls += 1;
    runs_over += 4;
    bowler_balls[current_bowler] += 1;
    showUpdated();
    checkStatus();
  } else {
    alert("First innings has ended");
  }
});
six.addEventListener("click", function (e) {
  event.stopPropagation();
  event.preventDefault();
  if (isstart != true) {
    isextra = false;
    ball_faced[onstrike] += 1;
    runs_scored[onstrike] += 2;
    bowler_overs[current_bowler] += 0.1;
    bowler_runs[current_bowler] += 6;
    totalruns += 6;
    overs += 0.1;
    totalBalls += 1;
    runs_over += 6;
    bowler_balls[current_bowler] += 1;
    showUpdated();
    checkStatus();
  } else {
    alert("First innings has ended");
  }
});
wide.addEventListener("click", function (e) {
  event.stopPropagation();
  event.preventDefault();
  if (isstart != true) {
    isextra = true;
    bowler_runs[current_bowler] += 1;
    totalruns += 1;
    runs_over += 1;
    showUpdated();
    checkStatus();
  } else {
    alert("First innings has ended");
  }
});
noball.addEventListener("click", function (e) {
  event.stopPropagation();
  event.preventDefault();
  if (isstart != true) {
    isextra = true;
    bowler_runs[current_bowler] += 1;
    ball_faced[onstrike] += 1;
    totalruns += 1;
    runs_over += 1;
    var noball_runs = 0;
    while (true) {
      noball_runs = parseInt(prompt("How much run was scored in the no ball?"));
      switch (noball_runs) {
        case 0:
          break;
        case 1:
          runs_scored[onstrike]++;
          showUpdated();
          if (onstrike == oncrease[0]) {
            onstrike = oncrease[1];
          } else {
            onstrike = oncrease[0];
          }
          bowler_runs[current_bowler] += 1;
          totalruns += 1;
          runs_over += 1;
          break;
        case 2:
          runs_scored[onstrike] += 2;
          bowler_runs[current_bowler] += 2;
          totalruns += 2;
          runs_over += 2;
          break;
        case 3:
          runs_scored[onstrike] += 3;
          showUpdated();
          if (onstrike == oncrease[0]) {
            onstrike = oncrease[1];
          } else {
            onstrike = oncrease[0];
          }
          bowler_runs[current_bowler] += 3;
          totalruns += 3;
          runs_over += 3;
          break;
        case 4:
          runs_scored[onstrike] += 4;
          bowler_runs[current_bowler] += 4;
          totalruns += 4;
          runs_over += 4;
          break;
        case 5:
          runs_scored[onstrike] += 5;
          showUpdated();
          if (onstrike == oncrease[0]) {
            onstrike = oncrease[1];
          } else {
            onstrike = oncrease[0];
          }
          bowler_runs[current_bowler] += 5;
          totalruns += 5;
          runs_over += 5;
          break;
        case 6:
          runs_scored[onstrike] += 6;
          bowler_runs[current_bowler] += 6;
          totalruns += 6;
          runs_over += 6;
          break;
        default:
          alert("Invalid number");
      }
      if (noball_runs >= 0 && noball_runs <= 6) {
        break;
      }
    }
    showUpdated();
    checkStatus();
  } else {
    alert("First innings has ended");
  }
});
out.addEventListener("click", function (e) {
  if (isstart != true) {
    event.stopPropagation();
    event.preventDefault();
    bowler_wickets[bowler_number] += 1;
    totalwickets += 1;
    bowler_overs[current_bowler] += 0.1;
    ball_faced[onstrike] += 1;
    isout[batsman_number] = true;
    batsman_number += 1;
    document.getElementById("status" + onstrike).innerHTML = "Out";
    overs += 0.1;
    if (onstrike == oncrease[0]) {
      oncrease[0] = oncrease[1];
      oncrease[1] = batsman_number;
    } else {
      oncrease[1] = batsman_number;
    }
    onstrike = batsman_number;
    batsman[batsman_number] = prompt(
      "Enter the name of bastman no." + batsman_number
    );
    add_batsman();
    showUpdated();
    checkStatus();
  } else {
    alert("First innings has ended");
  }
});

function showUpdated() {
  //checks if the over has ended
  if (overs >= 0.1 && bowler_overs[current_bowler] >= 0.1) {
    // bowler_overs+=0.1;
    if (
      parseFloat(
        Math.abs(
          bowler_overs[current_bowler] -
            Math.floor(bowler_overs[current_bowler])
        ).toFixed(1)
      ) == 0.6
    ) {
      bowler_overs[current_bowler] =
        Math.floor(bowler_overs[current_bowler]) + 1;
      checkMaiden();
    }
    overs = checkOvers(overs);
    overs = parseFloat(overs.toFixed(1));
    bowler_overs[current_bowler] = parseFloat(
      bowler_overs[current_bowler].toFixed(2)
    );
  }

  //batsman document manipulation
  document.getElementById("btrun" + onstrike).innerHTML = runs_scored[onstrike];
  document.getElementById("btbf" + onstrike).innerHTML = ball_faced[onstrike];
  document.getElementById("btsr" + onstrike).innerHTML = (
    Number(runs_scored[onstrike] / Number(ball_faced[onstrike])) * 100
  ).toFixed(2);

  //total areas's document manipulation
  document.getElementById("total-runs").innerHTML =
    "Total runs: " + totalruns + "/" + totalwickets;
  document.getElementById("total-overs").innerHTML = "Overs:" + overs;
  document.getElementById("total-runrate").innerHTML =
    "Runrate:" + ((totalruns / totalBalls) * 6).toFixed(2);

  //bowler document manipulation
  document.getElementById("bwwkt" + current_bowler).innerHTML =
    bowler_wickets[current_bowler];
  document.getElementById("bwmaiden" + current_bowler).innerHTML =
    bowler_maiden[current_bowler];
  document.getElementById("bwover" + current_bowler).innerHTML =
    bowler_overs[current_bowler];
  document.getElementById("bweco" + current_bowler).innerHTML = (
    (bowler_runs[current_bowler] / bowler_balls[current_bowler]) *
    6
  ).toFixed(2);
  if (
    parseFloat(overs).toFixed(1) == parseFloat(maxovers).toFixed(1) ||
    maxwickets == totalwickets
  ) {
    document.getElementById("startsecond-div").style.display = "block";
    document.getElementById("startsecond-h5").innerHTML += totalruns + 1;
    isstart = true;
  }
  if (overs - parseInt(overs) == 0 && isstart != true && isextra != true) {
    if (onstrike == oncrease[0]) {
      onstrike = oncrease[1];
    } else {
      onstrike = oncrease[0];
    }
    chooseBowler();
  }
}

function checkStatus() {
  document.getElementById("status" + onstrike).innerHTML = "On Strike";
  if (onstrike == oncrease[0]) {
    document.getElementById("status" + oncrease[1]).innerHTML = "On Runner";
  } else {
    document.getElementById("status" + oncrease[0]).innerHTML = "On Runner";
  }
}
function checkOvers(newover) {
  var int_over = Math.floor(newover);
  if (parseFloat(Math.abs(newover - int_over).toFixed(1)) == 0.6) {
    return int_over + 1;
  }
  return newover;
}

function chooseBowler() {
  var checkBowler = parseInt(
    prompt("Enter the S.N of the bowler(if new type 0)")
  );
  if (checkBowler == 0) {
    bowler_number++;
    bowler_name[bowler_number] = prompt("Enter the name of the new bowler");
    add_bowler();
    current_bowler = bowler_number;
  } else if (checkBowler > 0 && checkBowler <= bowler_number) {
    current_bowler = checkBowler;
  } else {
    alert("Invalid input!");
    chooseBowler();
  }
}

function checkMaiden() {
  if (runs_over == 0) {
    bowler_maiden[current_bowler] += 1;
  }
  runs_over = 0;
}

var cookies = document.cookie.split("data=");
var myobjstring = cookies[1];
var myobj = JSON.parse(myobjstring);
console.log(myobj);
var team1 = myobj.team1;
var team2 = myobj.team2;
var toss = myobj.toss;
var decide = myobj.decide;
var winner = myobj.winner;
var balls = myobj.balls_remaning;
var runs = myobj.runs_remaning;
var wickets = myobj.wickets_remaning;
console.log(winner);
var headwinner = document.getElementById("main-result");
var matchbetween = document.getElementById("match-between");
matchbetween.innerHTML = "Match between " + team1 + " vs " + team2;
if (winner == 0) {
  headwinner.innerHTML = "Draw!!";
  console.log("Entered");
} else if (
  (toss == "team1" && decide == "bat") ||
  (toss == "team2" && decide == "bowl")
) {
  console.log("Entered");
  if (winner == 1) {
    headwinner.innerHTML = team1 + " won by " + runs + " runs";
    console.log(winner);
  } else {
    headwinner.innerHTML =
      team2 +
      " won by " +
      wickets +
      " wickets with " +
      balls +
      " balls remaning!!";
    console.log(winner);
  }
} else if (
  (toss == "team2" && decide == "bat") ||
  (toss == "team1" && decide == "bowl")
) {
  console.log("Entered");
  if (winner == 1) {
    headwinner.innerHTML = team2 + " won by " + runs + "runs";
    console.log(winner);
  } else {
    headwinner.innerHTML =
      team1 +
      " won by " +
      wickets +
      " wickets with " +
      balls +
      " balls remaning!!";
    console.log(winner);
  }
}
$(function () {
  var numberOfStars = 200;

  for (var i = 0; i < numberOfStars; i++) {
    $(".congrats").append('<div class="blob fa fa-star ' + i + '"></div>');
  }

  animateText();

  animateBlobs();
});

$(".congrats").click(function () {
  reset();

  animateText();

  animateBlobs();
});

function reset() {
  $.each($(".blob"), function (i) {
    TweenMax.set($(this), { x: 0, y: 0, opacity: 1 });
  });

  TweenMax.set($("h1"), { scale: 1, opacity: 1, rotation: 0 });
}

function animateText() {
  TweenMax.from($("h1"), 0.8, {
    scale: 0.4,
    opacity: 0,
    rotation: 15,
    ease: Back.easeOut.config(4),
  });
}

function animateBlobs() {
  var xSeed = _.random(350, 380);
  var ySeed = _.random(120, 170);

  $.each($(".blob"), function (i) {
    var $blob = $(this);
    var speed = _.random(1, 5);
    var rotation = _.random(5, 100);
    var scale = _.random(0.8, 1.5);
    var x = _.random(-xSeed, xSeed);
    var y = _.random(-ySeed, ySeed);

    TweenMax.to($blob, speed, {
      x: x,
      y: y,
      ease: Power1.easeOut,
      opacity: 0,
      rotation: rotation,
      scale: scale,
      onStartParams: [$blob],
      onStart: function ($element) {
        $element.css("display", "block");
      },
      onCompleteParams: [$blob],
      onComplete: function ($element) {
        $element.css("display", "none");
      },
    });
  });
}

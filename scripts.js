var main = document.getElementById("main");
var dinosaur = document.getElementById("dinosaur");
var zdj = document.querySelector("#dinosaur img");
var scorediv = document.getElementById("score");
var highscorediv = document.getElementById("high-score");
var cactusspeed = 5000;
var safetime = 1000;
var isInJump = 0;
var obstaclechance = 1000;
var score = 0;
var highscore = 0;
var jumpspeed = 1000;
var interval1;
var interval2;
var interval3;
var timeout;
document.addEventListener("keypress",gameStart);

function gameStart(button) {
	if (button.code != "Space")
		return;

	interval1 = setInterval(dinosaurMove, 100);
	interval2 = setInterval(deadCheck, 1);
	interval3 = setInterval(gamespeed, 150);
	setTimeout(obstacle, 10);
	document.addEventListener("keypress", jump);
	document.removeEventListener("keypress", gameStart);
}

function jump(button) {
	if (button.code != "Space" || isInJump == 1)
		return;

	dinosaur.classList.add("injump");
	setTimeout(removeJump,jumpspeed);
	isInJump = 1;
}

function removeJump() {
	dinosaur.classList.remove("injump"); 
	isInJump = 0;
}

function dinosaurMove() {
	if (isInJump == 1)
		zdj.src = "photos/dinosaur3.png";
	else {
		if (zdj.src.search("dinosaur1.png") == -1)
			zdj.src = "photos/dinosaur1.png";
		else
			zdj.src = "photos/dinosaur2.png";
	}
}

function deadCheck() {
	for (var i = 0; i < document.getElementsByClassName("cactus").length; i++) {
		var dinosaurBot = parseInt(window.getComputedStyle(dinosaur).getPropertyValue("bottom"));
		var cactusLeft = parseInt(window.getComputedStyle(document.getElementsByClassName("cactus")[i]).getPropertyValue("left"));

		var cactusType = 5;
		if (document.querySelectorAll(".cactus img")[i].src.search("1kaktus.png") != -1)
			cactusType = 1;
		else if (document.querySelectorAll(".cactus img")[i].src.search("2kaktus.png") != -1)
			cactusType = 2;
		else if (document.querySelectorAll(".cactus img")[i].src.search("3kaktus.png") != -1)
			cactusType = 3;
		else
			cactusType = 4;

		if((cactusType == 1 && dinosaurBot < 38 && cactusLeft > -5 && cactusLeft < 44) ||
			(cactusType == 2 && dinosaurBot < 25 && cactusLeft > -14 && cactusLeft < 44) ||
			(cactusType == 3 && dinosaurBot < 25 && cactusLeft > -31 && cactusLeft < 44) ||
			(cactusType == 4 && dinosaurBot < 39 && cactusLeft > -55 && cactusLeft < 44)) {

			alert("Game over");
			clearTimeout(timeout);
			clearInterval(interval1);
			clearInterval(interval2);
			clearInterval(interval3);
			zdj.src = "photos/dinosaur3.png";
			cactusspeed = 5000;
			safetime = 1000;
			isInJump = 0;
			obstaclechance = 1000;
			jumpspeed = 1000;
			document.removeEventListener("keypress", jump);
			document.addEventListener("keypress", gameStart);
			if (highscore < score)
				highscore = score;
			score = 0;
			highscorediv.textContent = highscore;
		}
	}
}

function gamespeed() {
	obstaclechance -= 2;
	cactusspeed -= 10;
	safetime -= 1;
	jumpspeed--;
	document.documentElement.style.setProperty('--animation-time', jumpspeed + "ms");
	score++;
	scorediv.textContent = score;
}

function obstacle() {
	var chance = Math.random() * obstaclechance;

	if (chance < 10) {
		var div = document.createElement("div");
		div.classList.add("cactus");
		div.style.animation = "cactusMove "+cactusspeed+"ms linear 0s 1 normal";
		var img = document.createElement("img");

		if (chance < 4)
			img.src = "photos/1kaktus.png";
		else if (chance < 7)
			img.src = "photos/2kaktus.png";
		else if (chance < 9)
			img.src = "photos/3kaktus.png";
		else
			img.src = "photos/4kaktus.png";

		div.appendChild(img);
		main.appendChild(div);
		timeout = setTimeout(obstacle, safetime);
		setTimeout(destroyobstacle, cactusspeed);
	}
	else
		timeout = setTimeout(obstacle, 10); 
}

function destroyobstacle () {
	var cactus = document.getElementsByClassName("cactus")[0];
	cactus.parentNode.removeChild(cactus);
}
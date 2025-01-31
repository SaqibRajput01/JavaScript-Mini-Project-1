let userSeq = [];
let gameSeq = [];
let btns = ["yellow", "red", "purple", "green"];
let level = 0;
let started = false;
let h2 = document.querySelector("h2");

// Start the game
document.addEventListener("keypress", function () {
    if (started === false) {
        started = true;
        console.log("Game Started");
    }
    levelUp();
});

//Flash the game button
function gameFlash(btn) {
    btn.classList.add("gameFlash");
    setTimeout(function () {
        btn.classList.remove("gameFlash");
    }, 350);
}

//Flash the user button
function userFlash(btn) {
    btn.classList.add("userFlash");
    setTimeout(function () {
        btn.classList.remove("userFlash");
    }, 350);
}

//Level up and random btn choose
function levelUp() {
    userSeq = [];
    level++;
    h2.innerText = "Level " + level;

    //random btn choose
    let randomIdx = Math.floor(Math.random() * 4);
    let randomColor = btns[randomIdx];
    let rdnbtn = document.querySelector(`.${randomColor}`);
    gameSeq.push(randomColor);
    console.log(gameSeq);
    gameFlash(rdnbtn);
}

//Match the sequence
function matchSeq(idx) {
    // console.log("level: " + level);
    if (userSeq[idx] === gameSeq[idx]) {
        if (userSeq.length === gameSeq.length) {
            setTimeout(levelUp(), 950);
        }
        if (level === 10) {
            h2.innerHTML = `Congratulations! You have won the game. </br> Press any key to restart`;
            reset();
        }
    }
    else {
        console.log("Wrong, Try again!");
        h2.innerHTML = `Game Over!. Your Score was <b>${level}</b>. </br> Press any key to restart`;
        document.querySelector("body").classList.add("gameOver");
        setTimeout(function () {
            document.querySelector("body").classList.remove("gameOver");
        }, 200);
        reset();
    }
}

//user input
function btnPressed() {
    let btn = this;
    userFlash(btn);
    userColor = btn.getAttribute("id");
    userSeq.push(userColor);
    matchSeq(userSeq.length - 1);
}

//Add event listener to all buttons
let allBtns = document.querySelectorAll(".button");
for (btn of allBtns) {
    btn.addEventListener("click", btnPressed);
}

//Reset the game
function reset() {
    level = 0;
    gameSeq = [];
    userSeq = [];
    started = false;
}
const emoji = ["🐰", "🦁", "🐿", "🐨", "🐟", "🦄",
               "🐰", "🦁", "🐿", "🐨", "🐟", "🦄"];

var shuffled = shuffle(emoji);

var opened = {
    1: {opened: false, emoji: shuffled[0]},
    2: {opened: false, emoji: shuffled[1]},
    3: {opened: false, emoji: shuffled[2]},
    4: {opened: false, emoji: shuffled[3]},
    5: {opened: false, emoji: shuffled[4]},
    6: {opened: false, emoji: shuffled[5]},
    7: {opened: false, emoji: shuffled[6]},
    8: {opened: false, emoji: shuffled[7]},
    9: {opened: false, emoji: shuffled[8]},
    10: {opened: false, emoji: shuffled[9]},
    11: {opened: false, emoji: shuffled[10]},
    12: {opened: false, emoji: shuffled[11]}
};

var stack = [];
var interval;
var gameStarted = false;

function shuffle(a) {
    for (let i = a.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [a[i], a[j]] = [a[j], a[i]];
    }
    return a;
}

function putContent(array) {
    for (let index = 0; index < array.length; index++) {
        document.getElementById((index + 1).toString()).childNodes[3].innerHTML =
            array[index];
    }
}

function updateCard(id) {
    if (document.getElementById(id).disabled === true){
        return;
    }

    document.getElementById(id).disabled = true;

    if (!gameStarted) {
        interval = setInterval(function () {
            update(opened);
        }, 1000);
        gameStarted = true;
    }
    toggle(id);
    if (stack.length === 2) {
        document.getElementById(stack[0]).disabled = false;
        document.getElementById(stack[1]).disabled = false;
        document.getElementById(stack[1]).childNodes[3].style.background = "white";
        document.getElementById(stack[0]).childNodes[3].style.background = "white";
        toggle(stack.pop());
        toggle(stack.pop());
    }
    if (stack.length === 0) {
        stack.push(id);
        document.getElementById(id).childNodes[3].style.background = "white";
        return;
    }
    if (stack.length === 1) {
        if (opened[stack[0]].emoji === opened[id].emoji) {

            document.getElementById(id).childNodes[3].style.background = "#5AD66F";
            document.getElementById(stack[0]).childNodes[3].style.background = "#5AD66F";

            document.getElementById(id).disabled = true;
            document.getElementById(stack[0]).disabled = true;
            stack.pop();
        }
        if (opened[stack[0]].emoji !== opened[id].emoji) {
            stack.push(id);
            document.getElementById(stack[1]).childNodes[3].style.background = "#F44336";
            document.getElementById(stack[0]).childNodes[3].style.background = "#F44336";
        }
    }
}

function toggle(id) {
    document.getElementById(id).classList.toggle("rotate");
    opened[id]["opened"] = !opened[id]["opened"];
}

function update(opened) {
    var victoryScore = 0;
    document.getElementById("time").innerHTML =
        parseInt(document.getElementById("time").innerHTML) - 1;
    for (let index = 0; index < 12; index++) {
        if (opened[index + 1].opened) {
            victoryScore++;
        }
    }
    if (victoryScore === 12) {
        document.getElementById("modal").style.display = "block";
        document.getElementById("message").innerHTML =
            "<span>W</span><span>i</span><span>n</span>";
        document.getElementById("text").innerHTML = "<span>Try again</span>";
        clearInterval(interval);
    }
    if (parseInt(document.getElementById("time").innerHTML) === 0) {
        if (victoryScore < 12) {
            document.getElementById("modal").style.display = "block";
            document.getElementById("message").innerHTML =
                "<span>L</span><span>o</span><span>s</span><span>e</span>";
            document.getElementById("text").innerHTML = "<span>Try again</span>";
            clearInterval(interval);
        }
    }
}

function startNewGame() {
    for (i = 0; i < 12; i += 1) {
        if (opened[i + 1].opened) {
            toggle(i + 1);
            document.getElementById(i + 1).childNodes[3].style.background = "white";
        }
    }
    document.getElementById("modal").style.display = "none";
    gameStarted = false;
    document.getElementById("time").innerHTML = 60;
    shuffled = shuffle(emoji);
    opened = {
        1: {opened: false, emoji: shuffled[0]},
        2: {opened: false, emoji: shuffled[1]},
        3: {opened: false, emoji: shuffled[2]},
        4: {opened: false, emoji: shuffled[3]},
        5: {opened: false, emoji: shuffled[4]},
        6: {opened: false, emoji: shuffled[5]},
        7: {opened: false, emoji: shuffled[6]},
        8: {opened: false, emoji: shuffled[7]},
        9: {opened: false, emoji: shuffled[8]},
        10: {opened: false, emoji: shuffled[9]},
        11: {opened: false, emoji: shuffled[10]},
        12: {opened: false, emoji: shuffled[11]}
    };
    stack = [];
    putContent(shuffled);
}

putContent(shuffled);
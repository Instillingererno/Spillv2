//Global variables
var playerHealth = 100;
var playerLevel = 70;
var playerChar;
var enemyChar1;
var currentXp = 100;
var playerXpPerLevel = 10 * (4 * playerLevel ^ 0.5 + 0.02 * playerLevel ^ 2 + 0.0001 * playerLevel ^ 3 + 1 - 0.15 * playerLevel);
var invOpen = true;
var queOpen = true;
var menOpen = false;
var postnr = 0;
var PlayerTab;

//Setting player health equal to playerHealth value and the appropriate level and xp
function body_onload() {
    LoadGame();
    document.getElementById("healthbar").value = playerHealth;
    document.getElementById("level-txt").innerHTML = "Level: " + playerLevel;
    document.getElementById("playerxp").value = currentXp;
    document.getElementById("xpperlevel").innerHTML = "XP for next level: " + playerXpPerLevel;
    createGameArea();
}
//function for loading game
function LoadGame() {
    try {
        PlayerTab = JSON.parse(localStorage.getItem("PlayerFile"));
        if(PlayerTab.Health)
            playerHealth = PlayerTab.Health;
    } catch (e) {
        PlayerTab = { //Name, Health, XP, Level
            Name: "Shit",
            Health: 100,
            XP: 0,
            Level: 1
        };
    }
}

//Button from menu to save current game status
function btnSaveGame_onclick() {
    menu_icon();
    PlayerTab.Health = playerHealth;
    PlayerTab.XP = currentXp;
    PlayerTab.Level = playerLevel;
    if (typeof Storage !== "undefined") {
        localStorage.setItem("PlayerFile", JSON.stringify(PlayerTab));
    } else {
        alert("The web browser you use do not suport saving of files. Please swich browser to be able to save the game");
    }
}

//Decrease player health
function takePlayerDamage() {
    playerHealth -= 10;
    document.getElementById("healthbar").value = playerHealth;
    playerDeath();
}

//Check for player death
function playerDeath() {
    if (playerHealth <= 0) {
        document.getElementById("diescreen").style.display = "inline-block";
        gameArea.stop();
    }
}

//Respawning
function btnRespawn() {
    document.getElementById("diescreen").style.display = "none";
    currentXp = 0;
    playerHealth = 100;
    gameArea.start();
    document.getElementById("healthbar").value = playerHealth;
    document.getElementById("playerxp").value = currentXp;
}

//Opening and closing iventory
function inventory_icon() {
    if (!invOpen) {
        document.getElementById("inventory").style.right = 0;
        invOpen = true;
    }
    else {
        document.getElementById("inventory").style.right = "-245px";
        invOpen = false;
    }
}

//Opening and closing quests
function quest_icon() {
    if (!queOpen) {
        document.getElementById("quest").style.top = 0;
        queOpen = true;
    }
    else {
        document.getElementById("quest").style.top = "-300px";
        queOpen = false;
    }
}

//Opening and closing the main menu
function menu_icon() {

    function menDisplayNone() {
        document.getElementById("pausescreen").style.display = "none";
        document.getElementById("main-menu").style.display = "none";
        document.getElementById("main-menu").style.top = "-1500px";
        gameArea.start();
    }
    function menDisplayFull() {
        document.getElementById("main-menu").style.top = 0;
    }

    if (!menOpen) {
        document.getElementById("main-menu").style.opacity = "1";
        document.getElementById("main-menu").style.display = "inline-block";
        document.getElementById("pausescreen").style.display = "inline-block";
        gameArea.stop();
        setTimeout(menDisplayFull, 100);
        menOpen = true;
    }
    else {
        document.getElementById("main-menu").style.opacity = "0";
        setTimeout(menDisplayNone, 400);
        menOpen = false;
    }
}

//Checks for keypresses
window.onkeyup = function (event) {
    if (event.keyCode === 66) {
        inventory_icon();
    }
    if (event.keyCode === 76) {
        quest_icon();
    }
    if (event.keyCode === 27) {
        menu_icon();
    }
};

//WIP player level
function levelUp() {
    if (playerLevel >= 100) {
        return false;
    }
    if (currentXp >= playerXpPerLevel) {
        playerLevel++;
        document.getElementById("level-txt").innerHTML = "Level: " + playerLevel;
        currentXp -= playerXpPerLevel;
        document.getElementById("playerxp").value = currentXp;
    }
}

//WIP gamearea with object
function createGameArea() {
    gameArea.start();
    playerChar = new playerCharModel(20, 20, "red", 400, 400);
    enemyChar1 = new enemy1(20, 20, "orange", 200, 400);
}

//Creates game object (player) and places it in gamearea
function playerCharModel(width, height, color, x, y) {
    this.width = width;
    this.height = height;
    this.x = x;
    this.y = y;
    this.speedX = 0;
    this.speedY = 0;
    this.update = function () {
        ctx = gameArea.context;
        ctx.fillStyle = color;
        ctx.fillRect(this.x, this.y, this.width, this.height);
    };

//Calculates the directional movement and updates position. Calls edge check
    this.newPos = function () {
        this.x += this.speedX;
        this.y += this.speedY;
        this.hitEdges();
    };

//Edge of screen check
    this.hitEdges = function () {
        var top = gameArea.canvas.height - gameArea.canvas.height;
        var bottom = gameArea.canvas.height - this.height;
        var right = gameArea.canvas.width - this.width;
        var left = gameArea.canvas.width - gameArea.canvas.width;
        if (this.y < top) {
            this.y = top;
        }
        if (this.y > bottom) {
            this.y = bottom;
        }
        if (this.x > right) {
            this.x = right;
        }
        if (this.x < left) {
            this.x = left;
        }
    };
}

//Creates game object (enemy) and places it in gamearea
function enemy1(width, height, color, x, y) {
    this.width = width;
    this.height = height;
    this.x = x;
    this.y = y;
    this.update = function () {
        ctx = gameArea.context;
        ctx.fillStyle = color;
        ctx.fillRect(this.x, this.y, this.width, this.height);
    };
}

//The game area is created and started. (setting update frequency, eventlisteners for key input)
var gameArea = {
    canvas: document.createElement("canvas"),
    start: function () {
        this.context = this.canvas.getContext("2d");
        this.canvas.height = 500;
        this.canvas.width = 850;
        document.body.insertBefore(this.canvas, document.body.childNodes[0]);
        this.interval = setInterval(updateGameArea, 18);
        window.addEventListener('keydown', function (e) {
            gameArea.keys = gameArea.keys || [];
            gameArea.keys[e.keyCode] = e.type === "keydown";
        });
        window.addEventListener('keyup', function (e) {
            gameArea.keys[e.keyCode] = e.type === "keydown";
        });
    },

//Necessary to call for clearing prior position after position update
    clear: function () {
        this.context.clearRect(0, 0, this.canvas.width, this.canvas.height);
    },

//Stopping the game when called
    stop : function() {
        clearInterval(this.interval);
    }
};

//Clears area, updates position and moves object (player) to new position
function updateGameArea() {
    gameArea.clear();
    playerChar.speedX = 0;
    playerChar.speedY = 0;
    if (gameArea.keys && gameArea.keys[37]) { playerChar.speedX = -4; }
    if (gameArea.keys && gameArea.keys[65]) { playerChar.speedX = -4; }

    if (gameArea.keys && gameArea.keys[38]) { playerChar.speedY = -4; }
    if (gameArea.keys && gameArea.keys[87]) { playerChar.speedY = -4; }

    if (gameArea.keys && gameArea.keys[39]) { playerChar.speedX = 4; }
    if (gameArea.keys && gameArea.keys[68]) { playerChar.speedX = 4; }

    if (gameArea.keys && gameArea.keys[40]) { playerChar.speedY = 4; }
    if (gameArea.keys && gameArea.keys[83]) { playerChar.speedY = 4; }
    playerChar.newPos();
    playerChar.update();
    enemyChar1.update();
}
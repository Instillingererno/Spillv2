var playerHealth = 100;
var playerLevel = 1;
var playerXp = 500;
var invOpen = true;
var queOpen = true;
var menOpen = false;

/*Setting player health equal to playerHealth value and the appropriate level and xp*/
function body_onload() {
    document.getElementById("healthbar").value = playerHealth;
    document.getElementById("level-txt").innerHTML = "Level: " + playerLevel;
    document.getElementById("playerxp").value = playerXp;
    createGameArea();
}

/*Decrease player health*/
function btnHit() {
    playerHealth -= 10;
    document.getElementById("healthbar").value = playerHealth;
    playerDeath();
}

/*Kill player*/
function btnKill() {
    playerHealth = 0;
    document.getElementById("healthbar").value = playerHealth;
    playerDeath();
}

/*Check for player death*/
function playerDeath() {
    if (playerHealth <= 0) {
        document.getElementById("diescreen").style.display = "inline-block";
    }
}

function btnRespawn() {
    document.getElementById("diescreen").style.display = "none";
    playerHealth = 100;
    document.getElementById("healthbar").value = playerHealth;
    playerXp = 0;
    document.getElementById("playerxp").value = playerXp;

}

/*Opening and closing iventory*/
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
/*Opening and closing quests*/
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
/*Opening and closing the main menu*/
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

/*Checks for keypresses*/
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






/*WIP player xp*/
function playerXP() {
    playerXp = document.getElementById("playerxp").value;
    playerXp += 300;
    document.getElementById("playerxp").value = playerXp;
    levelUp();
}

/*WIP player level*/
function levelUp() {
    if (playerLevel >= 100) {
        return false;
    }
    if (playerXp >= 1000) {
        playerLevel++;
        document.getElementById("level-txt").innerHTML = "Level: " + playerLevel;
        playerXp -= 1000;
        document.getElementById("playerxp").value = playerXp;
    }
}





/*WIP gamearea with object*/
var playerChar;

function createGameArea() {
    gameArea.start();
    playerChar = new player(30, 15, "red", 0, 0);
}

function player(width, height, color, x, y) {
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
    this.newPos = function () {
        this.x += this.speedX;
        this.y += this.speedY;
    };
}

var gameArea = {
    canvas: document.createElement("canvas"),
    start: function () {
        this.context = this.canvas.getContext("2d");
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
    clear: function () {
        this.context.clearRect(0, 0, this.canvas.width, this.canvas.height);
    },
    stop : function() {
        clearInterval(this.interval);
    }
};

function updateGameArea() {
    gameArea.clear();
    playerChar.speedX = 0;
    playerChar.speedY = 0;
    if (gameArea.keys && gameArea.keys[37]) { playerChar.speedX = -4; }
    if (gameArea.keys && gameArea.keys[38]) { playerChar.speedY = -2; }
    if (gameArea.keys && gameArea.keys[39]) { playerChar.speedX = 4; }
    if (gameArea.keys && gameArea.keys[40]) { playerChar.speedY = 2; }
    playerChar.newPos();
    playerChar.update();
}
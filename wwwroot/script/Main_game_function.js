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
}

/*Opening and closing iventory*/
function inventory_icon() {
    if (!invOpen) {
        document.getElementById("inventory").style.right = "0px";
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
        document.getElementById("quest").style.top = "0px";
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
    }
    function menDisplayFull() {
        document.getElementById("main-menu").style.top = "0px";
    }

    if (!menOpen) {
        document.getElementById("main-menu").style.opacity = "1";
        document.getElementById("main-menu").style.display = "inline-block";
        document.getElementById("pausescreen").style.display = "inline-block";
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
    if (event.keyCode === 69) {
        inventory_icon();
    }
    if (event.keyCode === 81) {
        quest_icon();
    }
    if (event.keyCode === 77) {
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
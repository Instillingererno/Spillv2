var playerHealth = 100;
var playerLevel = 10;
var invOpen = true;
var queOpen = true;

/*Setting player health equal to playerHealth value*/
function body_onload() {
    document.getElementById("healthbar").value = playerHealth;
    document.getElementById("playerlevel").value = playerLevel;
    document.getElementById("level-txt").innerHTML += "Level: " + playerLevel;
}

/*Decrease player health*/
function btnHit() {
    playerHealth -= 5;
    document.getElementById("healthbar").value = playerHealth;
    playerDeath();
}

/*Kill player*/
function btnKill() {
    playerHealth -= 100;
    document.getElementById("healthbar").value = playerHealth;
    playerDeath();
}

/*Level up the player*/
function levelUp() {
    if (playerLevel >= 100) {
        return false;
    }
    else {
        playerLevel++;
        document.getElementById("level-txt").innerHTML = "Level: " + playerLevel;
    }
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
        document.getElementById("inventory").style.display = "inline-block";
        invOpen = true;
    }
    else {
        document.getElementById("inventory").style.display = "none";
        invOpen = false;
    }
}
window.onkeyup = function (x) {
    if (x.keyCode === 69) {
        inventory_icon;
    }
};
/*Opening and closing quests*/
function quest_icon() {
    if (!queOpen) {
        document.getElementById("quest").style.display = "inline-block";
        queOpen = true;
    }
    else {
        document.getElementById("quest").style.display = "none";
        queOpen = false;
    }
}
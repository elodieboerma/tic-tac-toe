// stores "x"s and "o"s
let gameboard = [
    "","","",
    "","","",
    "","","",
];


// player factory function
let player = function (symbol,name) {
    // have to return the marker as an object (not just the value) so the rest of the script can use it
    return {
        marker: symbol,
        name,
    }
}


function makeNewPlayers() {
    // takes player names
    const form = document.createElement("form");
    const fieldset = document.createElement("fieldset");
    const title = document.createElement("legend");
    title.textContent = "Enter player names below.";
    fieldset.append(title);
    // for player 1
    const label1 = document.createElement("label");
    label1.textContent = "Player 1's name (\"x\"):";
    label1.for = "name1";
    label1.id = "label1";
    const name1 = document.createElement("input");
    name1.type = "text";
    name1.id = "name1";
    name1.name = "name1";
    name1.required = true;
    name1.placeholder = "Player 1";
    name1.required = true;
    name1.autofocus = true;
    label1.append(name1);
    fieldset.append(label1);
    // for player 2
    const label2 = document.createElement("label");
    label2.textContent = "Player 2's name (\"o\"):";
    label2.for = "name2";
    label2.id = "label2";
    const name2 = document.createElement("input");
    name2.type = "text";
    name2.id = "name2";
    name2.name = "name2";
    name2.required = true;
    name2.placeholder = "Player 2";
    name2.required = true;
    label2.append(name2);
    fieldset.append(label2);
    // submit names
    const submitButton = document.createElement("button");
    submitButton.textContent = "OK";
    submitButton.type = "submit";
    submitButton.id = "submitButton";
    fieldset.append(submitButton);
    form.append(fieldset);
    document.body.appendChild(form);

    return {
        name1,
        name2,
    };
}


// game object - store flow of the game itself
let game = (function () {
    const {name1,name2} = makeNewPlayers();

    let container = document.getElementById("container");

    let turnColored = document.getElementById("color");
    turnColored.style.color = "white";
    const whoseTurn = document.getElementById("whoseTurn");
    const restartButton = document.getElementById("restartButton");

    let player1;
    let player2;

    const form = document.querySelector("form");
    form.addEventListener("submit", function(e) {
        e.preventDefault();

        player1 = player("x", name1.value);
        player2 = player("o", name2.value);

        turnColored.style.color = "black";
        whoseTurn.textContent = `${player1.name}`;

        form.remove();
    });

    container.addEventListener("click", function(e) {
        let box = e.target.id;
        let boxNumber = box.slice(3);
        addMarker(boxNumber);
    })

    restartButton.addEventListener("click", function() {
        location.reload();
    })

    function getPlayers() {
        return { player1, player2 };
    }
    return {
        getPlayers
    };
}) ();


function addMarker(place) {
    const { player1, player2 } = game.getPlayers();

    let whoseTurn = document.getElementById("whoseTurn");
    let marker;
    // prevents playing spots that are already taken and declares tie/winner when applicable
    if (gameboard[place] == "") {
        if (whoseTurn.textContent == player2.name) { 
            marker = player2.marker;
        }else{
            marker = player1.marker;
        }
        gameboard[place] = marker;
        let boxText = document.getElementById("box"+place.toString());
        boxText.textContent = marker;
        boxText.classList.add(marker);
        checkForWinner();
        changeWhoseTurn();
    }else{
        console.log("Spot taken! Try again!");
    }
}


function checkForWinner() {
    const {player1,player2} = game.getPlayers();

    let winnerMessage = document.createElement("div");
    document.body.appendChild(winnerMessage);

    /* winning possibilities */
    let letter;
    if (/*horizontal #1*/ (gameboard[0] == gameboard[1] && gameboard[1] == gameboard[2] && gameboard[0] != "") ||
        /*vertical #1*/ (gameboard[0] == gameboard[3] && gameboard[3] == gameboard[6] && gameboard[0] != "") ||
        /*diagonal #1*/ (gameboard[0] == gameboard[4] && gameboard[4] == gameboard[8] && gameboard[0] != "") ){
            letter = gameboard[0];
    }else if (/*horizontal #2 */ (gameboard[3] == gameboard[4] && gameboard[4] == gameboard[5] && gameboard[3] != "") ||
        /*vertical #2*/ (gameboard[1] == gameboard[4] && gameboard[4] == gameboard[7] && gameboard[1] != "") ||
        /*diagonal #2*/ (gameboard[2] == gameboard[4] && gameboard[4] == gameboard[6] && gameboard[2] != "") ){
            letter = gameboard[4];
    }else if (/*horizontal #3*/ (gameboard[6] == gameboard[7] && gameboard[7] == gameboard[8] && gameboard[6] != "") ||
        /*vertical #3*/ (gameboard[2] == gameboard[5] && gameboard[5] == gameboard[8] && gameboard[2] != "") ){
            letter = gameboard[8];
    }else{
        letter = "";
        // declare a tie if gameboard is full and there is no winner
        if (gameboard[0] != "" && gameboard[1] != "" && gameboard[2] != "" &&
            gameboard[3] != "" && gameboard[4] != "" && gameboard[5] != "" &&
            gameboard[6] != "" && gameboard[7] != "" && gameboard[8] != "" ){
                winnerMessage.id = "winnerMessage";
                winnerMessage.textContent = "Tie!";
        }
    }

    if (player1.marker.toString() == letter) {
        winnerMessage.id = "winnerMessage";
        winnerMessage.textContent = `Game over! ${player1.name} won!`;
    }else if (player2.marker.toString() == letter) {
        winnerMessage.id = "winnerMessage";
        winnerMessage.textContent = `Game over! ${player2.name} won!`;
    }
}


function changeWhoseTurn() {
    const {player1,player2} = game.getPlayers();
    let whoseTurn = document.getElementById("whoseTurn");

    if (whoseTurn.textContent == player1.name) {
            whoseTurn.textContent = player2.name;
    }else{
        whoseTurn.textContent = player1.name;
    }
}
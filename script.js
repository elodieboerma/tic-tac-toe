// as little global code as possible - use function factories as much as possible
    // wrap the factory inside an IIFE if only one instance of the function is needed so it can't be reused
// each little piece of functionality should be able to fit inside the gameboard, player, or game object
/* "build the house from the inside out" :
    6) decor - little details to make it look or feel nicer
        --include a button to start/restart the game
        --add a display element that shows the results when the game ends */


let gameboard = [
    "","","",
    "","","",
    "","","",
]; // stores "x"s and "o"s


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
    const caption = document.createElement("legend");
    fieldset.append(caption);
    // for player 1
    const label1 = document.createElement("label");
    label1.textContent = "Player 1's name (\"x\")";
    label1.for = "name1";
    const name1 = document.createElement("input");
    name1.type = "text";
    name1.id = "name1";
    name1.name = "name1";
    name1.placeholder = "Player 1";
    name1.required = true;
    name1.autofocus = true;
    label1.append(name1);
    fieldset.append(label1);
    // for player 2
    const label2 = document.createElement("label");
    label2.textContent = "Player 2's name (\"o\")";
    label2.for = "name2";
    const name2 = document.createElement("input");
    name2.type = "text";
    name2.id = "name2";
    name2.name = "name2";
    name2.placeholder = "Player 2";
    name2.required = true;
    label2.append(name2);
    fieldset.append(label2);
    // submit names
    const submitButton = document.createElement("button");
    submitButton.textContent = "OK";
    submitButton.type = "submit";
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
    const whoseTurn = document.getElementById("whoseTurn");

    let player1;
    let player2;

    const form = document.querySelector("form");
    form.addEventListener("submit", (e) => {
        e.preventDefault();

        player1 = player("x", name1.value);
        player2 = player("o", name2.value);

        whoseTurn.textContent = `${player1.name}`;
    });

    function getPlayers() {
        return { player1, player2 };
    }
    return {
        getPlayers
    };
}) ();


let gridResponse = (function respondToDom() {
    const box0 = document.getElementById("box0");
    const box1 = document.getElementById("box1");
    const box2 = document.getElementById("box2");
    const box3 = document.getElementById("box3");
    const box4 = document.getElementById("box4");
    const box5 = document.getElementById("box5");
    const box6 = document.getElementById("box6");
    const box7 = document.getElementById("box7");
    const box8 = document.getElementById("box8");
    box0.addEventListener("click", function() {
        addMarker(0);
    })
    box1.addEventListener("click", function() {
        addMarker(1);
    })
    box2.addEventListener("click", function() {
        addMarker(2);
    })
    box3.addEventListener("click", function() {
        addMarker(3);
    })
    box4.addEventListener("click", function() {
        addMarker(4);
    })
    box5.addEventListener("click", function() {
        addMarker(5);
    })
    box6.addEventListener("click", function() {
        addMarker(6);
    })
    box7.addEventListener("click", function() {
        addMarker(7);
    })
    box8.addEventListener("click", function() {
        addMarker(8);
    })
}) ();


function addMarker(place) {
    const { player1, player2 } = game.getPlayers();

    let whoseTurn = document.getElementById("whoseTurn");
    let marker;
    // prevents playing spots that are already taken and declares tie/winner when applicable
    if (gameboard[place] == "") {
        if (whoseTurn == player2.name) { 
            marker = player2.marker;
        }else{
            marker = player1.marker;
        }
        gameboard[place] = marker;
        let boxText = document.getElementById("box"+place.toString());
        boxText.textContent = marker;
        boxText.classList.add(marker);//.toLowerCase());  // "X" -> "x", "O" -> "o"
        checkForWinner();
        changeWhoseTurn();
    }else{
        console.log("Spot taken! Try again!");
    }
}


function checkForWinner() {
    const {player1,player2} = game.getPlayers();
    /* winning possibilities */
    let letter;
    let winner;
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
                console.log("Tie!");
        }
    }
    if (player1.marker.toString() == letter) {
        console.log(`Game over! ${player1.name} won!`);
    }else if (player2.marker.toString() == letter) {
        console.log(`Game over! ${player2.name} won!`);
    }
}

function changeWhoseTurn() {
    const {player1,player2} = game.getPlayers();
    let whoseTurn = document.getElementById("whoseTurn");

    if (whoseTurn == player1.name) {
            //whoseTurn.textContent = player2.name;
            //marker.classList.add("o");
            whoseTurn = player2.name;
    }else{
        //whoseTurn = player1.name;
        //marker.classList.add("x");
        whoseTurn = player1.name;
    }
}
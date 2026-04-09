// as little global code as possible - use function factories as much as possible
    // wrap the factory inside an IIFE if only one instance of the function is needed so it can't be reused
// each little piece of functionality should be able to fit inside the gameboard, player, or game object
/* "build the house from the inside out" :
    6) decor - little details to make it look or feel nicer
        --let players put in their names
        --include a button to start/restart the game
        --add a display element that shows the results when the game ends */


let gameboard = [
    "","","",
    "","","",
    "","","",
]; // stores "x"s and "o"s


// player object constructor - store players in their own objects
let Player = function (symbol,name) {
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
    let player1 = new Player("x",name1.value);
    let player2 = new Player("o",name2.value);
    console.log(player1,player2);

    const whoseTurnDisplay = document.createElement("div");
    whoseTurnDisplay.id = ("whoseTurnDisplay");
    whoseTurnDisplay.textContent = `${name1.value}'s turn`;
    document.body.appendChild(whoseTurnDisplay);
})

//gameGrid();
respondToDom();

let gameGrid = (function () {
    const container = document.createElement("div");
    container.id = "container";
    document.append(container);

    const box0 = document.createElement("div");
    box0.classList.add("box");
    box0.id = "box0";
    container.appendChild(box0);
    const box1 = document.createElement("div");
    box0.classList.add("box");
    box0.id = "box1";
    container.appendChild(box1);
    const box2 = document.createElement("div");
    box0.classList.add("box");
    box0.id = "box2";
    container.appendChild(box2);
    const box3 = document.createElement("div");
    box0.classList.add("box");
    box0.id = "box3";
    container.appendChild(box3);
    const box4 = document.createElement("div");
    box0.classList.add("box");
    box0.id = "box4";
    container.appendChild(box4);
    const box5 = document.createElement("div");
    box0.classList.add("box");
    box0.id = "box5";
    container.appendChild(box5);
    const box6 = document.createElement("div");
    box0.classList.add("box");
    box0.id = "box6";
    container.appendChild(box6);
    const box7 = document.createElement("div");
    box0.classList.add("box");
    box0.id = "box7";
    container.appendChild(box7);
    const box8 = document.createElement("div");
    box0.classList.add("box");
    box0.id = "box8";
    container.appendChild(box8);
})

function respondToDom() {
    box0.addEventListener("click", function() {
        let square = box0.id.slice[3];
        consoloe.log(square);
        addMarker(square);
    })
    box1.addEventListener("click", function() {
        let square = box1.id.slice[3];
        addMarker(square);
    })
    box2.addEventListener("click", function() {
        let square = box2.id.slice[3];
        addMarker(square);
    })
    box3.addEventListener("click", function() {
        let square = box3.id.slice[3];
        addMarker(square);
    })
    box4.addEventListener("click", function() {
        let square = box4.id.slice[3];
        addMarker(square);
    })
    box5.addEventListener("click", function() {
        let square = box5.id.slice[3];
        addMarker(square);
    })
    box6.addEventListener("click", function() {
        let square = box6.id.slice[3];
        addMarker(square);
    })
    box7.addEventListener("click", function() {
        let square = box7.id.slice[3];
        addMarker(square);
    })
    box8.addEventListener("click", function() {
        let square = box8.id.slice[3];
        addMarker(square);
    })
}

function addMarker(place) {
    //let spot = place - 1;
    let whoseTurnIsIt = document.getElementById("whoseTurnDisplay");
    let whoseTurn = whoseTurnIsIt.textContent;
    let marker;
    // prevents playing spots that are already taken and declares tie/winner when applicable
    if (gameboard[place] == "") {
        if (whoseTurn = `${player2}'s turn`) { 
            marker = player2.marker;
        }else{
            whoseTurn = `${player1}'s turn`;
            marker = player1.marker;
        }
        marker.toString();
        gameboard[place] = marker;
        let boxText = document.getElementById("box"+place.toString());
        boxText.textContent = marker;
        boxText.classList.add(marker)//.toLowerCase());  // "X" -> "x", "O" -> "o"
        checkForWinner();
        changeWhoseTurn(whoseTurn);
    }else{
        console.log("Spot taken! Try again!");
    }
}

function checkForWinner() {
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
        winner = `${player1}`;
        console.log(`Game over! ${winner} won!`);
    }else if (player2.marker.toString() == letter) {
        winner = `${player2}`;
        console.log(`Game over! ${winner} won!`);
    }
}

function changeWhoseTurn(whoseTurn) {
    if (whoseTurn == `${player1}'s turn`) {
            whoseTurnIsIt.textContent = `${player2}'s turn`;
            marker.classList.add("o");
            return whoseTurn = `${player2}'s turn`;
    }else{
        whoseTurnIsIt.textContent = `${player1}'s turn`;
        marker.classList.add("x");
        return whoseTurn = `${player1}'s turn`;
    }
}
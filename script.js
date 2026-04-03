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

// game object - store flow of the game itself
let game = (function () {


    let player1 = new Player("x",name);
    let player2 = new Player("o",name);

    displayDom();
})

function displayDom() {
    //const box0 = document.createElement("div");
    //box0.classList.add("box");
    //box0.id = "box0";
    //const container = document.getElementById("container");
    //container.appendChild(box0);
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
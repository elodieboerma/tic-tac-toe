// as little global code as possible - use function factories as much as possible
    // wrap the factory inside an IIFE if only one instance of the function is needed so it can't be reused
// each little piece of functionality should be able to fit inside the gameboard, player, or game object
    // plan where each piece should go logically before beginning to code
/* "build the house from the inside out" :
    6) decor - little details to make it look or feel nicer
        --let players put in their names
        --include a button to start/restart the game
        --add a display element that shows the results when the game ends */


let gameboard = [
    "","","",
    "","","",
    "","","",
]; // stores gameboard - "x"s and "o"s
// player object constructor - store players in their own objects
let Player = function (symbol) {
    // have to return the marker as an object (not just the value) so the rest of the script can use it
    return {
        marker: symbol,
    }
}

let player1 = new Player("X");
let player2 = new Player("O");

// game object - store flow of the game itself
let game = (function () {
    let whoseTurn = player1;
    // adds marker to specific spot in gameboard[] array
    return function addMarker(square) {
        let spot = square - 1;
        let marker = whoseTurn.marker;
        if (marker == "x") {
            marker.classList.add("x");
        }else if (marker == "o") {
            marker.classList.add("o");
        }
        // prevents playing spots that are already taken and declares tie/winner when applicable
        if (gameboard[spot] == "") {
            gameboard[spot] = marker;
            checkForWinner();
            if (whoseTurn == player1) {
                return whoseTurn = player2;
            }else{
                return whoseTurn = player1;
            }
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
        if (player1.marker == letter) {
            winner = "Player 1";
            console.log(`Game over! ${winner} won!`);
        }else if (player2.marker == letter) {
            winner = "Player 2";
            console.log(`Game over! ${winner} won!`);
        }
    }
})()


/* 5) furniture - most basic visuals
        --make object to handle DOM/display
        --write a function to render the contents of the gameboard array to the webpage
            --can just fill the array in with "x"s and "o"s for now to see how it looks
        --write the functions that allow players to add marks to a specific spot on the board by clicking on
        the appropriate DOM element */

// object to handle DOM/display
let domDisplay = (function () {
    let square0 = document.getElementById("0");
    square0.textContent = gameboard[0];
    let square1 = document.getElementById("1");
    square1.textContent = gameboard[1];
    let square2 = document.getElementById("2");
    square2.textContent = gameboard[2];
    let square3 = document.getElementById("3");
    square3.textContent = gameboard[3];
    let square4 = document.getElementById("4");
    square4.textContent = gameboard[4];
    let square5 = document.getElementById("5");
    square5.textContent = gameboard[5];
    let square6 = document.getElementById("6");
    square6.textContent = gameboard[6];
    let square7 = document.getElementById("7");
    square7.textContent = gameboard[7];
    let square8 = document.getElementById("8");
    square8.textContent = gameboard[8];
}) ()
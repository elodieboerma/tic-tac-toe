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
    // adds marker to specific spot in gameboard[] array
    return function addMarker(square) {
        spot = square - 1;
        let marker = whoseTurn.marker;
        if (marker == "x") {
            marker.classList.add("x");
        }else if (marker == "o") {
            marker.classList.add("o");
        }
        // prevents playing spots that are already taken and declares tie/winner when applicable
        if (gameboard[spot] == "") {
            gameboard[spot] = marker;
            let boxText = document.getElementById(spot.toString());
            boxText.textContent = marker;
            boxText.classList.add(marker.toLowerCase());  // "X" -> "x", "O" -> "o"
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
// as little global code as possible - use function factories as much as possible
    // wrap the factory inside an IIFE if only one instance of the function is needed so it can't be reused
// each little piece of functionality should be able to fit inside the gameboard, player, or game object
    // plan where each piece should go logically before beginning to code
/* "build the house from the inside out" :
    5) furniture - most basic visuals
        --make object to handle DOM/display
        --write a function to render the contents of the gameboard array to the webpage
            --can just fill the array in with "x"s and "o"s for now to see how it looks
        --write the functions that allow players to add marks to a specific spot on the board by clicking on
        the appropriate DOM element
            --don't forget the logic that prevents players from playing in spots that are already taken
    6) decor - little details to make it look or feel nicer
        --let players put in their names
        --include a button to start/restart the game
        --add a display element that shows the results when the game ends */

/* don't forget logic that checks for when the game is over: 
    1) 3 in a row across top, middle, or bottom
    2) 3 in a row vertically left, middle, or right
    3) 3 in a row diagonally starting from the top left or top right corner */


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
        gameboard[spot] = marker;
        if (whoseTurn == player1) {
            return whoseTurn = player2;
        }else{
            return whoseTurn = player1;
        }
    }
})()

/* 5) furniture - most basic visuals
        --make object to handle DOM/display
        --write a function to render the contents of the gameboard array to the webpage
            --can just fill the array in with "x"s and "o"s for now to see how it looks
        --write the functions that allow players to add marks to a specific spot on the board by clicking on
        the appropriate DOM element
            --don't forget the logic that prevents players from playing in spots that are already taken */
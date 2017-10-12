/*
 * Author - Manuel Melián Hernández
 */

/**
 * Establishes the length of game's platform
 */
const lengthCircuit = 70;

/**
 * Boolean var, which save if the first move it's already done
 */
var firstTime = true;
var hare = new Animal("hare", "L");
var tortoise = new Animal("tortoise", "T");
var wolf;

/**
 * Save if the wolf is up
 */
var wolfUp = false;

/**
 * Save the number between 1 and 10, which choose the move of each animal
 */
var percent = 0;

/**
 * Main method.
 * Call all methods needed to the execution of the game
 * @param {boolean} option Collect this var to send to the method print(). Which use this var to select if print the platform overwriting or adding.
 */
function stepByStep(option) {
    if (firstTime) {
        print(option);
        firstTime = false;
    } else if (wolfUp) {
        percent = giveMeRandom(1, 10);
        hare.giveMeMove();
        tortoise.giveMeMove();
        wolf.giveMeMove();
        print(option);
        wolf.checkFood(hare, tortoise);
        hare.checkWin();
        tortoise.checkWin();
        printWin();
    }
    else {
        percent = giveMeRandom(1, 10);
        hare.giveMeMove();
        tortoise.giveMeMove();
        print(option);
        hare.checkWin();
        tortoise.checkWin();
        printWin();
    }
}

/**
 * Main method.
 * Call the method stepByStep() with a loop for execute the game until a win or tie.
 */
function result() {
    while (!tortoise.win && !hare.win)
        stepByStep(false);
}

/**
 * Initialize the wolf object
 */
function wakeUpWolf() {
    wolf = new EvilAnimal("wolf", "W");
    wolfUp = true;
    document.getElementById("wolf").disabled = true;
}

/**
 * Method to reset all var required, and print again the game.
 */
function reset() {
    if (wolfUp)
        wolf.reset();
    hare.reset();
    tortoise.reset();
    firstTime = true;
    wolfUp = false;
    print(true);
    printWin();
    disableButtons(false);
}

/**
 * Decide when the game is finish if disable the buttons.
 * @param {boolean} option 
 */
function disableButtons(option) {
    var classes = document.getElementsByClassName("disabler");
    for (var i = 0; i < classes.length; i++)
        classes[i].disabled = option;
}

/**
 * Print the visual part og the game
 * @param {boolean} option Choose the way to print the game
 */
function print(option) {
    var str = "";
    var str2 = "";

    for (var i = 0; i < lengthCircuit; i++) {
        if (wolfUp) {
            if (wolf.pos == hare.pos && wolf.pos == i) {
                str += wolf.char;
                str2 = "</br>El lobo se ha comido a la liebre";
            } 
            else if (wolf.pos == tortoise.pos && wolf.pos == i) {
                str += tortoise.char;
                str2 = "</br>La tortuga se ha escondido en su caparazón";
            } 
            else if (i == wolf.pos)
            str += wolf.char;
        }

        if (tortoise.pos == hare.pos && tortoise.pos == i) {
            str += "X";
            str2 = "</br>OUCH!";
        }
        else if (i == tortoise.pos)
            str += tortoise.char;
        else if (i == hare.pos)
            str += hare.char;
        else
            str += "_";
    }
    str += "|--|GOAL";

    console.log(str);
    if (option)
        document.getElementById("circuit").innerHTML = str + str2;
    else {
        str = "<p>" + str + str2 + "</p>";
        document.getElementById("circuit").innerHTML += str;
    }
}

/**
 * Check who have a win, if the both animals have the var win true, print a tie
 */
function printWin() {
    var str = "";

    if (hare.win && tortoise.win)
        str = "Es un empate";
    else if (hare.win)
        str = "Ganó la liebre... que bien!! yuhu";
    else if (tortoise.win)
        str = "GANÓ LA TORTUGA! YEAH!";

    console.log(str);
    document.getElementById("foot").innerHTML = str;
}

/**
 * Returns a random number
 * @param {int} min Bottom limit the random generator
 * @param {int} max Top limit the random generator
 */
var giveMeRandom = (min, max) => {
    return Math.floor(Math.random() * (max - min + 1)) + min;
};
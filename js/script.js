/**
 * TO DO LIST
 *  -- Añadir checkWin en la función stepByStep
 *  -- Completar función checkWin
 *  -- Imprimir todo por consola
 *  -- Crear función para hacerlo de golpe
 *  -- Cambiar todas las impresiones por asignar a una variable, e imprimir al final de la función
 *  -- Desplegar de checkWin un printWin
 *  -- Finalizar el cambio de impresión de registro a sobreescritura
 *  - Implementar funciones arrow en el printWin
 *  - Implementar tercer animal
 *  - Comentar todo
 *  - Modificar aleatorio, usar solo uno, guardar en variable global
 */

const lengthCircuit = 70;
var firstTime = true;
var hare = new Animal("hare", "L");
var tortoise = new Animal("tortoise", "T");
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
    } else {
        percent = giveMeRandom();
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
 * Method to reset all var required, and print again the game.
 */
function reset() {
    hare.reset();
    tortoise.reset();
    firstTime = true;
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
        if (tortoise.pos == hare.pos && tortoise.pos == i) {
            str += "X";
            str2 = "</br>OUCH!";
        } else if (i == tortoise.pos)
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
    var out = false;

    if (hare.win && tortoise.win) {
        str = "Es un empate";
        out = true;
    } else if (hare.win) {
        str = "Ganó la liebre... que bien!! yuhu";
        out = true;
    } else if (tortoise.win) {
        str = "GANÓ LA TORTUGA! YEAH!";
        out = true;
    }

    console.log(str);
    document.getElementById("foot").innerHTML = str;

    return (out);
}

/**
 * Function to give a random number between 1 and 10
 */
var giveMeRandom = () => {
    var max = 10;
    var min = 1;
    return Math.floor(Math.random() * (max - min + 1)) + min;};
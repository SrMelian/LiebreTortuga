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
 */

// #region Clase Animal

/**
 * Clase animal
 * @constructor
 * @param {string} name - Por comodidad y entendimiento del código este parámetro debería ser el mismo que el nombre del objeto que lo instancia
 * @param {string} char - Carácter con el que queremos representar nuestro animal gráficamente
 */
function Animal(name, char) {
    this.name = name;
    this.char = char;
    this.pos = 0;
    this.win = false;
}

/**
 * Función para resetear el juego ya sea una vez finalizado paso a paso, o en medio de la ejecución paso a paso
 */
Animal.prototype.reset = function () {
    this.pos = 0;
    this.win = false;
}

/**
 * Función que decide el movimiento que hará cada animal, no devuelve nada
 */
Animal.prototype.giveMeMove = function () {
    var movesArray = { rapido: 3, deslizarse: -6, lento: 1, dormido: 0, granSalto: 9, deslizamientoGrande: -12, saltoPequenio: 1, deslizamientoPequenio: -2 };
    var percent = Math.floor(Math.random() * (10 - 1 + 1)) + 1;

    if (this.name == "tortuga") 
        switch (true) {
            case percent <= 5:
                this.pos += movesArray["rapido"];
                break;
            case percent <= 7:
                this.pos += movesArray["deslizarse"];
                break;
            case percent <= 10:
                this.pos += movesArray["lento"];
                break;
        }
    else 
        switch (true) {
            case percent <= 2:
                this.pos += movesArray["dormido"];
                break;
            case percent <= 4:
                this.pos += movesArray["granSalto"];
                break;
            case percent <= 5:
                this.pos += movesArray["deslizamientoGrande"];
                break;
            case percent <= 8:
                this.pos += movesArray["saltoPequenio"];
                break;
            case percent <= 10:
                this.pos += movesArray["deslizamientoPequenio"];
                break;
        }
    
    if (this.pos < 0)
        this.pos = 0;
    else if (this.pos >= lenghtCircuit)
        this.pos = lenghtCircuit - 1;
}

Animal.prototype.checkWin = function () {
    if (this.pos >= lenghtCircuit - 1) {
        this.win = true;
        disableButtons(true);
    }
}

// #endregion

const lenghtCircuit = 70;
var firstTime = true;
var liebre = new Animal("liebre", "L");
var tortuga = new Animal("tortuga", "T");

function stepByStep(option) {
    if (firstTime) {
        print(option);
        firstTime = false;
    }
    else {
        liebre.giveMeMove();
        tortuga.giveMeMove();
        print(option);
        liebre.checkWin();
        tortuga.checkWin();
        printWin();
    }
}

function result() {
    while (!tortuga.win && !liebre.win)
        stepByStep(false);
}

function reset() {
    liebre.reset();
    tortuga.reset();
    firstTime = true;
    print(true);
    printWin();
    disableButtons(false);
}

function disableButtons(option) {
    var classes = document.getElementsByClassName("disabler");
    for (var i = 0; i < classes.length; i++)
        classes[i].disabled = option;
}

function print(option) {
    var str = "";
    var str2 = "";

    for (var i = 0; i < lenghtCircuit; i++) {
        if (tortuga.pos == liebre.pos && tortuga.pos == i) {
            str += "X";
            str2 = "</br>OUCH!";
        }
        else if (i == tortuga.pos)
            str += tortuga.char;
        else if (i == liebre.pos)
            str += liebre.char;
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
 * Función que imprime la victoria
 */
function printWin() {
    var str = "";
    var out = false;

    if (liebre.win && tortuga.win) {
        str = "Es un empate";
        out = true;
    }
    else if (liebre.win) {
        str = "Ganó la liebre... que bien!! yuhu";
        out = true;
    }
    else if (tortuga.win) {
        str = "GANÓ LA TORTUGA! YEAH!";
        out = true;
    }

    console.log(str);
    document.getElementById("foot").innerHTML = str;

    return(out);
}
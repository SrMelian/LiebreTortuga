/**
 * Class animal
 * @constructor
 * @param {string} name - For comfort and understanding of the code this parameter should be called the same as the name of the object
 * @param {string} char - Char will represent our animal
 */
function Animal(name, char) {
    this.name = name;
    this.char = char;
    this.pos = 0;
    this.win = false;
}

/**
 * Function to reset the var of the objects
 */
Animal.prototype.reset = function () {
    this.pos = 0;
    this.win = false;
}

/**
 * Function decide the move will be each animal
 */
Animal.prototype.giveMeMove = function () {
    var movesArray = {
        rapido: 3,
        deslizarse: -6,
        lento: 1,
        dormido: 0,
        granSalto: 9,
        deslizamientoGrande: -12,
        saltoPequenio: 1,
        deslizamientoPequenio: -2
    };
    // percent = Math.floor(Math.random() * (10 - 1 + 1)) + 1;

    if (this.name == "tortoise")
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
    else if (this.pos >= lengthCircuit)
        this.pos = lengthCircuit - 1;
}

/**
 * Function to check who animal has arrived to the goal
 */
Animal.prototype.checkWin = function () {
    if (this.pos >= lengthCircuit - 1) {
        this.win = true;
        disableButtons(true);
    }
}
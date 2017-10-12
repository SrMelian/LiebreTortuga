/*
 * Author - Manuel Melián Hernández
 */

/**
 * Class evil animal
 * @constructor
 * @param {string} name - For comfort and understanding of the code this parameter should be called the same as the name of the object
 * @param {string} char - Char will represent our evil animal
 */
function EvilAnimal(name, char) {
    this.name = name;
    this.char = char;
    this.pos = 0;
}

/**
 * Function to reset the var of the objects
 */
EvilAnimal.prototype.reset = function () {
    this.pos = 0;
    this.win = false;
}

/**
 * Assign the random number to the position
 */
EvilAnimal.prototype.giveMeMove = function () {
    percent = giveMeRandom(0, 68);
    this.pos = percent;
}

/**
 * Check if the EvilAnimal stay the same pos than animalFood
 * @param {Animal} animalFood Is the animal that can be eaten
 * @param {Animal} animalShield Is the animal that can be winner
 */
EvilAnimal.prototype.checkFood = function (animalFood, animalShield) {
    if (this.pos == animalFood.pos) {
        animalFood.dead = true;
        animalShield.win = true;
    }
}
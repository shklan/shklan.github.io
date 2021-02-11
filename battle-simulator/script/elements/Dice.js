export default class Dice {
    constructor(dicenum, dicesize) {
        this.dicenum = dicenum;
        this.dicesize = dicesize;
    }
    roll() {
        let sum = 0;
        for (let i = 0; i < this.dicenum; i++)
            sum += this.getRandomInt(1, this.dicesize + 1);
        return sum;
    }
    // return int x (min <= x < max)
    getRandomInt(min, max) {
        return Math.floor(Math.random() * (max - min) + min);
    }
}

export default class Dice {
    private dicenum;
    private dicesize;

    public constructor(dicenum: number, dicesize: number) {
        this.dicenum = dicenum;
        this.dicesize = dicesize;
    }

    public roll(): number {
        let sum = 0;
        for(let i=0; i<this.dicenum; i++) sum += this.getRandomInt(1, this.dicesize+1);
        return sum;
    }

    // return int x (min <= x < max)
    private getRandomInt(min: number, max: number): number {
        return Math.floor(Math.random()*(max - min) + min);
    }
}
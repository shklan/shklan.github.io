import {Dice} from './elements/module';

class Startup {
    public static main(): number {
        const dice = new Dice(3, 6);
        console.log('Hello World');
        console.log(dice.roll());
        return 0;
    }
}

window.onload = () => {
    Startup.main();
};

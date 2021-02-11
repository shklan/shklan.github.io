import { Dice } from './elements/module';
class Startup {
    static main() {
        const dice = new Dice(3, 6);
        console.log('Hello World');
        console.log(dice.roll());
        return 0;
    }
}
window.onload = () => {
    Startup.main();
};

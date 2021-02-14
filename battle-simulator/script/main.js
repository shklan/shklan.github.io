import { Dice, ActorList } from './elements/module';
class Startup {
    static main() {
        const dice = new Dice(3, 6);
        const friends = new ActorList();
        const enemies = new ActorList();
        console.log('Hello World');
        for (let i = 0, j = 5; i < j; i++)
            console.log(dice.roll());
        document.getElementsByClassName('add-actor')[0].addEventListener('click', friends.addActor.bind(friends));
        return 0;
    }
}
window.onload = () => {
    Startup.main();
};

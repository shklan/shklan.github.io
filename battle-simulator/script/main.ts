import {Dice, Actor, ActorList} from './elements/module';
class Startup {
    public static main(): number {
        const dice = new Dice(3, 6);
        const friends = new ActorList();
        const enemies = new ActorList();
        console.log('Hello World');
        for(let i: number = 0, j: number = 5; i<j; i++) console.log(dice.roll());
        document.getElementsByClassName('add-actor')[0].addEventListener('click', friends.addActor.bind(friends));
        return 0;
    }
}

window.onload = () => {
    Startup.main();
};

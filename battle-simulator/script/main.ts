import {Dice, ActorList, BattleField} from './elements/module';
class Startup {
    public static main(): number {
        const dice = new Dice(3, 6);
        const friends = new ActorList();
        const enemies = new ActorList();
        const field = new BattleField(friends, enemies);
        console.log('Hello World');
        // for(let i: number = 0, j: number = 5; i<j; i++) console.log(dice.roll());
        document.getElementsByClassName('start-battle')[0].addEventListener('click', field.battleStartListener.bind(field));
        document.getElementsByClassName('add-actor')[0].addEventListener('click', friends.actorAddListener.bind(friends));
        document.getElementsByClassName('add-actor')[1].addEventListener('click', enemies.actorAddListener.bind(enemies));
        return 0;
    }
}

window.onload = () => {
    Startup.main();
};

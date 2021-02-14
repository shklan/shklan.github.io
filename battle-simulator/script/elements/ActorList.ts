import { Actor } from './module';

export default class ActorList {
    private actor_list: Array<Actor>;

    constructor() {
        this.actor_list = new Array<Actor>();
    }

    public addActor(e: Event): void {
        const button: HTMLButtonElement = e.currentTarget as HTMLButtonElement;
        const actor_list_html: HTMLDivElement = button.parentElement!.nextElementSibling! as HTMLDivElement;
        const new_actor: Actor = new Actor();
        const new_element: HTMLDivElement = new_actor.createElement();
        new_element.addEventListener('click', this._deleteActor.bind(this));
        console.log(this.actor_list);
        actor_list_html.appendChild(new_element);
        this.actor_list.push(new_actor);
    }

    private _deleteActor(e: Event): void {
        const target = e.target;
        if (target instanceof HTMLButtonElement) {
            const target_actor_element = e.currentTarget! as HTMLDivElement;
            const actors_element = target_actor_element.parentElement!;
            const children_element = Array.prototype.slice.call(actors_element.children);
            const index = children_element.indexOf(target_actor_element);
            
            actors_element.removeChild(target_actor_element);
            this.actor_list.splice(index, 1);
            console.log(this.actor_list);
            console.log(index);
            console.log('deleted');
        }
    }

}
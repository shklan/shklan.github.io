import { Actor } from './module';
export default class ActorList {
    constructor() {
        this.actor_list = new Array();
    }
    addActor(e) {
        const button = e.currentTarget;
        const actor_list_html = button.parentElement.nextElementSibling;
        const new_actor = new Actor();
        const new_element = new_actor.createElement();
        new_element.addEventListener('click', this._deleteActor.bind(this));
        console.log(this.actor_list);
        actor_list_html.appendChild(new_element);
        this.actor_list.push(new_actor);
    }
    _deleteActor(e) {
        const target = e.target;
        if (target instanceof HTMLButtonElement) {
            const target_actor_element = e.currentTarget;
            const actors_element = target_actor_element.parentElement;
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

import { Actor } from './module';
export default class ActorList {
    constructor() {
        this._actor_list = new Array();
    }
    actorAddListener(e) {
        const button = e.currentTarget;
        const actor_list_html = button.parentElement.nextElementSibling;
        const new_actor = new Actor();
        const new_element = new_actor.createElement();
        new_element.addEventListener('click', this._actorDeleteListener.bind(this));
        actor_list_html.appendChild(new_element);
        this._actor_list.push(new_actor);
    }
    _actorDeleteListener(e) {
        const target = e.target;
        if (target instanceof HTMLButtonElement) {
            const target_actor_element = e.currentTarget;
            const actors_element = target_actor_element.parentElement;
            const children_element = Array.prototype.slice.call(actors_element.children);
            const index = children_element.indexOf(target_actor_element);
            actors_element.removeChild(target_actor_element);
            this._actor_list.splice(index, 1);
            console.log('deleted');
        }
    }
    getActorLength() {
        return this._actor_list.length;
    }
}

import { Status } from './module';
import { Action } from '../action/module';

export default class Actor {
    private name: string;
    private status: Status;
    private action_list: Array<Action>;

    constructor() {
        this.name = '';
        this.status = new Status();
        this.action_list = new Array<Action>();
    }

    public addAction(e: Event): void {

    }

    public createElement(): HTMLDivElement {
        const root_node = document.createElement('div');
        root_node.className = 'actor-root';
        root_node.appendChild(this._createActorElement());
        return root_node;
    }

    private _createActorElement(): HTMLDivElement {
        const actor_node = document.createElement('div');
        actor_node.className = 'actor';
        actor_node.appendChild(this._createDeleteElement());
        actor_node.appendChild(this._createNameElement());
        actor_node.appendChild(this._createStatusElement());
        return actor_node;
    }

    private _createDeleteElement(): HTMLButtonElement {
        const delete_node = document.createElement('button');
        delete_node.innerText = '削除';
        return delete_node;
    }

    private _createNameElement(): HTMLInputElement {
        const actor_node = document.createElement('input');
        actor_node.className = 'name';
        actor_node.type = 'text';
        actor_node.innerText = '名前';
        return actor_node;
    }

    private _createStatusElement(): HTMLDivElement {
        const status_node = document.createElement('div');
        status_node.className = 'status';
        status_node.appendChild(this._createStatusTableElement());
        return status_node;
    }

    private _createStatusTableElement(): HTMLTableElement {
        // status_table_node
        const status_table_node = document.createElement('table');
        status_table_node.className = 'status-table';
        status_table_node.appendChild(this._createStatusTableBodyElement());
        return status_table_node;
    }

    private _createStatusTableBodyElement(): HTMLTableSectionElement {
        // status_table_body_node
        const status_table_body_node = document.createElement('tbody');
        const status_name_column = document.createElement('tr');
        const status_input_column = document.createElement('tr');
        for (const status_name of this.status.getKeys()) {
            // status_name_cell
            const status_name_cell = document.createElement('td');
            status_name_cell.innerText = status_name;
            // status_input_cell
            const status_input_cell = document.createElement('td');
            // status_input_node
            const status_input_node = document.createElement('input');
            const status_value = this.status.getStatus(status_name);
            status_input_node.className = 'status-input';
            status_input_node.type = 'number';
            status_input_node.step = '1';
            status_input_node.value = status_value.toString();

            status_input_cell.appendChild(status_input_node);
            status_name_column.appendChild(status_name_cell);
            status_input_column.appendChild(status_input_cell);
        }
        status_table_body_node.appendChild(status_name_column);
        status_table_body_node.appendChild(status_input_column);
        return status_table_body_node;
    }
}
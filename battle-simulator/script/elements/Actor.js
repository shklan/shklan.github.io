import { Status } from './module';
export default class Actor {
    constructor() {
        this.name = '';
        this.status = new Status();
        this.action_list = new Array();
        this.attack_rate = 0.5;
        this.avoid_rate = 0.5;
    }
    _addActionListener(e) {
    }
    _deleteActionListener(e) {
    }
    createElement() {
        const root_node = document.createElement('div');
        root_node.className = 'actor-root';
        root_node.appendChild(this._createActorElement());
        return root_node;
    }
    _createActorElement() {
        const actor_node = document.createElement('div');
        actor_node.className = 'actor';
        actor_node.appendChild(this._createDeleteElement());
        actor_node.appendChild(this._createNameElement());
        actor_node.appendChild(this._createStatusElement());
        actor_node.appendChild(this._createActionListElement());
        return actor_node;
    }
    _createDeleteElement() {
        const root_node = document.createElement('div');
        root_node.className = 'delete-actor';
        const delete_node = document.createElement('button');
        delete_node.innerText = '削除';
        root_node.appendChild(delete_node);
        return root_node;
    }
    _createNameElement() {
        const root_node = document.createElement('div');
        root_node.className = 'name';
        const description_node = this._createDescriptionElement('名前');
        description_node.className = 'name-description';
        const name_node = document.createElement('div');
        const name_input_node = document.createElement('input');
        name_node.className = 'name-input';
        name_input_node.type = 'text';
        name_input_node.addEventListener('change', this._nameChangeListener.bind(this));
        name_node.appendChild(name_input_node);
        root_node.appendChild(description_node);
        root_node.appendChild(name_node);
        return root_node;
    }
    _nameChangeListener(e) {
        e.stopPropagation();
        const target = e.target;
        const value = target.value;
        this.name = value;
        console.log(this.name);
    }
    _createStatusElement() {
        const status_node = document.createElement('div');
        status_node.className = 'status';
        status_node.appendChild(this._createStatusTableElement());
        // san
        const san_node = this._createSanElement();
        status_node.appendChild(san_node);
        // 回避
        const avoidance_node = this._createAvoidanceElement();
        status_node.appendChild(avoidance_node);
        return status_node;
    }
    _createStatusTableElement() {
        // status_table_node
        const root_node = document.createElement('div');
        const status_table_node = document.createElement('table');
        status_table_node.className = 'status-table';
        status_table_node.appendChild(this._createStatusTableBodyElement());
        root_node.appendChild(status_table_node);
        return root_node;
    }
    _createStatusTableBodyElement() {
        // 能力値テーブル
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
            status_input_node.min = '1';
            status_input_node.step = '1';
            status_input_node.value = status_value.toString();
            status_input_cell.appendChild(status_input_node);
            status_name_column.appendChild(status_name_cell);
            status_input_column.appendChild(status_input_cell);
        }
        status_table_body_node.addEventListener('change', this._statusChangeListener.bind(this));
        status_table_body_node.appendChild(status_name_column);
        status_table_body_node.appendChild(status_input_column);
        return status_table_body_node;
    }
    _statusChangeListener(e) {
        e.stopPropagation();
        const target = e.target;
        const tbody = e.currentTarget;
        const status_cell = target.parentElement;
        const status_row = status_cell.parentElement;
        const value = Number(target.value);
        const index = Array.prototype.slice.call(status_row.cells).indexOf(status_cell);
        const name_node = tbody.children[0].children[index];
        const name = name_node.innerText;
        this.status.setStatus(name, value);
    }
    _createSanElement() {
        const root_node = document.createElement('div');
        root_node.className = 'san option-root';
        const input_description_node = this._createDescriptionElement('SAN（％）');
        input_description_node.className = 'option-description';
        const input_node = this._createNumberInputElement('input', true);
        input_node.addEventListener('change', this._sanInputChangeListener.bind(this));
        input_node.className = 'option';
        input_node.style.visibility = 'hidden';
        const checkbox_description_node = this._createDescriptionElement('手動入力');
        checkbox_description_node.className = 'option-short-description';
        const checkbox_node = this._createCheckBoxElement();
        checkbox_node.addEventListener('change', this._sanCheckboxChangeListener.bind(this));
        checkbox_node.className = 'option';
        root_node.appendChild(input_description_node);
        root_node.appendChild(checkbox_description_node);
        root_node.appendChild(checkbox_node);
        root_node.appendChild(input_node);
        return root_node;
    }
    _sanInputChangeListener(e) {
        e.stopPropagation();
        const target = e.target;
        this.status.setSan(Number(target.value));
    }
    _sanCheckboxChangeListener(e) {
        e.stopPropagation();
        const target = e.currentTarget;
        const root = target.parentElement;
        const input = root.children[3].children[0];
        input.disabled = !input.disabled;
        input.style.visibility = input.disabled ? 'hidden' : 'visible';
        this.status.san_auto = !this.status.san_auto;
        this.status.setSan(Number(input.value));
    }
    _createAvoidanceElement() {
        const root_node = document.createElement('div');
        root_node.className = 'avoidance option-root';
        const input_description_node = this._createDescriptionElement('回避（％）');
        input_description_node.className = 'option-description';
        const input_node = this._createNumberInputElement('input', true);
        input_node.addEventListener('change', this._avoidanceInputChangeListener.bind(this));
        input_node.className = 'option';
        input_node.style.visibility = 'hidden';
        const checkbox_description_node = this._createDescriptionElement('手動入力');
        checkbox_description_node.className = 'option-short-description';
        const checkbox_node = this._createCheckBoxElement();
        checkbox_node.addEventListener('change', this._avoidanceCheckboxChangeListener.bind(this));
        checkbox_node.className = 'option';
        root_node.appendChild(input_description_node);
        root_node.appendChild(checkbox_description_node);
        root_node.appendChild(checkbox_node);
        root_node.appendChild(input_node);
        return root_node;
    }
    _avoidanceInputChangeListener(e) {
        e.stopPropagation();
        const target = e.target;
        this.status.setAvoidance(Number(target.value));
    }
    _avoidanceCheckboxChangeListener(e) {
        e.stopPropagation();
        const target = e.currentTarget;
        const root = target.parentElement;
        const input = root.children[3].children[0];
        input.disabled = !input.disabled;
        input.style.visibility = input.disabled ? 'hidden' : 'visible';
        this.status.avoidance_auto = !this.status.avoidance_auto;
        this.status.setAvoidance(Number(input.value));
    }
    _createActionListElement() {
        // 行動
        const root_node = document.createElement('div');
        root_node.className = 'action-root';
        const basic_node = document.createElement('div');
        basic_node.addEventListener('change', this._basicOptionChangeListener.bind(this));
        basic_node.className = 'action option-root';
        // 攻撃率
        const attack_description_node = this._createDescriptionElement('攻撃選択率（％）');
        attack_description_node.className = 'option-long-description';
        const attack_input_node = this._createNumberInputElement('input attack-rate', false, '50', '0', '100');
        attack_input_node.className = 'option';
        // 回避率
        const avoidance_description_node = this._createDescriptionElement('回避選択率（％）');
        avoidance_description_node.className = 'option-long-description';
        const avoidance_input_node = this._createNumberInputElement('input avoid-rate', false, '50', '0', '100');
        avoidance_input_node.className = 'option';
        basic_node.appendChild(attack_description_node);
        basic_node.appendChild(attack_input_node);
        basic_node.appendChild(avoidance_description_node);
        basic_node.appendChild(avoidance_input_node);
        root_node.appendChild(basic_node);
        return root_node;
    }
    _basicOptionChangeListener(e) {
        e.stopPropagation();
        const target = e.target;
        let value = Number(target.value);
        if (!target.checkValidity()) {
            console.log('invalid input!');
            target.value = "50";
            value = 50;
        }
        const root = e.currentTarget;
        const class_list = target.classList;
        if (Array.prototype.includes.call(class_list, "attack-rate")) {
            this.attack_rate = value / 100;
            this.avoid_rate = (100 - value) / 100;
            const other = root.children[3].children[0];
            other.value = (100 - value).toString();
        }
        else {
            this.avoid_rate = value / 100;
            this.attack_rate = (100 - value) / 100;
            const other = root.children[1].children[0];
            other.value = (100 - value).toString();
        }
        // console.log(this.attack_rate, this.avoid_rate);
    }
    _createNumberInputElement(input_class_name, disabled = false, default_value = '0', min = '0', max = '99') {
        const root_node = document.createElement('div');
        const input_node = document.createElement('input');
        input_node.className = input_class_name;
        input_node.type = 'number';
        input_node.disabled = disabled;
        input_node.value = default_value;
        input_node.min = min;
        input_node.max = max;
        input_node.step = '1';
        root_node.appendChild(input_node);
        return root_node;
    }
    _createCheckBoxElement() {
        const root_node = document.createElement('div');
        const checkbox_node = document.createElement('input');
        checkbox_node.type = 'checkbox';
        root_node.appendChild(checkbox_node);
        return root_node;
    }
    _createDescriptionElement(description) {
        const root_node = document.createElement('div');
        root_node.innerText = description;
        return root_node;
    }
}

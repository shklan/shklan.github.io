import Action from './Action'

export default class Attack implements Action {
    public type: string;
    public value: string;
    
    constructor(type: string, value: string) {
        this.type = type;
        this.value = value;
    }

    public act(): number {
        return 0;
    }
}
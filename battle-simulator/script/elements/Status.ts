export default class Status {
    private _state: Map<string, number>;
    private _san: number;
    private _avoidance: number;
    private _db: string;
    public san_auto: boolean;
    public avoidance_auto: boolean;

    constructor() {
        this._state = new Map<string, number>();
        this._state.set("HP", 0);    
        this._state.set("MP", 0);
        this._state.set("STR", 0);
        this._state.set("CON", 0);
        this._state.set("POW", 0);
        this._state.set("DEX", 0);
        this._state.set("APP", 0);
        this._state.set("SIZ", 0);
        this._state.set("INT", 0);
        this._state.set("EDU", 0);
        this._san = 0;
        this._avoidance = 0;
        this._db = "+0";
        this.san_auto = true;
        this.avoidance_auto = true;
    }

    public setStatus(name: string, val: number): void {
        if (this._state.has(name)) this._state.set(name, val);
        // console.log(name + ' -> ' + val);
        this.updateDefaultStatus();
    }

    public updateDefaultStatus(): void {
        if (this.san_auto) this._setDefaultSan();
        if (this.avoidance_auto) this._setDefaultAvoidance();
        this._setDefaultDb();
    }

    public getKeys(): IterableIterator<string> {
        return this._state.keys();
    }

    public getStatus(name: string): number {
        return this._state.get(name)!;
    }

    public getSan(): number {
        return this._san;
    }

    public getAvoidance(): number {
        return this._avoidance;
    }

    public setSan(new_value: number): void {
        if (!this.san_auto) this._san = new_value;
        else this._setDefaultSan();
        console.log(this._san);
    }

    public setAvoidance(new_value: number): void {
        if (!this.avoidance_auto) this._avoidance = new_value;
        else this._setDefaultAvoidance();
        console.log(this._avoidance);
    }

    private _setDefaultSan(): void {
        this._san = this._state.get("POW")! * 5;
    }

    private _setDefaultAvoidance(): void {
        this._avoidance = this._state.get("DEX")! * 2;
    }

    private _setDefaultDb(): void {
        const str: number = this._state.get("STR")!;
        const siz: number = this._state.get("SIZ")!;
        const base: number = str + siz - 16;
        const dice: number = Math.floor((base-1) / 16);
        if (dice == 0) {
            if (base > -12 && base <= -8)  this._db = "-1d6";
            else if (base > -8 && base <= 0) this._db = "-1d4";
            else if (base > 0 && base <= 8) this._db = "+0";
            else if (base > 8 && base <= 16) this._db = "+1d4"; 
        } else {
            this._db = "+" + dice + "d6";
        }
    }

}
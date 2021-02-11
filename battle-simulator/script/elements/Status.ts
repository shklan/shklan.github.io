export default class Status {
    private _state: Map<string, number>;
    private _db: string;

    constructor() {
        this._state = new Map<string, number>();
        this._state.set("HP", 0);    
        this._state.set("MP", 0);
        this._state.set("STR", 0);
        this._state.set("CON", 0);
        this._state.set("POW", 0);
        this._state.set("DEx", 0);
        this._state.set("APP", 0);
        this._state.set("SIZ", 0);
        this._state.set("INT", 0);
        this._state.set("EDU", 0);
        this._db = "0";
    }

    public setStatus(name: string, val: number): void {
        if (this._state.has(name)) this._state.set(name, val);
        this._setDb();
    }

    private _setDb(): void {
        const str: number = this._state.get("STR")!;
        const siz: number = this._state.get("SIZ")!;
        const base: number = str + siz - 16;
        const dice: number = Math.floor((base-1) / 16);
        if (dice == 0) {
            if (base > -12 && base <= -8)  this._db = "-1d6";
            else if (base > -8 && base <= 0) this._db = "-1d4";
            else if (base > 0 && base <= 8) this._db = "0";
            else if (base > 8 && base <= 16) this._db = "1d4"; 
        } else {
            this._db = dice + "d6";
        }
    }
}
export default class Status {
    constructor() {
        this._state = new Map();
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
        this._db = "0";
    }
    setStatus(name, val) {
        if (this._state.has(name))
            this._state.set(name, val);
        this._setDefaultSan();
        this._setDefaultDb();
    }
    getKeys() {
        return this._state.keys();
    }
    getStatus(name) {
        return this._state.get(name);
    }
    _setDefaultSan() {
        this._san = this._state.get("POW") * 5;
    }
    _setDefaultDb() {
        const str = this._state.get("STR");
        const siz = this._state.get("SIZ");
        const base = str + siz - 16;
        const dice = Math.floor((base - 1) / 16);
        if (dice == 0) {
            if (base > -12 && base <= -8)
                this._db = "-1d6";
            else if (base > -8 && base <= 0)
                this._db = "-1d4";
            else if (base > 0 && base <= 8)
                this._db = "0";
            else if (base > 8 && base <= 16)
                this._db = "1d4";
        }
        else {
            this._db = dice + "d6";
        }
    }
}

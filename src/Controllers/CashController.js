class CashController {
    constructor() {
        this._cash;
    }

    /**
     * Sets new cash
     * @param {Number} newCash New cash to set
     */
    set cash(newCash) {
        this._cash = newCash;
    }

    get cash() {
        return this._cash;
    }
}

export default CashController;
class CashController {
    constructor() {
        this._userCash;
    }

    /**
     * Sets new cash
     * @param {Number} newCash New cash to set
     */
    set userCash(newCash) {
        this._userCash = newCash;
    }

    get userCash() {
        return this._userCash;
    }
}

export default CashController;
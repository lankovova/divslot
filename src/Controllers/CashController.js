class CashController {
    constructor() {
        this._userCash = 0;
        this._userWin = 0;
    }

    /**
     * Sets user cash
     * @param {Number} cash New cash to set
     */
    set userCash(cash) {
        this._userCash = parseFloat(cash);
    }
    get userCash() {
        return this._userCash;
    }

    /**
     * Sets user win
     * @param {Number} win New win to set
     */
    set userWin(win) {
        this._userWin = parseFloat(win);
    }
    get userWin() {
        return this._userWin;
    }
}

export default CashController;
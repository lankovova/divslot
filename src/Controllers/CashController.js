class CashController {
    constructor(props) {
        this._userCash = 0;
        this._userWin = 0;

        this.props = props;
    }

    /**
     * Sets user cash
     * @param {Number} cash New cash to set
     */
    set userCash(cash) {
        this._userCash = parseFloat(cash);
        this.props.panel.setUserCash(this._userCash);
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
        this.props.panel.setUserWin(this._userWin);
    }
    get userWin() {
        return this._userWin;
    }
}

export default CashController;
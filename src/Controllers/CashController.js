class CashController {
    constructor(startCash, props) {
        this._userCash;
        this._userWin;

        this._linesAmount;
        this._betPerLine;

        this.props = props;

        this._init(startCash);
    }

    _init({lines, betPerLine, userCash, userWin}) {
        this.lines = lines;
        this.betPerLine = betPerLine;
        this.userCash = userCash;
        this.userWin = userWin;
    }

    get lines() { return this._linesAmount };
    set lines(linesAmount) {
        this._linesAmount = linesAmount;
        this.props.panel.setLinesAmount(this._linesAmount);

        this._updateTotalBet();
    }

    get betPerLine() { return this._betPerLine };
    set betPerLine(betPerLine) {
        this._betPerLine = betPerLine;
        this.props.panel.setBetPerLine(this._betPerLine);

        this._updateTotalBet();
    }

    get totalBet() { return this._linesAmount * this._betPerLine };

    _updateTotalBet() {
        this.props.panel.setTotalBet(this._linesAmount * this._betPerLine);
    }

    /**
     * Get/Set user cash
     * @param {Number} cash New cash to set
     */
    get userCash() { return this._userCash; }
    set userCash(cash) {
        this._userCash = parseFloat(cash);
        this.props.panel.setUserCash(this._userCash);
    }


    /**
     * Get/Set user win
     * @param {Number} win New win to set
     */
    get userWin() { return this._userWin; }
    set userWin(win) {
        this._userWin = parseFloat(win);
        this.props.panel.setUserWin(this._userWin);
    }
}

export default CashController;
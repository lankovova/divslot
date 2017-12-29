class PointsController {
    constructor(props, options) {
        this._userCash;
        this._userWin;

        this._linesAmount;
        this._betPerLine;

        this.denomination;

        this.props = props;

        this._init(options);
    }

    _init({lines = settings.lines[0], betPerLine = settings.betPerLine[0], userCash = 0, userWin = 0, denomination = settings.denominations[0]}) {
        this.lines = lines;
        this.betPerLine = betPerLine;
        this.userCash = userCash;
        this.userWin = 0;
        this.denomination = denomination;
    }

    coinsToPoints(coins) {
        return coins / this.denomination;
    }
    kupsToPoints(kups) {
        return kups * 100 / this.denomination;
    }

    get lines() { return this._linesAmount };
    set lines(linesAmount) {
        this._linesAmount = linesAmount;
        // Update panel value
        this.props.panel.setLinesAmount(this._linesAmount);

        // Update line presenters text
        this.props.linePresenters.setText(this._linesAmount, this._betPerLine);

        this._updateTotalBet();
    }

    get betPerLine() { return this._betPerLine };
    set betPerLine(betPerLine) {
        this._betPerLine = betPerLine;
        // Update panel value
        this.props.panel.setBetPerLine(this._betPerLine);

        // Update line presenters text
        this.props.linePresenters.setText(this._linesAmount, this._betPerLine);

        this._updateTotalBet();
    }

    get totalBet() { return this._linesAmount * this._betPerLine };

    _updateTotalBet() {
        this.props.panel.setTotalBet(this._linesAmount * this._betPerLine);
    }

    /**
     * Set user cash
     * @param {String|Number} cash New cash to set
     */
    set userCash(cash) {
        this._userCash = cash;
        this.props.panel.setUserCash(this._userCash);
    }
    get userCash() { return this._userCash; }

    /**
     * Set user win
     * @param {String|Number} win New win to set
     */
    set userWin(win) {
        this._userWin = win;
        this.props.panel.setUserWin(this._userWin);
    }
    get userWin() { return this._userWin; }
}

export default PointsController;

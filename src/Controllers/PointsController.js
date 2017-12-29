class PointsController {
    constructor(props, options) {
        this._userCash;
        this._userWin;

        this._linesAmount;
        this._betPerLine;

        this._denomination;

        this.props = props;

        this._init(options);
    }

    _init({lines = settings.lines[0], betPerLine = settings.betPerLine[0], userCash = 0, userWin = 0, denomination = settings.denominations[0]}) {
        this.setLines(lines);
        this.setBetPerLine(betPerLine);
        this.setDenomination(denomination);
        this.userCash = userCash;
        this.userWin = 0;
    }

    coinsToPoints(coins) {
        return coins / this.denomination;
    }
    kupsToPoints(kups) {
        return kups * 100 / this.denomination;
    }

    get denomination() { return this._denomination };
    setDenomination = denomination => {
        this._denomination = denomination;
        // Update panel value
        this.props.panel.setDenomination(this._denomination);

        // TODO: Update line presenters and bet depending on denomination
        // Update line presenters text
        this.props.linePresenters.setText(this._linesAmount, this._betPerLine);

        this._updateTotalBet();
    }

    get lines() { return this._linesAmount };
    setLines = linesAmount => {
        this._linesAmount = linesAmount;
        // Update panel value
        this.props.panel.setLinesAmount(this._linesAmount);

        // Update line presenters text
        this.props.linePresenters.setText(this._linesAmount, this._betPerLine);

        this._updateTotalBet();
    }

    get betPerLine() { return this._betPerLine };
    setBetPerLine = betPerLine => {
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

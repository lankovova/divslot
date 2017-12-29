class PointsController {
    constructor(props, options) {
        this._userCash; // In coins
        this._userWin; // In points

        this._linesAmount;
        this._betPerLine;

        this._denomination;

        this.props = props;

        this._init(options);
    }

    _init({lines = settings.lines[0], betPerLine = settings.betPerLine[0], denomination = settings.denominations[0], userCash = 0, userWin = 0}) {
        this.setDenomination(denomination);
        this.setLines(lines);
        this.setBetPerLine(betPerLine);
        this.userCash = this.kupsToCoins(userCash);
        this.userWin = userWin;
    }

    coinsToPoints(coins) {
        return Math.floor(coins / this._denomination);
    }
    kupsToPoints(kups) {
        return Math.floor(kups * 100 / this._denomination);
    }
    kupsToCoins(kups) {
        return kups * 100;
    }
    coinsToKups(coins) {
        return coins / 100;
    }
    pointsToCoins(points) {
        return points * this._denomination;
    }
    pointsToKups(points) {
        return points * this._denomination / 100;
    }

    // FIXME: Separate changing and displaying values
    get denomination() { return this._denomination };
    setDenomination = denomination => {
        this._denomination = denomination;

        // Update panel value
        // this.props.panel.setDenomination(this._denomination);
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
        this._userCash = this.pointsToCoins(cash);
        this.props.panel.setUserCash( this.coinsToPoints(this._userCash) );
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

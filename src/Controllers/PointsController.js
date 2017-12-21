class PointsController {
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
        this.userWin = 0;
    }

    static toKups(points) {
        return +(points / 100).toFixed(2);
    }
    static toPoints(kups) {
        return Math.floor(kups * 100);
    }

    get lines() { return this._linesAmount };
    set lines(linesAmount) {
        this._linesAmount = linesAmount;
        // FIXME: Think about calling this functions in Game instead of PointsContorller
        this.props.updateLinePresenters(this._linesAmount, this._betPerLine);
        this.props.panel.setLinesAmount(this._linesAmount);

        this._updateTotalBet();
    }

    get betPerLine() { return PointsController.toPoints(this._betPerLine) };
    set betPerLine(betPerLine) {
        this._betPerLine = PointsController.toKups(betPerLine);
        // FIXME: Think about calling this functions in Game instead of PointsContorller
        this.props.updateLinePresenters(this._linesAmount, this._betPerLine);
        this.props.panel.setBetPerLine(this._betPerLine);

        this._updateTotalBet();
    }

    get totalBet() { return +(this._linesAmount * this._betPerLine).toFixed(2) };

    _updateTotalBet() {
        // FIXME: Think about calling this function in Game instead of PointsContorller
        this.props.panel.setTotalBet(+(this._linesAmount * this._betPerLine).toFixed(2));
    }

    /**
     * Get/Set user cash
     * @param {String|Number} cash New cash to set
     */
    get userCash() { return this._userCash; }
    set userCash(cash) {
        this._userCash = +cash.toFixed(2);
        // FIXME: Think about calling this functions in Game instead of PointsContorller
        this.props.panel.setUserCash(this._userCash);
    }


    /**
     * Get/Set user win
     * @param {String|Number} win New win to set
     */
    get userWin() { return this._userWin; }
    set userWin(win) {
        this._userWin = +win.toFixed(2);
        // FIXME: Think about calling this functions in Game instead of PointsContorller
        this.props.panel.setUserWin(this._userWin);
    }
}

export default PointsController;

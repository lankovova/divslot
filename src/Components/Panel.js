class Panel {
    constructor(node) {
        this.node = node;

        this.notifier = this._initNotifier();
        this.node.appendChild(this.notifier);

        this.userCashNode = this._createPanelRowItem();
        this.userWinNode = this._createPanelRowItem();
        this.linesAmountNode = this._createPanelRowItem();
        this.betPerLineNode = this._createPanelRowItem();
        this.totalBetNode = this._createPanelRowItem();

        const rowWrapper = document.createElement('div');
        rowWrapper.classList = 'panel-row';
        rowWrapper.appendChild(this.userCashNode);
        rowWrapper.appendChild(this.userWinNode);
        rowWrapper.appendChild(this.linesAmountNode);
        rowWrapper.appendChild(this.betPerLineNode);
        rowWrapper.appendChild(this.totalBetNode);
        this.node.appendChild(rowWrapper);
    }

    _createPanelRowItem() {
        const element = document.createElement('div');
        element.classList = 'panel-row-item';

        return element;
    }

    _initNotifier() {
        const element = document.createElement('div');
        element.classList = 'notifier panel-row';
        element.innerText = 'Press start to spin';

        return element;
    }

    setUserCash(cash) {
        this.userCashNode.innerText = `Cash: ${cash}`;
    }

    setUserWin(win) {
        this.userWinNode.innerText = `Win: ${win}`;
    }

    setLinesAmount(lines) {
        this.linesAmountNode.innerText = `Lines: ${lines}`;
    }

    setBetPerLine(betPerLine) {
        this.betPerLineNode.innerText = `Bet/Line: ${betPerLine}`;
    }

    setTotalBet(bet) {
        this.totalBetNode.innerText = `Bet: ${bet}`;
    }

}

export default Panel;
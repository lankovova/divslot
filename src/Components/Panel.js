import Notifier from '../Components/Notifier';

class Panel {
    constructor(node) {
        this.node = node;

        this.userCashNode = this._createPanelRowItem();
        this.userWinNode = this._createPanelRowItem();
        this.denominationNode = this._createPanelRowItem();
        this.linesAmountNode = this._createPanelRowItem();
        this.betPerLineNode = this._createPanelRowItem();
        this.totalBetNode = this._createPanelRowItem();

        document.querySelector('#menuBtn').onmousedown = function() {
            this.style.backgroundPosition = 'bottom left';
        };
        document.querySelector('#menuBtn').onmouseup = function() {
            this.style.backgroundPosition = '';
        };
        document.querySelector('#menuBtn').onmouseleave = function() {
            this.style.backgroundPosition = '';
        };

        this.notifier = new Notifier();
        // this.node.appendChild(this.notifier.node);

        const rowWrapper = document.createElement('div');
        rowWrapper.classList = 'panel-row';
        // rowWrapper.appendChild(this.userCashNode);
        // rowWrapper.appendChild(this.userWinNode);
        // rowWrapper.appendChild(this.denominationNode);
        // rowWrapper.appendChild(this.linesAmountNode);
        // rowWrapper.appendChild(this.betPerLineNode);
        // rowWrapper.appendChild(this.totalBetNode);
        // this.node.appendChild(rowWrapper);
    }

    _createPanelRowItem() {
        const element = document.createElement('div');
        element.classList = 'panel-row-item';

        return element;
    }

    setUserCash(cash) {
        this.userCashNode.innerText = `Cash: ${cash}`;
    }

    setUserWin(win) {
        this.userWinNode.innerText = `Win: ${win}`;
    }

    setDenomination(denom) {
        this.denominationNode.innerText = `Denom: ${denom}`;
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
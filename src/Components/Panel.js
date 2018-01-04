import Notifier from '../Components/Notifier';

class Panel {
    constructor(node) {
        this.node = node;

        const addClickEffect = (el, spriteClickPartPosition) => {
            el.onmousedown = function() { this.style.backgroundPosition = spriteClickPartPosition; };
            el.onmouseup = function() { this.style.backgroundPosition = ''; };
            el.onmouseleave = function() { this.style.backgroundPosition = ''; };
        }
        addClickEffect(document.querySelector('#menuBtn'), 'bottom left');
        addClickEffect(document.querySelector('#linesBtn'), 'bottom left');
        addClickEffect(document.querySelector('#betperlineBtn'), 'bottom left');
        addClickEffect(document.querySelector('#denominationBtn'), 'bottom left');

        this.notifier = new Notifier();
        this.linesAmountField = document.querySelector('#linesAmountField');
        this.betPerLineAmountField = document.querySelector('#betperlineAmountField');
        this.denominationAmountField = document.querySelector('#denominationAmountField');
        this.userCashFields = {
            points: document.querySelector('#userCashPointsField'),
            kups: document.querySelector('#userCashKupsField')
        };

        this.userWinNode = this._createPanelRowItem();
        this.totalBetNode = this._createPanelRowItem();
    }

    _createPanelRowItem() {
        const element = document.createElement('div');
        element.classList = 'panel-row-item';

        return element;
    }

    setUserCash(cash) {
        this.userCashFields.points.innerText = cash.points;
        this.userCashFields.kups.innerText = `${cash.kups} Kups`;
    }

    setUserWin(win) {
        this.userWinNode.innerText = `Win: ${win}`;
    }

    setDenomination(denom) {
        this.denominationAmountField.innerText = denom / 100;
    }

    setLinesAmount(lines) {
        this.linesAmountField.innerText = lines;
    }

    setBetPerLine(betPerLine) {
        this.betPerLineAmountField.innerText = betPerLine;
    }

    setTotalBet(bet) {
        this.totalBetNode.innerText = `Bet: ${bet}`;
    }

}

export default Panel;

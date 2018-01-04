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
        this.totalBetFields = {
            points: document.querySelector('#bet_points_field'),
            kups: document.querySelector('#bet_kups_field'),
        }
        this.userWinFields = {
            points: document.querySelector('#win_points_field'),
            kups: document.querySelector('#win_kups_field'),
        }
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

    // FIXME: Pass object with points and kups here
    setUserWin(win) {
        this.userWinFields.points.innerText = win;
        // this.userWinFields.kups.innerText = `${win} Kup`;
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

    // FIXME: Pass object with points and kups here
    setTotalBet(bet) {
        this.totalBetFields.points.innerText = bet;
        // this.totalBetFields.kups.innerText = `${bet} Kup`;
    }

}

export default Panel;

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

    setUserCash({points, kups}) {
        this.userCashFields.points.innerText = points;
        this.userCashFields.kups.innerText = `${kups} Kups`;
    }

    setUserWin({points, kups}) {
        this.userWinFields.points.innerText = points;
        this.userWinFields.kups.innerText = `${kups} Kup`;
    }

    setDenomination(denom) {
        this.denominationAmountField.innerText = (denom / 100).toFixed(2);
    }

    setLinesAmount(lines) {
        this.linesAmountField.innerText = lines;
    }

    setBetPerLine(betPerLine) {
        this.betPerLineAmountField.innerText = betPerLine;
    }

    setTotalBet({points, kups}) {
        this.totalBetFields.points.innerText = points;
        this.totalBetFields.kups.innerText = `${kups} Kup`;
    }

}

export default Panel;

import Notifier from '../Components/Notifier';
import JackpotBonus from './JackpotBonus';

class Panel {
    constructor(node, props) {
        this.node = node;
        this.props = props;

        this._initButtonsEffect();

        this.notifier = new Notifier();

        this.jb = new JackpotBonus(
            document.querySelector('#jackpotNumber'),
            document.querySelector('#bonusNumber'),
            {jValue: 7765.90, bValue: 6403.83}
        );
        this.jb.run();

        this.linesAmountField = document.querySelector('#linesAmountField');
        this.betPerLineAmountField = document.querySelector('#betperlineAmountField');
        this.denominationAmountField = document.querySelector('#denominationAmountField');

        this.userCashFields = {
            points: document.querySelector('#userCashPointsField'),
            kups: document.querySelector('#userCashKupsField')
        };
        this.userInsuranceFields = {
            points: document.querySelector('#userInsurancePointsField'),
            kups: document.querySelector('#userInsuranceKupsField')
        };
        this.totalBetFields = {
            points: document.querySelector('#bet_points_field'),
            kups: document.querySelector('#bet_kups_field'),
        }
        this.userWinFields = {
            points: document.querySelector('#win_points_field'),
            kups: document.querySelector('#win_kups_field'),
        }

        // TEMP
        this.setUserInsurance({
            points: 1000,
            kups: 10.00
        });

        this._initListeners();
    }

    _initListeners() {
        document.querySelector('#linesBtn').onclick = () => this.props.toggleLinesBlock();
        document.querySelector('#betPerLineBtn').onclick = () => this.props.toggleBetPerLineBlock();
        document.querySelector('#denominationBtn').onclick = () => this.props.toggleDenominationBlock();
    }

    _initButtonsEffect() {
        const addClickEffect = (el, spriteClickPartPosition) => {
            el.onmousedown = function() { this.style.backgroundPosition = spriteClickPartPosition; };
            el.onmouseup = function() { this.style.backgroundPosition = ''; };
            el.onmouseleave = function() { this.style.backgroundPosition = ''; };
        }

        const buttonsSelectors = [
            '#menuBtn',
            '#linesBtn',
            '#betPerLineBtn',
            '#denominationBtn',
            '#autoBtn',
            '#languageBtn',
            '#helpBtn',
            '#historyBtn',
            '#gambleBtn',
            '#maxBtn',
            '#startBtn',
        ]

        buttonsSelectors.forEach(buttonSelector => {
            const button = document.querySelector(buttonSelector);
            addClickEffect(button, 'bottom left');
        });
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

    setUserCash({points, kups}) {
        this.userCashFields.points.innerText = points;
        this.userCashFields.kups.innerText = `${kups.toFixed(2)} Kup`;
    }
    setUserInsurance({points, kups}) {
        this.userInsuranceFields.points.innerText = points;
        this.userInsuranceFields.kups.innerText = `${kups.toFixed(2)} Kup`;
    }

    setUserWin({points, kups}) {
        this.userWinFields.points.innerText = points;
        this.userWinFields.kups.innerText = `${kups.toFixed(2)} Kup`;
    }
    setTotalBet({points, kups}) {
        this.totalBetFields.points.innerText = points;
        this.totalBetFields.kups.innerText = `${kups.toFixed(2)} Kup`;
    }

}

export default Panel;

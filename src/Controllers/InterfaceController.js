import LinePresenters from '../Components/LinePresenters';
import Panel from '../Components/Panel';
import ToggleBlock from './../Components/ToggleBlock';

class InterfaceController {
    constructor(props) {
        console.log(`Controls:
        space - Spin
        < - Increase lines
        > - Increase bet per line
        d - Increase denomination
        m - Set max bet`);

        this.props = props;

        this.state = {
            spin: false,
            stop: false,
            takeWin: false,
            denomination: false,
            lines: false,
            betPerLine: false
        };

        this.linePresenters = new LinePresenters({
            lines: this.props.lines,
            containerNode: this.props.containerNode
        });

        this.linesBlock = new ToggleBlock({
            node: document.querySelector('#linesBlock'),
            items: settings.lines,
            itemParams: {
                width: 50,
                height: 50,
                margin: 5
            }
        }, {
            setValue: this.setLines,
            disableInterface: this.disableInterface,
            enableInterface: this.enableInterface
        });

        this.betPerLineBlock = new ToggleBlock({
            node: document.querySelector('#betPerLineBlock'),
            items: settings.betPerLine,
            itemParams: {
                width: 50,
                height: 50,
                margin: 5
            }
        }, {
            setValue: this.setBerPerLine,
            disableInterface: this.disableInterface,
            enableInterface: this.enableInterface
        });

        this.denominationBlock = new ToggleBlock({
            node: document.querySelector('#denominationBlock'),
            items: settings.denominations,
            itemParams: {
                width: 100,
                height: 100,
                margin: 5
            }
        }, {
            setValue: this.setDenomination,
            disableInterface: this.disableInterface,
            enableInterface: this.enableInterface
        });

        this.panel = new Panel(document.querySelector('#panel'),
        {
            spinStopTake: this.spinStopTake,
            setMaxBet: this.setMaxBet,
            toggleLinesBlock: this.linesBlock.toggle,
            toggleBetPerLineBlock: this.betPerLineBlock.toggle,
            toggleDenominationBlock: this.denominationBlock.toggle,
        });

        this._initKeyboardListeners();
    }

    enableGameStart() {
        this.state.spin = true;
        this.state.denomination = true;
        this.state.lines = true;
        this.state.betPerLine = true;
    }

    disableValuesChange() {
        this.state.denomination = false;
        this.state.lines = false;
        this.state.betPerLine = false;
    }
    enableValuesChange() {
        this.state.denomination = true;
        this.state.lines = true;
        this.state.betPerLine = true;
    }

    disableInterface = () => {
        for (const stateKey of Object.keys(this.state)) {
            this.state[stateKey] = false;
        }
    }
    enableInterface = () => {
        for (const stateKey of Object.keys(this.state)) {
            this.state[stateKey] = true;
        }
    }

    _initKeyboardListeners() {
        window.onkeyup = (event) => {
            var keyCode = event.which || event.keyCode;

            switch (keyCode) {
                // Space
                case 32:
                    this.spinStopTake();
                    break;
                // <
                case 188:
                    this.setLines();
                    break;
                // >
                case 190:
                    this.setBerPerLine();
                    break;
                // m
                case 77:
                    this.setMaxBet();
                    break;
                // d
                case 68:
                    this.setDenomination();
                    break;
                default: {}
            }
        }
    }

    spinStopTake = () => {
        if (this.state.spin) {
            this.props.spinReels();
        } else if (this.state.stop) {
            this.props.stopReels();
        } else if (this.state.takeWin) {
            this.props.takeWin();
        }
    }

    setLines = (lines) => {
        if (this.state.lines) {
            this.props.setLines(lines);
        }
    }

    setBerPerLine = (betPerLine) => {
        if (this.state.betPerLine) {
            this.props.setBerPerLine(betPerLine);
        }
    }

    setDenomination = (denomination) => {
        if (this.state.denomination) {
            this.props.setDenomination(denomination);
        }
    }

    setMaxBet = () => {
        if (this.state.lines && this.state.betPerLine) {
            this.props.setMaxBet();
        }
    }

}

export default InterfaceController;

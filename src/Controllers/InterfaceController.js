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

        const that = this;

        this.props = props;

        this.linePresenters = new LinePresenters({
            lines: this.props.lines,
            containerNode: this.props.containerNode
        });

        // Init toggling blocks like lines, betPerLine and denomination
        this._initTogglingBlocks();

        this.panel = new Panel(document.querySelector('#panel'), {
            spinStopTake: this.spinStopTake,
            setMaxBet: this.setMaxBet,
            toggleLinesBlock: this.toggleLinesBlock,
            toggleBetPerLineBlock: this.toggleBetPerLineBlock,
            toggleDenominationBlock: this.toggleDenominationBlock,
        });

        this.state = {
            _spin: false,
            stop: false,
            takeWin: false,
            denomination: false,
            lines: false,
            betPerLine: false,

            set spin(newState) {
                if (newState) {
                    that.panel.startBtn.enable();
                } else {
                    that.panel.startBtn.disable();
                }

                this._spin = newState;
            },
            get spin() { return this._spin; }
        };

        this._initKeyboardListeners();
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

    toggleLinesBlock = () => {
        if (this.state.lines) {
            this.linesBlock.toggle();
        }
    }

    toggleBetPerLineBlock = () => {
        if (this.state.betPerLine) {
            this.betPerLineBlock.toggle();
        }
    }

    toggleDenominationBlock = () => {
        if (this.state.denomination) {
            this.denominationBlock.toggle();
        }
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

    enableLines = () => {
        this.state.lines = true;
    }
    enableBetPerLines = () => {
        this.state.betPerLine = true;
    }
    enableDenomination = () => {
        this.state.denomination = true;
    }

    setIdle = () => {
        this.enableInterface();
        this.state.spin = true;
    }

    disableInterface = () => {
        for (const stateKey of Object.keys(this.state)) {
            // Skip private properties
            if (stateKey.charAt(0) === '_') continue;

            this.state[stateKey] = false;
        }
    }

    enableInterface = () => {
        const bannedStates = ['spin', 'stop', 'takeWin'];

        for (const stateKey of Object.keys(this.state)) {
            // Skip private properties
            if (stateKey.charAt(0) === '_') continue;

            // Skip if state is in bannedStates array
            if (bannedStates.includes(stateKey)) continue;

            this.state[stateKey] = true;
        }
    }

    _initKeyboardListeners() {
        window.onkeyup = (event) => {
            var keyCode = event.which || event.keyCode;

            switch (keyCode) {
                case 32: // Space
                    this.spinStopTake();
                    break;
                case 188: // <
                    this.setLines();
                    break;
                case 190: // >
                    this.setBerPerLine();
                    break;
                case 77: // m
                    this.setMaxBet();
                    break;
                case 68: // d
                    this.setDenomination();
                    break;
                default: {}
            }
        }
    }

    _initTogglingBlocks() {
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
            enableSelf: this.enableLines,
            setInterfaceIdle: this.setIdle,
            disableInterface: this.disableInterface,
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
            enableSelf: this.enableBetPerLines,
            setInterfaceIdle: this.setIdle,
            disableInterface: this.disableInterface,
        });

        this.denominationBlock = new ToggleBlock({
            node: document.querySelector('#denominationBlock'),
            items: settings.denominations,
            itemParams: {
                width: 80,
                height: 80,
                margin: 5
            }
        }, {
            setValue: this.setDenomination,
            enableSelf: this.enableDenomination,
            setInterfaceIdle: this.setIdle,
            disableInterface: this.disableInterface,
        });
    }

}

export default InterfaceController;

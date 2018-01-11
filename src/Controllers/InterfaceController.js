import LinePresenters from '../Components/LinePresenters';
import Panel from '../Components/Panel';
import ToggleBlock from './../Components/ToggleBlock';

class InterfaceController {
    constructor(props) {
        this.props = props;
        const that = this;

        // DEV TEMP
        this._showControls();

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
            _stop: false,
            _takeWin: false,
            _denomination: false,
            _lines: false,
            _betPerLine: false,
            _maxBet: false,

            // TODO: Maybe segregate this states into buttons components
            // TODO: Disable start btn if all of its states are disabled
            set spin(newState) {
                if (newState)
                    that.panel.startBtn.text = 'Start';

                this._spin = newState;
            },
            get spin() { return this._spin; },
            set stop(newState) {
                if (newState)
                    that.panel.startBtn.text = 'Stop';

                this._stop = newState;
            },
            get stop() { return this._stop; },
            set takeWin(newState) {
                if (newState)
                    that.panel.startBtn.text = 'Take';

                this._takeWin = newState;
            },
            get takeWin() { return this._takeWin; },

            set denomination(newState) {
                if (newState)
                    that.panel.denominationBtn.enable();
                else
                    that.panel.denominationBtn.disable();

                this._denomination = newState;
            },
            get denomination() { return this._denomination; },
            set lines(newState) {
                if (newState)
                    that.panel.linesBtn.enable();
                else
                    that.panel.linesBtn.disable();

                this._lines = newState;
            },
            get lines() { return this._lines; },
            set betPerLine(newState) {
                if (newState)
                    that.panel.betPerLineBtn.enable();
                else
                    that.panel.betPerLineBtn.disable();

                this._betPerLine = newState;
            },
            get betPerLine() { return this._betPerLine; },
            set maxBet(newState) {
                if (newState)
                    that.panel.maxBetBtn.enable();
                else
                    that.panel.maxBetBtn.disable();

                this._maxBet = newState;
            },
            get maxBet() { return this._maxBet; },
        };

        this._initKeyboardListeners();
    }

    _showControls() {
        console.log(
        `Controls:
            space - Spin
            < - Increase lines
            > - Increase bet per line
            d - Increase denomination
            m - Set max bet`
        );
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

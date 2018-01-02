import LinePresenters from '../Components/LinePresenters';
import Panel from '../Components/Panel';

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
        this.panel = new Panel(document.querySelector('#panel'));

        this._initKeyboardListeners();
    }

    enableGameStart() {
        this.state.spin = true;
        this.state.denomination = true;
        this.state.lines = true;
        this.state.betPerLine = true;
    }

    enableBetChange() {
        this.state.lines = true;
        this.state.betPerLine = true;
    }
    disableBetChange() {
        this.state.lines = false;
        this.state.betPerLine = false;
    }

    _initKeyboardListeners() {
        window.onkeyup = event => {
            var keyCode = event.which || event.keyCode;

            switch (keyCode) {
                // Space
                case 32: {
                    if (this.state.spin) {
                        this.props.spinReels();
                    } else if (this.state.stop) {
                        this.props.stopReels();
                    } else if (this.state.takeWin) {
                        this.props.takeWin();
                    }

                    break;
                }
                // <
                case 188: {
                    if (this.state.lines) {
                        // Increase lines amount
                        this.props.setLines();
                    }
                    break;
                }
                // >
                case 190: {
                    if (this.state.betPerLine) {
                        // Increase bet per line
                        this.props.setBerPerLine();
                    }
                    break;
                }
                // m
                case 77: {
                    if (this.state.lines && this.state.betPerLine) {
                        this.props.setMaxBet();
                    }
                    break;
                }
                // d
                case 68: {
                    if (this.state.denomination) {
                        this.props.setDenomination();
                    }
                    break;
                }
                default: {
                    // console.log(`Key ${keyCode} pressed`);
                }
            }
        }
    }
}

export default InterfaceController;

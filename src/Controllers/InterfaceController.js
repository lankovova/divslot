import LinePresenters from '../Components/LinePresenters';
import Panel from '../Components/Panel';

class InterfaceController {
    constructor(props) {
        this.props = props;

        this.state = {
            spin: true,
            stop: false,
            takeWin: false
        };

        this.linePresenters = new LinePresenters({
            lines: this.props.lines,
            containerNode: this.props.containerNode
        });
        this.panel = new Panel(document.querySelector('#panel'));

        this._initKeyboardListeners();
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
                    // Increase lines amount
                    this.props.setLines();
                    break;
                }
                // >
                case 190: {
                    // Increase bet per line
                    this.props.setBerPerLine();
                    break;
                }
                case 77: {
                    this.props.setMaxBet();
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

import Interface from '../Components/Interface';
import Panel from '../Components/Panel';

class InterfaceController {
    constructor(props) {
        this.props = props;

        // FIXME: Maybe remove unnecessary Interface class
        this.interface = new Interface({
            lines: this.props.lines,
            containerNode: this.props.containerNode
        });

        this.state = {
            spin: true,
            stop: false,
            takeWin: false
        };

        this.panel = new Panel(document.querySelector('#panel'));

        this._initKeyboardListeners();
    }

    _initKeyboardListeners() {
        window.onkeyup = e => {
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
                default: {
                    // console.log(`Key ${keyCode} pressed`);
                }
            }
        }
    }
}

export default InterfaceController;
import Interface from '../Components/Interface'

class InterfaceController {
    /**
     * 
     * @param {Object{Array<Line>}} props 
     */
    constructor(props) {
        this.props = props;

        this.interface = new Interface({
            lines: this.props.lines,
            containerId: this.props.containerId
        });

        this.state = {
            spin: true,
            stop: false
        };

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
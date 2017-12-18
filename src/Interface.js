import settings from './settings.json';

class Interface {
    constructor(props) {
        this.props = props;

        this.state = {
            spin: true,
            stop: false
        };

        this.initKeyboardListeners();
    }

    initKeyboardListeners() {
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

export default Interface;
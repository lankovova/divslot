import Button from './Button';

class MaxBetBtn extends Button {
    constructor(props) {
        super(props);

        this.props = props;

        this.node.onclick = () => this.props.setMaxBet();
    }

    // _initOtherListeners() {
        // document.querySelector('#linesBtn').onclick = () => this.props.toggleLinesBlock();
        // document.querySelector('#betPerLineBtn').onclick = () => this.props.toggleBetPerLineBlock();
        // document.querySelector('#denominationBtn').onclick = () => this.props.toggleDenominationBlock();
        // document.querySelector('#maxBtn').onclick = () => this.props.setMaxBet();
    // }
}

export default MaxBetBtn;
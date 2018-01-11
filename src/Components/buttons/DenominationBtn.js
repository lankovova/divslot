import Button from './Button';

export default class DenominationBtn extends Button {
    constructor(props) {
        super(props);

        this.props = props;

        this.node.onclick = () => this.props.toggleDenominationBlock();
    }
}

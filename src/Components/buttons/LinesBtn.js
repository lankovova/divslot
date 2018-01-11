import Button from './Button';

export default class LinesBtn extends Button {
    constructor(props) {
        super(props);

        this.props = props;

        this.node.onclick = () => this.props.toggleLinesBlock();
    }
}

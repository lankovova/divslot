export default class Alert {
    constructor(props) {
        this.node = props.node;
        this.contentNode = this.node.querySelector('.content');
    }

    show() {
        this.node.style.display = 'flex';
    }

    hide() {
        this.node.style.display = 'none';
    }

    set text(newText) {
        this.contentNode.innerText = newText;
    }

    get isOn() {
        if (this.node.style.display !== 'none')
            return true;

        return false;
    }
}
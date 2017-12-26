class Notifier {
    constructor() {
        this._node = document.createElement('div');
        this._node.classList = 'notifier panel-row';
        // FIXME:
        this._node.innerText = 'Init text';
    }

    clear() {
        // this._node.innerText = '';
        this._node.innerText = '...';
    }

    set text(text) {
        this._node.innerText = text;
    }

    get node() {
        return this._node;
    }
}

export default Notifier;
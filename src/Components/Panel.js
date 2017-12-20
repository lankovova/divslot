class Panel {
    constructor(node) {
        this.node = node;

        this.userCashNode = this._initUserCashElement();
        this.node.appendChild(this.userCashNode);

        this.userWinNode = this._initUserWinElement();
        this.node.appendChild(this.userWinNode);
    }

    _initUserCashElement() {
        const element = document.createElement('div');

        element.id = 'userCash';
        // TODO: Set starting user cash later
        element.innerText = `Cash: ${0}`;

        return element;
    }

    _initUserWinElement() {
        const element = document.createElement('div');

        element.id = 'userWin';
        element.innerText = `Win: 0`;

        return element;
    }

    setUserCash(cash) {
        this.userCashNode.innerText = `Cash: ${cash}`;
    }

    setUserWin(win) {
        this.userWinNode.innerText = `Win: ${win}`;
    }
}

export default Panel;
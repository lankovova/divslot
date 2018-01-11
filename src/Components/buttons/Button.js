export default class Button {
    constructor(props) {
        this.node = props.node;

        this._initPressEffect();
    }

    _initPressEffect() {
        this.node.onmouseenter = function() {
            if (this.style.backgroundPosition !== 'right bottom') {
                this.style.backgroundPosition = 'right top';
            }
        }
        this.node.onmousedown = function() {
            if (this.style.backgroundPosition !== 'right bottom') {
                this.style.backgroundPosition = 'left bottom';
            }
        };
        this.node.onmouseup = function() {
            if (this.style.backgroundPosition !== 'right bottom') {
                this.style.backgroundPosition = 'left top';
            }
        };
        this.node.onmouseleave = function() {
            if (this.style.backgroundPosition !== 'right bottom') {
                this.style.backgroundPosition = 'left top';
            }
        };
    }

    disable() {
        this.node.style.backgroundPosition = 'bottom right';
    }

    enable() {
        this.node.style.backgroundPosition = 'top left';
    }

    set text(newText) {
        this.node.innerText = newText;
    }
}

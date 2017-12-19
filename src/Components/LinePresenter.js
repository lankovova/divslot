class LinePresenter {
    /**
     * Show/hide line 
     * @param {Line} line Line that will be show/hide
     */
    constructor(line) {
        this.line = line;
        // Create node
        this.node = document.createElement('div');
        this.node.style.background = 'white';
        this.node.text = '';
        this.node.className += 'line_presenter';
        // Init listners
        this.node.onmousedown = () => this.line.show();
        this.node.onmouseup = () => this.line.hide();
    }

    set text(text) {
        this.node.innerText = text;
    }
}

export default LinePresenter;
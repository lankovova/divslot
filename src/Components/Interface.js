import s from '../settings.json';
import LinePresenter from './LinePresenter';

class Interface {
    constructor({lines, containerNode}) {
        this.linePresenters = [];

        this.lines = lines;
        this.container = containerNode;

        this._initLinePresenters();
    }

    /**
     * Set bet per line value to specific line presenters
     * @param {Number} linesAmount Amount of lines to set bet per line
     * @param {Number} betPerLine Bet per line to set in presenters
     */
    setLinePresentersText = (linesAmount, betPerLine) => {
        for (const linePresenter of this.linePresenters) {
            linePresenter.text = (linePresenter.line.lineTypeNumber < linesAmount) ? betPerLine : '';
        }
    }

    _initLinePresenters() {
        const pLeft = document.createElement('div');
        this.container.prepend(pLeft);
        pLeft.className += 'line_presenters_container left';

        const pRight = document.createElement('div');
        this.container.appendChild(pRight);
        pRight.className += 'line_presenters_container right';

        for (const lineIndex of s.linePresenterLeftLines) {
            const presenter = new LinePresenter(this.lines[lineIndex]);
            pLeft.appendChild(presenter.node);
            this.linePresenters.push(presenter);
        }

        for (const lineIndex of s.linePresenterRightLines) {
            const presenter = new LinePresenter(this.lines[lineIndex]);
            pRight.appendChild(presenter.node);
            this.linePresenters.push(presenter);
        }
    }

}

export default Interface;

import s from '../settings.json';
import LinePresenter from './LinePresenter'

class Interface {

    constructor({lines, containerId}) {
        this.linePresenters = [];

        this.lines = lines;
        this.container = document.getElementById(containerId);
        
        this._initLinePresenters();
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
            console.log(lineIndex, this.lines[lineIndex].lineTypeNumber)
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
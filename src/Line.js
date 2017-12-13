import s from './settings.json'

class Line {

    constructor(containerId) {
        console.log('line')
        this.svgNode = document.createElement('svg');
        document.getElementById(containerId).appendChild(this.svgNode)

        this.svgNode.style.width = this._lineWidth() + 'px';
        this.svgNode.style.height = this._lineHeight() + 'px';
        this.svgNode.style.display = "block"
        this.svgNode.style.position = "absolute"
    }

    showLine() {
        this.svgNode.style.display = "block"
    }

    hideLine() {
        this.svgNode.style.display = "none"
    }

    _lineWidth() {
        return s.symbolSize * s.numOfReels + 
        s.spaceBetweenReels * (s.numOfReels - 1);
    }

    _lineHeight() {
        return s.numOfRows * s.symbolSize;
    }
}

export default Line
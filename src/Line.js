import s from './settings.json'

class Line {
    /**
     * 
     * @param {String} containerId 
     * @param {String} strokeColor 
     */
    constructor(containerId, strokeColor) {
        this.namespaceURI = "http://www.w3.org/2000/svg";
        this.strokeWidth = 5;
        this.strokeColor = strokeColor;
        this.rectNodes = [];

        this.svgNode = document.createElementNS(this.namespaceURI, 'svg');
        document.getElementById(containerId).appendChild(this.svgNode);

        this.svgNode.style.width = this._lineWidth() + 'px';
        this.svgNode.style.height = this._lineHeight() + 'px';
        this.svgNode.style.display = "none";
        this.svgNode.style.position = "absolute";
        this.svgNode.style.zIndex = "1";
    }

    showLine() {
        this.svgNode.style.display = "block";
    }

    hideLine() {
        this.svgNode.style.display = "none";
    }
    /**
     * 
     * @param {Number} x 
     * @param {Number} y 
     */
    addSymbolHighlite(x, y) {
        let rectNode = document.createElementNS(this.namespaceURI, 'rect');
        this.svgNode.appendChild(rectNode);
        this.rectNodes.push(rectNode);

        rectNode.setAttributeNS(null, "width", s.symbolSize - this.strokeWidth);
        rectNode.setAttributeNS(null, "height", s.symbolSize - this.strokeWidth);
        rectNode.setAttributeNS(null, "x", x);
        rectNode.setAttributeNS(null, "y", y);
        rectNode.setAttributeNS(null, "stroke", this.strokeColor);
        rectNode.setAttributeNS(null, "fill", 'transparent');
        rectNode.setAttributeNS(null, "stroke-width", this.strokeWidth);  
    }

    connectHighlites() {
        let lineNode;
        let correction = 5;
        let lastRectI = this.rectNodes.length - 1;
        let rWidth = s.symbolSize;
        let rx, ry, rx2, ry2,
            // Start coordinates of line
            x1, y1,
            // End coordinates of line
            x2, y2;

        for (const [i, rectNode] of this.rectNodes.entries()) {
            let lineNode = document.createElementNS(this.namespaceURI, 'line');
            this.svgNode.appendChild(lineNode);
            // If its` last element
            if (i === lastRectI) break;
            // Get x, y of element
            rx = parseFloat(rectNode.getAttribute('x'));
            ry = parseFloat(rectNode.getAttribute('y'));
            // Get x, y of next element
            rx2 = parseFloat(this.rectNodes[i + 1].getAttribute('x'));
            ry2 = parseFloat(this.rectNodes[i + 1].getAttribute('y'));

            if (ry === ry2) { // If element in a line with next element

                x1 = rx + rWidth - correction;
                y1 = ry + rWidth / 2;
                x2 = rx2 + 1;
                y2 = ry2 + rWidth / 2;

            } else if (ry > ry2) { // If element below next element

                x1 = rx + rWidth - correction;
                y1 = ry;
                x2 = rx2 ;
                y2 = ry2 + rWidth - correction;

            } else if (ry < ry2) { // If element higher next element

                x1 = rx + rWidth - correction;
                y1 = ry + rWidth - correction;
                x2 = rx2;
                y2 = ry2;

            }

            lineNode.setAttributeNS(null, "x1", x1);
            lineNode.setAttributeNS(null, "y1", y1);
            lineNode.setAttributeNS(null, "x2", x2);
            lineNode.setAttributeNS(null, "y2", y2);
            lineNode.setAttributeNS(null, "stroke", this.strokeColor);
            lineNode.setAttributeNS(null, "stroke-width", this.strokeWidth); 

        } 
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
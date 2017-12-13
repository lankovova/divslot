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
        let linNode;
        let correction = 5;
        let lastRectI = this.rectNodes.length - 1;
        let rWidth = s.symbolSize;
        
            // current highlite coordinates
        let rCoord = {x, y},
            // next highlite coordinates
            rNextCoord = {x, y},
            // Start coordinates of line
            start = {x, y}
            // End coordinates of line
            end = {x, y}

        for (const [i, rectNode] of this.rectNodes.entries()) {
            lineNode = document.createElementNS(this.namespaceURI, 'line');
            this.svgNode.appendChild(lineNode);
            // If its` last element
            if (i === lastRectI) break;
            // Get x, y of current element
            rCoord.x = parseFloat(rectNode.getAttribute('x'));
            rCoord.y = parseFloat(rectNode.getAttribute('y'));
            // Get x, y of next element
            rNextCoord.x = parseFloat(this.rectNodes[i + 1].getAttribute('x'));
            rNextCoord.y = parseFloat(this.rectNodes[i + 1].getAttribute('y'));

            if (ry === ry2) { // If element in a line with next element

                start.x = rCoord.x + rWidth - correction;
                start.y = rCoord.y + rWidth / 2;
                end.x = rNextCoord.x + 1;
                end.y = rNextCoord.y + rWidth / 2;

            } else if (ry > ry2) { // If element below next element

                start.x = rCoord.x + rWidth - correction;
                start.y = rCoord.y;
                end.x = rNextCoord.x ;
                end.y = rNextCoord.y + rWidth - correction;

            } else if (ry < ry2) { // If element higher next element

                start.x = rx + rWidth - correction;
                start.y = ry + rWidth - correction;
                end.x = rx2;
                end.y = ry2;

            }

            lineNode.setAttributeNS(null, "x1", start.x);
            lineNode.setAttributeNS(null, "y1", start.y);
            lineNode.setAttributeNS(null, "x2", end.x);
            lineNode.setAttributeNS(null, "y2", end.y);
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
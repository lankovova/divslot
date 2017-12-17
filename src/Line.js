import s from './settings.json'

class Line {
    /**
     * 
     * @param {String} containerId 
     * @param {String} strokeColor 
     */
    constructor(containerId, strokeColor, lineTypeNumber, reels) {
        this.namespaceURI = "http://www.w3.org/2000/svg";
        this.strokeWidth = 5;
        // this.
        this.strokeColor = strokeColor;
        this.rectNodes = [];
        this.container = document.getElementById(containerId);
        this.lineTypeNumber = lineTypeNumber;
        this.lineTypes = s.lineTypes;
        this.lineType = this.lineTypes[this.lineTypeNumber - 1];
        this.reels = reels;

        this.svgNode = document.createElementNS(this.namespaceURI, 'svg');
        this.container.appendChild(this.svgNode);

        this.svgNode.style.width = this._lineWidth() + 'px';
        this.svgNode.style.height = this._lineHeight() + 'px';
        this.svgNode.style.display = "none";
        this.svgNode.style.position = "absolute";
        this.svgNode.style.zIndex = "1";
    }

    show() {
        this.svgNode.style.display = "block";
    }

    hide() {
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

        rectNode.setAttributeNS(null, "width", s.symbolSize );
        rectNode.setAttributeNS(null, "height", s.symbolSize );
        rectNode.setAttributeNS(null, "x", x);
        rectNode.setAttributeNS(null, "y", y);
        rectNode.setAttributeNS(null, "stroke", this.strokeColor);
        rectNode.setAttributeNS(null, "fill", 'transparent');
        rectNode.setAttributeNS(null, "stroke-width", this.strokeWidth);  
    }

    connectHighlites() {
        let lineNode;
        let coord = {};

        for(let i = 0; i < s.numOfReels; i++) {

            lineNode = document.createElementNS(this.namespaceURI, 'line');
            this.svgNode.appendChild(lineNode);

            if (i === (s.numOfReels - 1)) {
                coord = this._createLastConnection(i);
            } else if (this.rectNodes[i] && this.rectNodes[i + 1]) {
                coord = this._createConnectionToSymbol(i);
            } else {
                coord = this._createConnectionToSymbolCenter(i);
            }

            lineNode.setAttributeNS(null, "x1", coord.start.x);
            lineNode.setAttributeNS(null, "y1", coord.start.y);
            lineNode.setAttributeNS(null, "x2", coord.end.x);
            lineNode.setAttributeNS(null, "y2", coord.end.y);
            lineNode.setAttributeNS(null, "stroke", this.strokeColor);
            lineNode.setAttributeNS(null, "stroke-width", this.strokeWidth);
        }
    }

    _createLastConnection(i) {
        let [sMap, rMap] = this.lineType[i];
            // current highlite coordinates
        let symbol;
        let rWidth = s.symbolSize;
        let rCoord = {x: 0, y: 0},
            // Start coordinates of line
            start = {x: 0, y: 0},
            // End coordinates of line
            end = {x: 0, y: 0};

        symbol = this.reels[rMap].finalSymbols[sMap];
        rCoord = symbol.getPosition();

        start.x = rCoord.x + rWidth / 2;
        start.y = rCoord.y + rWidth / 2;
        end.x = rCoord.x + rWidth;
        end.y = rCoord.y + rWidth / 2;

        return {start, end};
    }

    _createConnectionToSymbolCenter(i) {
        let [sMap, rMap] = this.lineType[i];
        let [sMapNext, rMapNext] = this.lineType[i + 1];
        let correction = 5;
        let rWidth = s.symbolSize;
        let symbol, symbolNext;
            // current highlite coordinates
        let rCoord = {x: 0, y: 0},
            // next highlite coordinates
            rNextCoord = {x: 0, y: 0},
            // Start coordinates of line
            start = {x: 0, y: 0},
            // End coordinates of line
            end = {x: 0, y: 0};
        // x, y of curr element
        symbol = this.reels[rMap].finalSymbols[sMap];
        rCoord = symbol.getPosition();
        // x, y of prev element
        symbolNext = this.reels[rMapNext].finalSymbols[sMapNext];
        rNextCoord = symbolNext.getPosition();

        if (rCoord.y === rNextCoord.y) { // If element in a line with next element
            start.x = rCoord.x + rWidth;
            start.y = rCoord.y + rWidth / 2;
            end.x = rNextCoord.x + rWidth / 2;
            end.y = rNextCoord.y + rWidth / 2;
        } else if (rCoord.y > rNextCoord.y) { // If element below next element
            start.x = rCoord.x + rWidth;
            start.y = rCoord.y + rWidth;
            end.x = rNextCoord.x;
            end.y = rNextCoord.y + rWidth;
        } else if (rCoord.y < rNextCoord.y) { // If element higher next element
            start.x = rCoord.x + rWidth;
            start.y = rCoord.y + rWidth;
            end.x = rNextCoord.x;
            end.y = rNextCoord.y;
        }

        if (!rNextCoord.highlighted) {
            end.x = rNextCoord.x + rWidth / 2;
            end.y = rNextCoord.y + rWidth / 2;
        }

        if (!symbol.highlighted) {
            start.x = rCoord.x + rWidth / 2;
            start.y = rCoord.y + rWidth / 2;
            end.x = rNextCoord.x + rWidth / 2;
            end.y = rNextCoord.y + rWidth / 2;
        }

        // if (symbolPrev.highlighted && !symbol.highlighted) {
        //     start.x = rPrevCoord.x + rWidth;
        //     start.y = rPrevCoord.y + rWidth;
        //     end.x = rCoord.x + rWidth / 2;
        //     end.y = rCoord.y + rWidth / 2;
        // }
        
        return {start, end};
    }

    _createConnectionToSymbol(i) {
        let rectNode = this.rectNodes[i];
        let correction = 5;
        let rWidth = s.symbolSize;
            // current highlite coordinates
        let rCoord = {x: 0, y: 0},
            // next highlite coordinates
            rNextCoord = {x: 0, y: 0},
            // Start coordinates of line
            start = {x: 0, y: 0},
            // End coordinates of line
            end = {x: 0, y: 0};
        // Get x, y of current element
        rCoord.x = parseFloat(rectNode.getAttribute('x'));
        rCoord.y = parseFloat(rectNode.getAttribute('y'));
        // Get x, y of next element
        rNextCoord.x = parseFloat(this.rectNodes[i + 1].getAttribute('x'));
        rNextCoord.y = parseFloat(this.rectNodes[i + 1].getAttribute('y'));

        if (rCoord.y === rNextCoord.y) { // If element in a line with next element
            start.x = rCoord.x + rWidth;
            start.y = rCoord.y + rWidth / 2;
            end.x = rNextCoord.x;
            end.y = rNextCoord.y + rWidth / 2;
        } else if (rCoord.y > rNextCoord.y) { // If element below next element
            start.x = rCoord.x + rWidth;
            start.y = rCoord.y;
            end.x = rNextCoord.x ;
            end.y = rNextCoord.y + rWidth;
        } else if (rCoord.y < rNextCoord.y) { // If element higher next element
            start.x = rCoord.x + rWidth;
            start.y = rCoord.y + rWidth;
            end.x = rNextCoord.x;
            end.y = rNextCoord.y;
        }

        return {start, end};
    }
    
    _lineWidth() {
        return this.container.offsetWidth;
    }

    _lineHeight() {
        return this.container.offsetHeight;
    }
}

export default Line
import s from './settings.json'

class Line {
    /**
     * @param {String} containerId id of element where svg will be appended
     * @param {String} strokeColor color of the line
     * @param {Number} lineTypeNumber index of the settings.lineTypes
     * @param {Object} reels reel objects
     */
    constructor(containerId, strokeColor, lineTypeNumber, reels) {
        this.namespaceURI = "http://www.w3.org/2000/svg";
        this.strokeWidth = 5;
        this.strokeColor = strokeColor;
        this.rectNodes = [];
        this.container = document.getElementById(containerId);
        this.lineTypeNumber = lineTypeNumber;
        this.lineTypes = s.lineTypes;
        this.lineType = this.lineTypes[this.lineTypeNumber];
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
     * Create highlite around symbol
     * @param {Number} x symbols` position x
     * @param {Number} y symbols` position y
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
    /**
     * Connect highlited symbols
     */
    connectHighlites(symbolType) {
        let lineNode;
        let coord = {};
        let sPrev, symbol, sNext, sMap, rMap;

        for(let i = 0; i < s.numOfReels; i++) {
            // Create DOM element
            lineNode = document.createElementNS(this.namespaceURI, 'line');
            this.svgNode.appendChild(lineNode);
            // Get previous symbol
            if (i !== 0) {
                [sMap, rMap] = this.lineType[i - 1];
                sPrev = this.reels[rMap][symbolType][sMap];
            } else { 
                sPrev = null; 
            }
            // Get symbol
            [sMap, rMap] = this.lineType[i];
            symbol = this.reels[rMap][symbolType][sMap];
            // Get next symbol
            if (i !== (s.numOfReels - 1)) {
                [sMap, rMap] = this.lineType[i + 1];
                sNext = this.reels[rMap][symbolType][sMap];
            } else { 
                sNext = null; 
            }

            this._createConnection(lineNode, sPrev, symbol, sNext);
            
            if (!symbol.highlighted && i === (s.numOfReels - 1)) {
                this._createLastConnection(symbol);
            }
            if (!symbol.highlighted && i === 0) {
                this._createFirstConnection(symbol);
            }

        }
    }

    _createFirstConnection(symbol) {
        let lineNode = document.createElementNS(this.namespaceURI, 'line');
        this.svgNode.appendChild(lineNode);

        let sCoord = symbol.getPosition();

        let start = {
            x: sCoord.x,
            y: sCoord.y + s.symbolSize / 2
        }
        let end = {
            x: sCoord.x + s.symbolSize / 2,
            y: sCoord.y + s.symbolSize / 2
        }

        this._setLineAttrs(lineNode, start, end); 
    }

    _createLastConnection(symbol) {
        let lineNode = document.createElementNS(this.namespaceURI, 'line');
        this.svgNode.appendChild(lineNode);

        let sCoord = symbol.getPosition();

        let start = {
            x: sCoord.x + s.symbolSize / 2,
            y: sCoord.y + s.symbolSize / 2
        }
        let end = {
            x: sCoord.x + s.symbolSize,
            y: sCoord.y + s.symbolSize / 2
        }

        this._setLineAttrs(lineNode, start, end);
    }

    _createConnection(lineNode, sPrev, symbol, sNext) {

        let start = {};
        let end = {};

        if (!sPrev) { // symbol is first
            start.x = (symbol.highlighted) ? (symbol.x + s.symbolSize) : (symbol.x + s.symbolSize / 2);
            end.x = (sNext.highlighted) ? (sNext.x) : (sNext.x + s.symbolSize / 2);
            if (symbol.y === sNext.y) { // symbols in line
                start.y = symbol.y + s.symbolSize / 2;
                end.y = sNext.y + s.symbolSize / 2;
            } else if (symbol.y > sNext.y) { // symbol below next
                start.y = (symbol.highlighted) ? (symbol.y) : (symbol.y + s.symbolSize / 2);
                end.y = (sNext.highlighted) ? (sNext.y + s.symbolSize) : (sNext.y + s.symbolSize / 2);
            } else if (symbol.y < sNext.y) { // symbol under next
                start.y = (symbol.highlighted) ? (symbol.y + s.symbolSize) : (symbol.y + s.symbolSize / 2);
                end.y = (sNext.highlighted) ? (sNext.y) : (sNext.y + s.symbolSize / 2);
            }
        } else { // symbol is last
            start.x = (sPrev.highlighted) ? (sPrev.x + s.symbolSize) : (sPrev.x + s.symbolSize / 2);
            end.x = (symbol.highlighted) ? (symbol.x) : (symbol.x + s.symbolSize / 2);
            if (symbol.y === sPrev.y) { // symbols in line
                start.y = symbol.y + s.symbolSize / 2;
                end.y = symbol.y + s.symbolSize / 2;
            } else if (symbol.y > sPrev.y) { // symbol below prev
                start.y = (sPrev.highlighted) ? (sPrev.y + s.symbolSize) : (sPrev.y + s.symbolSize / 2);
                end.y = (symbol.highlighted) ? (symbol.y) : (symbol.y + s.symbolSize / 2);
            } else if (symbol.y < sPrev.y) { // symbol under prev
                start.y = (sPrev.highlighted) ? (sPrev.y) : (sPrev.y + s.symbolSize / 2);
                end.y = (symbol.highlighted) ? (symbol.y + s.symbolSize) : (symbol.y + s.symbolSize / 2);
            }
        }
        
        this._setLineAttrs(lineNode, start, end);
    }

    _setLineAttrs(lineNode, start, end) {
        lineNode.setAttributeNS(null, "x1", start.x);
        lineNode.setAttributeNS(null, "y1", start.y);
        lineNode.setAttributeNS(null, "x2", end.x);
        lineNode.setAttributeNS(null, "y2", end.y);
        lineNode.setAttributeNS(null, "stroke", this.strokeColor);
        lineNode.setAttributeNS(null, "stroke-width", this.strokeWidth);
        lineNode.setAttributeNS(null, "stroke-linecap", 'round');  
    }

    _lineWidth() {
        return this.container.offsetWidth;
    }

    _lineHeight() {
        return this.container.offsetHeight;
    }
}

export default Line
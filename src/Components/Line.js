class Line {
    /**
     * @param {HTMLElement} containerNode node of element where svg will be appended
     * @param {String} strokeColor color of the line
     * @param {Number} lineTypeNumber index of the settings.lineTypes
     * @param {Array} reels reel objects
     */
    constructor(containerNode, strokeColor, lineTypeNumber, points, reels) {
        this.namespaceURI = "http://www.w3.org/2000/svg";
        this.strokeWidth = 5;
        this.strokeColor = strokeColor;
        this.rectNodes = [];
        this.container = containerNode;
        this.lineTypeNumber = lineTypeNumber;
        this.lineType = settings.lineTypes[lineTypeNumber];
        this.reels = reels;

        this.points = points;

        this.svgNode = document.createElementNS(this.namespaceURI, 'svg');
        this.container.appendChild(this.svgNode);

        this.svgNode.style.width = "100%";
        this.svgNode.style.height = "100%";
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

    remove() {
        this.svgNode.remove();
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

        rectNode.setAttributeNS(null, "width", settings.symbolSize );
        rectNode.setAttributeNS(null, "height", settings.symbolSize );
        rectNode.setAttributeNS(null, "x", x);
        rectNode.setAttributeNS(null, "y", y);
        rectNode.setAttributeNS(null, "stroke", this.strokeColor);
        rectNode.setAttributeNS(null, "fill", 'transparent');
        rectNode.setAttributeNS(null, "stroke-width", this.strokeWidth);
    }
    /**
     * Connect highlited symbols
     */
    connectHighlites() {
        let lineNode;
        let coord = {};
        let sPrev, symbol, sNext, sMap, rMap;

        for(let i = 0; i < settings.numOfReels; i++) {
            // Create DOM element
            lineNode = document.createElementNS(this.namespaceURI, 'line');
            this.svgNode.appendChild(lineNode);
            // Get previous symbol
            if (i !== 0) {
                [sMap, rMap] = this.lineType[i - 1];
                sPrev = this.reels[rMap].finalSymbols[sMap];
            } else {
                sPrev = null;
            }
            // Get symbol
            [sMap, rMap] = this.lineType[i];
            symbol = this.reels[rMap].finalSymbols[sMap];
            // Get next symbol
            if (i !== (settings.numOfReels - 1)) {
                [sMap, rMap] = this.lineType[i + 1];
                sNext = this.reels[rMap].finalSymbols[sMap];
            } else {
                sNext = null;
            }

            this._createConnection(lineNode, sPrev, symbol, sNext);

            if (!symbol.highlighted && i === (settings.numOfReels - 1)) {
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

        let start = {
            x: symbol.x,
            y: symbol.y + settings.symbolSize / 2
        }
        let end = {
            x: symbol.x + settings.symbolSize / 2,
            y: symbol.y + settings.symbolSize / 2
        }

        this._setLineAttrs(lineNode, start, end);
    }

    _createLastConnection(symbol) {
        let lineNode = document.createElementNS(this.namespaceURI, 'line');
        this.svgNode.appendChild(lineNode);

        let start = {
            x: symbol.x + settings.symbolSize / 2,
            y: symbol.y + settings.symbolSize / 2
        }
        let end = {
            x: symbol.x + settings.symbolSize,
            y: symbol.y + settings.symbolSize / 2
        }

        this._setLineAttrs(lineNode, start, end);
    }

    _createConnection(lineNode, sPrev, symbol, sNext) {

        let start = {};
        let end = {};

        if (!sPrev) { // symbol is first
            start.x = (symbol.highlighted) ? (symbol.x + settings.symbolSize) : (symbol.x + settings.symbolSize / 2);
            end.x = (sNext.highlighted) ? (sNext.x) : (sNext.x + settings.symbolSize / 2);
            if (symbol.y === sNext.y) { // symbols in line
                start.y = symbol.y + settings.symbolSize / 2;
                end.y = sNext.y + settings.symbolSize / 2;
            } else if (symbol.y > sNext.y) { // symbol below next
                start.y = (symbol.highlighted) ? (symbol.y) : (symbol.y + settings.symbolSize / 2);
                end.y = (sNext.highlighted) ? (sNext.y + settings.symbolSize) : (sNext.y + settings.symbolSize / 2);
            } else if (symbol.y < sNext.y) { // symbol under next
                start.y = (symbol.highlighted) ? (symbol.y + settings.symbolSize) : (symbol.y + settings.symbolSize / 2);
                end.y = (sNext.highlighted) ? (sNext.y) : (sNext.y + settings.symbolSize / 2);
            }
        } else { // symbol is last
            start.x = (sPrev.highlighted) ? (sPrev.x + settings.symbolSize) : (sPrev.x + settings.symbolSize / 2);
            end.x = (symbol.highlighted) ? (symbol.x) : (symbol.x + settings.symbolSize / 2);
            if (symbol.y === sPrev.y) { // symbols in line
                start.y = symbol.y + settings.symbolSize / 2;
                end.y = symbol.y + settings.symbolSize / 2;
            } else if (symbol.y > sPrev.y) { // symbol below prev
                start.y = (sPrev.highlighted) ? (sPrev.y + settings.symbolSize) : (sPrev.y + settings.symbolSize / 2);
                end.y = (symbol.highlighted) ? (symbol.y) : (symbol.y + settings.symbolSize / 2);
            } else if (symbol.y < sPrev.y) { // symbol under prev
                start.y = (sPrev.highlighted) ? (sPrev.y) : (sPrev.y + settings.symbolSize / 2);
                end.y = (symbol.highlighted) ? (symbol.y + settings.symbolSize) : (symbol.y + settings.symbolSize / 2);
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
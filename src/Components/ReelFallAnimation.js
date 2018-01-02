import Symbol from './SymbolFallAnimation';

class ReelFallAnimation {
    /**
     * Create reel with starting symbols in it
     * @param {Number} reelIndex Index of reel in Game
     * @param {Function} onStop Function to call when reel has stopped
     */
    constructor(reelIndex, onStop) {
        this.finalSymbols = [];

        this.reelNode;
        this.reelIndex = reelIndex;

        this.props = {
            onStop
        };

        this._init();
    }

    /**
     * Spin reel to final symbols
     * @param {Array<Symbol>} finalSymbols Array of final symbols
     */
    async spin(finalSymbols) {
        this.addFinalSymbols(finalSymbols);

        // Animate spin
        for (let i = 0; i < this.finalSymbols.length; i++) {
            console.log(i);
            await this.finalSymbols[i].fall(i);
        }
    }

    /**
     * Remove old symbols from reel
     */
    removeOldSymbols() {
        while (this.reelNode.firstChild) {
            this.reelNode.removeChild(this.reelNode.firstChild);
        }
    }

    _init() {
        this.reelNode = document.createElement('div');
        this.reelNode.className = 'reel';
        this.reelNode.style.transition = `transform ${settings.spinAnimationTimeInMs}ms ${settings.spinAnimTimingFunc}`;
        this.reelNode.style.height = `${settings.symbolSize * (settings.numOfRows + 1)}px`; // + bonus slot for hidden symbol

        // Init starting symbols
        for (let i = 0; i < settings.numOfRows; i++) {
            const symbol = new Symbol(Math.floor(Math.random() * settings.symbols.length));
            symbol.node.style.bottom = `${settings.symbolSize * (i)}px`;
            this.finalSymbols.push(symbol);
            // Add symbol into reel node
            this.reelNode.appendChild(symbol.node);
        }

        const reelWrapperNode = document.createElement('div');
        reelWrapperNode.className = 'reel_wrapper';
        reelWrapperNode.style.width = `${settings.symbolSize}px`;
        reelWrapperNode.style.height = `${settings.symbolSize * settings.numOfRows}px`;
        reelWrapperNode.style.margin = `0 ${settings.spaceBetweenReels / 2}px`;
        reelWrapperNode.appendChild(this.reelNode);

        document.querySelector('#reels_container').appendChild(reelWrapperNode);
    }

    /**
     * Add final symbols to reel
     * @param {Array<Symbol>} finalSymbols Array of Symbols
     */
    addFinalSymbols(finalSymbols) {
        this.finalSymbols = finalSymbols.slice().reverse();

        this.addSymbols(finalSymbols);
    }

    /**
     * Add symbols to reel
     * @param {Array<Symbol>} symbolsArr Array of Symbols to add to reel
     */
    addSymbols(symbolsArr) {
        for (let i = symbolsArr.length - 1; i >= 0; i--) {
            const symbol = symbolsArr[i];
            this.reelNode.insertBefore(symbol.node, this.reelNode.firstChild);
        }
    }

    resetReel() {
        // Remove useless symbols
        while (this.reelNode.childNodes.length !== settings.numOfRows) {
            this.reelNode.removeChild(this.reelNode.childNodes[settings.numOfRows]);
        }

        // Remove spin animation time to move reel
        this.reelNode.style.transitionDuration = '0ms';
        // Set reel in default position
        this.reelNode.style.transform = '';

        // Set spin animation time back
        setTimeout(() => {
            // Reset spin duration
            this.reelNode.style.transitionDuration = `${settings.spinAnimationTimeInMs}ms`;
        }, 0);
    }
}

export default ReelFallAnimation;

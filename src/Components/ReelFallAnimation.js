import Symbol from './SymbolFallAnimation';
import Reel from './Reel';
import {transitionEnd} from '../events';

export default class ReelFallAnimation extends Reel{
    /**
     * Create reel with starting symbols in it
     * @param {Number} reelIndex Index of reel in Game
     * @param {Function} onStop Function to call when reel has stopped
     */
    constructor(reelIndex, onStop) {
        super(reelIndex, onStop);
    }

    /**
     * Spin reel to final symbols
     * @param {Array<Symbol>} finalSymbols Array of final symbols
     */
    spin(finalSymbols) {
        this.addFinalSymbols(finalSymbols);

        // Animate spin
        for (let i = 0; i < this.finalSymbols.length; i++) {
            this.finalSymbols[i].fall(i);
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
        this.reelNode.style.height = `${settings.symbolSize * (settings.numOfRows + 1)}px`; // + bonus slot for hibben symbol

        // Init starting symbols
        for (let i = 0; i < settings.numOfRows; i++) {
            const symbol = new Symbol(Math.floor(Math.random() * settings.symbolsAmount));
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

        this._initListeners();
    }
  
}

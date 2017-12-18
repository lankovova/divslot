import Symbol from './Symbol';
import settings from './settings.json';
import {transitionEnd} from './events';

class Reel {
    /**
     * Create reel with starting symbols in it
     * @param {Number} reelIndex Index of reel in Game
     * @param {Function} onStop Function to call when reel has stopped
     */
    constructor(reelIndex, onStop) {
        this.finalSymbols = [];

        this.reelNode;
        this.reelIndex = reelIndex;
        this._delayBetweenReelsSpin = settings.delayBetweenReelsSpin;

        this.props = {
            onStop: onStop
        };

        this._init();
    }

    _init() {
        this.reelNode = document.createElement('div');
        this.reelNode.className = 'reel';
        this.reelNode.style.transition = `transform ${settings.spinAnimationTimeInMs}ms ${settings.spinAnimTimingFunc}`;

        // Init starting symbols
        for (let i = 0; i < settings.numOfRows; i++) {
            const symbol = new Symbol(Math.floor(Math.random() * (settings.symbolsAmount - 1)) + 1);
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

        document.querySelector('#reels_wrapper').appendChild(reelWrapperNode);

        this._initListeners();
    }

    _initListeners() {
        // End spin animation event
        this.reelNode.addEventListener(transitionEnd, () => {
            this.resetReel();
            // Call passed function in constuctor
            this.props.onStop(this.reelIndex);
        });
    }

    /**
     * Spin reel to final symbols
     * @param {Array<Symbol>} finalSymbols Array of final symbols
     */
    spin(finalSymbols) {
        this.addSpinningSymbols();
        this.addFinalSymbols(finalSymbols);

        // Animate spin
        this.reelNode.style.transform = `translate(0, ${(settings.numOfSpinsBeforeStop * settings.numOfRows + settings.numOfRows)* settings.symbolSize}px)`;

        // Resolve promise after delay between starting reels spin
        return new Promise(resolve => {
            setTimeout(() => {
                resolve();
            }, this._delayBetweenReelsSpin);
        });
    }

    addSpinningSymbols() {
        let spinningSymbolsArr = [];

        for (let i = 0; i < settings.numOfSpinsBeforeStop * settings.numOfRows ; i++) {
            const symbol = new Symbol(Math.floor(Math.random() * (settings.symbolsAmount - 1)) + 1);
            spinningSymbolsArr.push(symbol);
        }

        this.addSymbols(spinningSymbolsArr);
    }

    /**
     * Add final symbols to reel
     * @param {Array<Symbol>} finalSymbols Array of Symbols
     */
    addFinalSymbols(finalSymbols) {
        this.finalSymbols.push(...finalSymbols);

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

    /**
     * Set new delay between reels spin
     * @param {Number} ms Delay between spinning reels in milliseconds
     */
    set delayBetweenReelsSpin(ms) {
        ms = parseInt(ms);

        if (ms < 0) {
            console.warn(`Ms is <0. ms = ${ms}`);
            return;
        }

        this._delayBetweenReelsSpin = ms;
    }
}

export default Reel;
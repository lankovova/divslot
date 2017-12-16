import Reel from './Reel';
import Symbol from './Symbol';
import settings from './settings.json';

class ReelsContorller {
    /**
     * Creates reel controller in specific node
     * @param {HTMLElement} gameNode Node to place reels at
     * @param {Function} onReelsHasStopped Function to call when all reels has stopped
     */
    constructor(gameNode, onReelsHasStopped) {
        this.reels = [];

        this.props = {
            onReelsHasStopped: onReelsHasStopped
        };

        this._initReels(gameNode);
    }

    _initReels(gameNode) {
        const reelsWrapper = document.createElement('div');
        reelsWrapper.id = 'reels_wrapper';

        gameNode.appendChild(reelsWrapper);

        for (let i = 0; i < settings.numOfReels; i++) {
            // Fill created reel with random symbols
            this.reels.push(new Reel(i, this.onReelStop));
        }
        // Set delay between spins to 0 in last reel
        // to not to block thread in @spinReels for useless time
        this.reels[settings.numOfReels - 1].delayBetweenReelsSpin = 0;
    }

    async spinReels(finalSymbolsMap) {
        // For each reel
        for (let i = 0; i < this.reels.length; i++) {
            let finalSymbols = this.getReelSymbolsFromSymbolsMap(finalSymbolsMap, i);

            // Wait previous reel to resolve before spinning next
            await this.reels[i].spin(finalSymbols);
        }
    }

    onReelStop = reelIndex => {
        // Check if last reel has stopped
        if (reelIndex === this.reels.length - 1) {
            // Set previous delay betwwen reels spin start
            this.setDelayBeforeReelSpins(settings.delayBetweenReelsSpin);
            this.props.onReelsHasStopped();
        }
    }

    stopReels() {
        this.setDelayBeforeReelSpins(0);
    }

    /**
     * Get array of reel symbols from symbols map
     * @param {Array<Array>} symbolsMap Symbols map in two dimensional array
     * @param {Number} reelIndex Reel index
     * @returns {Array<Symbol>} Returns array of reel symbols
     */
    getReelSymbolsFromSymbolsMap(symbolsMap, reelIndex) {
        let resultArray = [];

        for (let i = 0; i < symbolsMap.length; i++) {
            resultArray.push(new Symbol(symbolsMap[i][reelIndex]));
        }

        return resultArray;
    }

    /**
     * Set new delay for all reels between each reel spin
     * @param {Number} ms Delay between reels in milliseconds
     */
    setDelayBeforeReelSpins(ms) {
        for (const reel of this.reels) {
            reel.delayBetweenReelsSpin = ms;
        }
    }
}

export default ReelsContorller;
import Reel from './Reel';
import Symbol from './Symbol';
import settings from './settings.json';

class ReelsContorller {
    constructor(gameNode, reelsHasStopped) {
        this.reels = [];

        this.props = {
            onReelsHasStopped: reelsHasStopped
        };

        this.initReels(gameNode);
    }

    initReels(gameNode) {
        const reelsWrapper = document.createElement('div');
        reelsWrapper.id = 'reels_wrapper';

        gameNode.appendChild(reelsWrapper);

        for (let i = 0; i < settings.numOfReels; i++) {
            // Fill created reel with random symbols
            this.reels.push(new Reel(i, this.onReelStop));
        }
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
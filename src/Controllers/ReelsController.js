import Reel from '../Components/Reel';
import Symbol from '../Components/Symbol';
import settings from '../settings.json';

class ReelsContorller {
    /**
     * Creates reel controller in specific node
     * @param {Function} onReelsHasStopped Function to call when all reels has stopped
     */
    constructor(containerNode, onReelsHasStopped) {
        this.reels = [];
        this.delayBetweenReelsSpin = settings.delayBetweenReelsSpin;

        this.props = {
            onReelsHasStopped
        };
        this.container = containerNode;

        this._initReels(this.container);
    }

    _initReels() {
        const reelsWrapper = document.createElement('div');
        reelsWrapper.id = 'reels_container';

        this.container.appendChild(reelsWrapper);

        for (let i = 0; i < settings.numOfReels; i++) {
            // Fill created reel with random symbols
            this.reels.push(new Reel(i, this.onReelStop));
        }
    }

    /**
     * Spin all reels to final symbols
     * @param {Number[][]} finalSymbolsMap Map of final symbols
     */
    async spinReels(finalSymbolsMap) {
        // For each reel
        for (let i = 0; i < this.reels.length; i++) {
            let finalSymbols = this.getReelSymbolsFromSymbolsMap(finalSymbolsMap, i);

            // Wait previous reel to resolve before spinning next
            await this.spinReel(this.reels[i], finalSymbols);
        }
    }

    /**
     * Spins the given reel
     * @param {Reel} reel Reel to spin
     * @param {Symbol[]} finalSymbols Array of final symbols in current reel
     */
    spinReel(reel, finalSymbols) {
        reel.spin(finalSymbols);

        // Resolve promise after delay between reels spin
        return new Promise(resolve => {
            setTimeout(() => {
                resolve();
            }, this.delayBetweenReelsSpin);
        });
    }

    onReelStop = reelIndex => {
        // Check if last reel has stopped
        if (reelIndex === this.reels.length - 1) {
            // Set previous delay betwwen reels spin start
            this.delayBetweenReelsSpin = settings.delayBetweenReelsSpin;

            this.props.onReelsHasStopped();
        }
    }

    stopReels() {
        this.delayBetweenReelsSpin = 0;
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
}

export default ReelsContorller;

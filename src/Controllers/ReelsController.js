// import Reel from '../Components/ReelFallAnimation';
import Reel from '../Components/Reel';

class ReelsContorller {
    /**
     * Creates reel controller in specific node
     * @param {HTMLElement} containerNode HTMLNode to place reel in
     * @param {Object} props Props from parent
     */
    constructor(containerNode, props) {
        this.reels = [];
        this.delayBetweenReelsSpin = settings.delayBetweenReelsSpin;

        this.props = props;
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
        // Delay before start reels spin
        await (() => new Promise(resolve => setTimeout(resolve, settings.delayBeforeStartReelsSpin)))();

        // For each reel
        for (let i = 0; i < this.reels.length; i++) {
            let finalSymbols = this.getReelSymbolsFromSymbolsMap(finalSymbolsMap, i);

            // Wait previous reel to resolve before spinning next
            await this.spinReel(this.reels[i], finalSymbols);
        }
    }

    /**
     * Spin all reels to final symbols
     * @param {Number[][]} finalSymbolsMap Map of final symbols
     */
    // async spinFallReels(finalSymbolsMap) {
    //     // For each reel
    //     for (let i = 0; i < this.reels.length; i++) {
    //         let finalSymbols = this.getReelSymbolsFromSymbolsMap(finalSymbolsMap, i);

    //         // Clear reel
    //         this.reels[i].removeOldSymbols();

    //         // Add final symbols to reel
    //         this.reels[i].addFinalSymbols(finalSymbols);
    //     }

    //     // Delay before start reels spin
    //     await (() => new Promise(resolve => setTimeout(resolve, settings.delayBeforeStartReelsSpin)))();

    //     // For each reel
    //     for (let i = 0; i < this.reels.length; i++) {

    //         // Wait previous reel to resolve before spinning next
    //         await this.spinReel(this.reels[i]);
    //     }
    // }

    /**
     * Spins the given reel
     * @param {Reel} reel Reel to spin
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
            // Wait until all is done and call stack is free
            setTimeout(() => this.props.reelsHasStopped(), 0);
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
            resultArray.push(symbolsMap[i][reelIndex]);
            // resultArray.push(new Symbol(symbolsMap[i][reelIndex]));
        }

        return resultArray;
    }
}

export default ReelsContorller;

import Reel from './Reel';
import Symbol from './Symbol';
import Interface from './Interface';
import LineController from './LineController';
import Line from './Line'
import settings from './settings.json';

import axios from 'axios';

class Game {
    /**
     * Create game object
     * @param {String} gameName Game name
     */
    constructor(gameName) {
        this.gameName = gameName;
        this.reels = [];
        this.gameNode = document.querySelector('#game');

        // Store for spin response data
        this.spinResponse = {};

        this.interface = new Interface(this);

        this.initReels();
    }

    initReels() {
        const reelsWrapper = document.createElement('div');
        reelsWrapper.id = 'reels_wrapper';

        this.gameNode.appendChild(reelsWrapper);

        // TODO: Create ReelController class
        // FIXME: Move to Reel
        for (let i = 0; i < settings.numOfReels; i++) {
            let reelSymbols = [];
            for (let j = settings.numOfRows - 1; j >= 0; j--) {
                reelSymbols.push(new Symbol(Math.floor(Math.random() * (settings.symbolsAmount - 1)) + 1));
            }
            // Fill created reel with random symbols
            this.reels.push(new Reel(i, reelSymbols, this.onReelStop.bind(this)));
        }
    }

    /**
     * Enable interface spin if last reel has stopped
     * @param {Number} reelIndex Index of reel that has stopped
     */
    onReelStop(reelIndex) {
        // Check if last reel has stopped
        if (reelIndex === this.reels.length - 1) {
            this.interface.state.spin = true;

            this.setDelayBeforeReelSpins(settings.delayBeforeSpinNextReel);

            let lineController = new LineController(Object.assign({}, this.spinResponse.game.game_result));
            lineController.showWinningLines(Object.assign({}, this.reels));
        }
    }

    async spin() {
        this.interface.state.spin = false;
        this.interface.state.stop = true;

        // Getting spin data
        const response = await axios.get('https://5a323abdbd9f1c00120b6570.mockapi.io/win');
        this.spinResponse = response.data[0];

        console.log(this.spinResponse);

        const symbolsMap = this.spinResponse.game.symbols_map;

        // For each reel
        for (let i = 0; i < this.reels.length; i++) {
            let finalSymbols = this.getSymbolsInSpecificReel(symbolsMap, i);

            // Wait previous reel to resolve before spinning next
            await this.reels[i].spin(finalSymbols);
        }
    }

    getSymbolsInSpecificReel(symbolsMap, reelIndex) {
        let resultArray = [];

        for (let i = 0; i < symbolsMap.length; i++) {
            resultArray.push(new Symbol(symbolsMap[i][reelIndex]));
        }

        return resultArray;
    }

    stopReels() {
        this.interface.state.stop = false;

        this.setDelayBeforeReelSpins(0);
    }

    /**
     * Set new delay for all reels between each reel spin
     * @param {Number} ms Delay between reels in milliseconds
     */
    setDelayBeforeReelSpins(ms) {
        for (const reel of this.reels) {
            reel.setDelayBetweenReelsSpin(ms);
        }
    }
}

export default Game;
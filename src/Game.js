import Reel from './Reel';
import Symbol from './Symbol';
import Interface from './Interface';
import settings from './settings.json';

import axios from 'axios';

class Game {
    constructor(gameName) {
        this.gameName = gameName;
        this.reels = [];
        this.gameNode = document.querySelector('#game');

        this.interface = new Interface(this);

        this.initReels();
    }

    initReels() {
        const reelsWrapper = document.createElement('div');
        reelsWrapper.id = 'reels_wrapper';

        this.gameNode.appendChild(reelsWrapper);

        for (let i = 0; i < settings.numOfReels; i++) {
            let reelSymbols = [];
            for (let j = 0; j < settings.numOfRows; j++) {
                reelSymbols.push(new Symbol(Math.floor(Math.random() * (settings.symbolsAmount - 1)) + 1));
            }
            // Fill created reel with random symbols
            this.reels.push(new Reel(i, reelSymbols, this.onStop.bind(this)));
        }
    }

    /**
     * Enable interface spin if last reel has stopped
     * @param {Number} reelIndex Index of reel that has stopped
     */
    onStop(reelIndex) {
        // Check if last reel has stopped
        if (reelIndex === this.reels.length - 1) {
            this.interface.state.spin = true;
        }
    }

    async spin() {
        this.interface.state.spin = false;
        this.interface.state.stop = true;

        // TODO: Use data from response
        // TEMP: Getting spin result
        const response = await axios.get('https://5a3118e8e1dbbf00127011f8.mockapi.io/api/spin');
        console.log(response.data[0]);

        // For each reel
        for (let i = 0; i < this.reels.length; i++) {
            let finalSymbols = [];
            for (let i = 0; i < settings.numOfRows; i++) {
                // Randomize symbols
                const symbol = new Symbol(Math.floor(Math.random() * (settings.symbolsAmount - 1)) + 1);
                finalSymbols.push(symbol);
            }

            // Wait previous reel to resolve before spinning next
            await this.reels[i].spin(finalSymbols);
        }
    }
}

export default Game;
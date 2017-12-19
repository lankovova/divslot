import Interface from './Components/Interface';
import ReelsController from './Controllers/ReelsController';
import LinesController from './Controllers/LinesController';
import settings from './settings.json';

import axios from 'axios';

class Game {
    /**
     * Create game object
     * @param {String} gameName Game name
     */
    constructor(gameName) {
        this.gameName = gameName;

        this.gameNode = document.querySelector('#game');
        // Store for spin response data
        this.spinResponse = {};

        this.interface = new Interface({spinReels: this.spinReels, stopReels: this.stopReels});
        this.reelsController = new ReelsController(this.gameNode, this.reelsHasStopped);
        this.linesController = new LinesController(document.querySelector('#game_wrapper'), this.reelsController.reels);
    }

    reelsHasStopped = () => {
        console.log('All reels has stopped ' + this.gameName);
        this.interface.state.spin = true;

        this.linesController.showWinningLines(this.spinResponse.game.game_result, settings.delayBetweenShowingWinningLines);
    }

    spinReels = async () => {
        console.log('Spin reels');

        this.interface.state.spin = false;
        this.interface.state.stop = true;

        // Getting spin data
        const response = await axios.get('https://5a323abdbd9f1c00120b6570.mockapi.io/win2');
        this.spinResponse = response.data[0];
        console.log(this.spinResponse);

        const symbolsMap = this.spinResponse.game.symbols_map;

        this.reelsController.spinReels(symbolsMap);
    }

    stopReels = () => {
        console.log('Stop reels');

        this.interface.state.stop = false;

        this.reelsController.stopReels();
    }
}

export default Game;
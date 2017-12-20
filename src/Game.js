import CashController from './Controllers/CashController';
import ReelsController from './Controllers/ReelsController';
import LinesController from './Controllers/LinesController';
import InterfaceController from './Controllers/InterfaceController';
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

        this.cashController = new CashController();
        this.reelsController = new ReelsController(
            document.querySelector('#reels_wrapper'),
            {
                reelsHasStopped: this.reelsHasStopped
            }
        );

        this.linesController = new LinesController(
            document.querySelector('#game_wrapper'),
            {
                reels: this.reelsController.reels,
                linesHasShowed: this.linesHasShowed
            }
        );

        this.interfaceController = new InterfaceController({
            spinReels: this.spinReels,
            stopReels: this.stopReels,
            takeWin: this.takeWin,
            lines: this.linesController.lines,
            containerNode: document.querySelector('#reels_wrapper')
        });
    }

    takeWin = () => {
        console.log('Take win');
    }

    linesHasShowed = () => {
        console.log('All lines has showed');
    }

    spinReels = async () => {
        console.log('Spin reels');

        // Disable spin
        this.interfaceController.state.spin = false;
        // Enable stop
        this.interfaceController.state.stop = true;

        // Getting spin data
        const response = await axios.get('https://5a323abdbd9f1c00120b6570.mockapi.io/win2');
        this.spinResponse = response.data[0];
        console.log(this.spinResponse);

        const symbolsMap = this.spinResponse.game.symbols_map;

        this.reelsController.spinReels(symbolsMap);
    }

    stopReels = () => {
        console.log('Stop reels');

        this.interfaceController.state.stop = false;

        this.reelsController.stopReels();
    }

    // Method called when all reels has stopped
    reelsHasStopped = () => {
        // FIXME: Enable spin only after all lines has showed and user has took his win
        this.interfaceController.state.spin = true;

        this.linesController.showWinningLines(this.spinResponse.game.game_result, settings.delayBetweenShowingWinningLines);
    }

}

export default Game;
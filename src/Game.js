import CashController from './Controllers/CashController';
import ReelsController from './Controllers/ReelsController';
import LinesController from './Controllers/LinesController';
import InterfaceController from './Controllers/InterfaceController';
import settings from './settings.json';

import axios from 'axios';

class Game {
    constructor(gameName) {
        this.gameName = gameName;

        this.gameNode = document.querySelector('#game');
        // Store for spin response data
        this.spinResponse = {};

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

        this.cashController = new CashController({
            panel: this.interfaceController.panel
        });
    }

    // All winning lines has shown event
    linesHasShowed = () => {
        this.interfaceController.state.takeWin = true;
    }

    // TODO: Make this func async for iterative win transfering
    takeWin = () => {
        this.interfaceController.state.takeWin = false;

        // Update user cash
        this.cashController.userCash = this.spinResponse.game.user_cash;
        // Reset user win
        this.cashController.userWin = 0;

        // TODO: Enable after taking win
        this.interfaceController.state.spin = true;
    }

    spinReels = async () => {
        // Disable spin
        this.interfaceController.state.spin = false;
        // Enable stop
        this.interfaceController.state.stop = true;

        // Getting spin data
        this.spinResponse = (await axios.get('https://5a323abdbd9f1c00120b6570.mockapi.io/win2')).data[0];
        console.log(this.spinResponse);

        const symbolsMap = this.spinResponse.game.symbols_map;

        this.reelsController.spinReels(symbolsMap);
    }

    stopReels = () => {
        this.interfaceController.state.stop = false;

        this.reelsController.stopReels();
    }

    // All reels has stopped event
    reelsHasStopped = () => {
        this.interfaceController.state.stop = false;

        if (this.spinResponse.game.user_win) {
            // Show all winning lines
            // and update user win line by line
            this.linesController.showWinningLines(this.spinResponse.game.game_result, intermidiateWin => this.cashController.userWin += intermidiateWin);
        } else {
            // In no win then allow spin
            this.interfaceController.state.spin = true;
        }

        // Checking for free spins
        // if (this.spinResponse.free_games) {
        //     // Free spins here
        //     if (this.spinResponse.free_games.length !== 0) {
        //         this.spinReels();
        //     }
        // }

    }

}

export default Game;
import PointsController from './Controllers/PointsController';
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
            setMaxBet: this.setMaxBet,
            increaseLinesAmount: this.increaseLinesAmount,
            increaseBetPerLine: this.increaseBetPerLine,
            lines: this.linesController.lines,
            containerNode: document.querySelector('#reels_wrapper')
        });

        this.pointsController = new PointsController({
                userCash: 100,
                userWin: 0,
                lines: 1,
                betPerLine: 1
            },
            {
                panel: this.interfaceController.panel
            }
        );
    }

    // FIXME: Move this func pattern into Helper class
    increaseLinesAmount = () => {
        const currentLineIndex = settings.lines.indexOf(this.pointsController.lines);
        const newLineIndex = (currentLineIndex === settings.lines.length - 1) ? 0 : currentLineIndex + 1;

        this.pointsController.lines = settings.lines[newLineIndex];
    }
    // FIXME: Move this func pattern into Helper class
    increaseBetPerLine = () => {
        const currentBetPerLineIndex = settings.betPerLine.indexOf(this.pointsController.betPerLine);
        const newBetPerLineIndex = (currentBetPerLineIndex === settings.betPerLine.length - 1) ? 0 : currentBetPerLineIndex + 1;

        this.pointsController.betPerLine = settings.betPerLine[newBetPerLineIndex];
    }
    setMaxBet = () => {
        this.pointsController.lines = settings.lines[settings.lines.length - 1];
        this.pointsController.betPerLine = settings.betPerLine[settings.betPerLine.length - 1];
    }

    // All winning lines has shown event
    linesHasShowed = () => {
        this.interfaceController.state.takeWin = true;
    }

    // TODO: Make this func async for iterative win transfering
    takeWin = () => {
        this.interfaceController.state.takeWin = false;

        // Update user cash
        this.pointsController.userCash = this.spinResponse.user_cash;
        // Reset user win
        this.pointsController.userWin = 0;

        // TODO: Enable after taking win
        this.interfaceController.state.spin = true;
    }

    spinReels = async () => {
        // Disable spin
        this.interfaceController.state.spin = false;
        // Enable stop
        this.interfaceController.state.stop = true;

        // Getting spin data
        this.spinResponse = (await axios.post('http://admin.chcgreen.org/spin', {
            lines_amount: this.pointsController.lines,
            bet_per_line: this.pointsController.betPerLine
        })).data;
        console.log(this.spinResponse);

        const symbolsMap = this.spinResponse.final_symbols;

        // FIXME:
        // Decrease user cash
        this.pointsController.userCash = 100 - this.pointsController.totalBet;

        this.reelsController.spinReels(symbolsMap);
    }

    stopReels = () => {
        this.interfaceController.state.stop = false;

        this.reelsController.stopReels();
    }

    // All reels has stopped event
    reelsHasStopped = () => {
        this.interfaceController.state.stop = false;

        if (this.spinResponse.won) { // Win case
            // Show all winning lines
            // and update user win line by line
            this.linesController.showWinningLines(this.spinResponse.spin_result, intermidiateWin => this.pointsController.userWin += intermidiateWin);
        } else { // Lose case
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
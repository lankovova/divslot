import {getNextArrayItem} from './Helpers/ArrayMethods';
import PointsController from './Controllers/PointsController';
import ReelsController from './Controllers/ReelsController';
import LinesController from './Controllers/LinesController';
import InterfaceController from './Controllers/InterfaceController';

import axios from 'axios';

class Game {
    constructor(gameName) {
        this.gameName = gameName;

        console.log(`Controls:
        space - Spin
        < - Increase lines
        > - Increase bet per line
        m - Set max bet`);

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
            setLines: this.setLines,
            setBerPerLine: this.setBerPerLine,
            setMaxBet: this.setMaxBet,
            lines: this.linesController.lines,
            containerNode: document.querySelector('#reels_wrapper')
        });

        this.pointsController = new PointsController({
                userCash: 100,
                userWin: 0,
                lines: 1,
                betPerLine: 1
            }, {
                panel: this.interfaceController.panel,
                updateLinePresenters: this.interfaceController.linePresenters.setText
            }
        );
    }

    setMaxBet = () => {
        this.setLines(settings.lines[settings.lines.length - 1]);
        this.setBerPerLine(settings.betPerLine[settings.betPerLine.length - 1]);
    }
    setLines = lines => {
        const newLines = lines ? lines : getNextArrayItem(settings.lines, this.pointsController.lines);
        this.pointsController.lines = newLines;
    }
    setBerPerLine = betPerLine => {
        const newBetPerLine = betPerLine ? betPerLine : getNextArrayItem(settings.betPerLine, this.pointsController.betPerLine);
        this.pointsController.betPerLine = newBetPerLine;
    }

    // All winning lines has shown event
    linesHasShowed = () => {
        this.interfaceController.state.takeWin = true;

        this.interfaceController.panel.notifier.text = 'Take win or gamble';
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
        this.interfaceController.panel.notifier.text = 'Press start to spin';
    }

    spinReels = async () => {
        this.interfaceController.panel.notifier.clear();
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
            // and update user win line by line in callback
            this.linesController.showWinningLines(this.spinResponse.spin_result, intermidiateWin => {
                this.pointsController.userWin += intermidiateWin;
                this.interfaceController.panel.notifier.text = `You won ${this.pointsController.userWin} points`;
            });
        } else { // Lose case
            // In no win then allow spin
            this.interfaceController.state.spin = true;
            this.interfaceController.panel.notifier.text = 'Press start to spin';
        }

        // Checking for free spins
        if (this.spinResponse.free_spins) {
            // Free spins here
            console.log('Free spins won');

            // if (this.spinResponse.free_spins_result.length !== 0) {
            // }
        }

    }

}

export default Game;

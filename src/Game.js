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
                reels: this.reelsController.reels
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
                linePresenters: this.interfaceController.linePresenters
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

        // FIXME: PHP = nedo yazuk
        this.spinResponse.won_cash = +this.spinResponse.won_cash;
        this.spinResponse.user_cash = +this.spinResponse.user_cash;
        if (this.spinResponse.free_spins_won_cash) this.spinResponse.free_spins_won_cash = +this.spinResponse.free_spins_won_cash;
        this.spinResponse.spin_result.map(line => {
            line.cash = +line.cash;
            return line;
        });
        // FIXME: END

        console.log(this.spinResponse);

        // Decrease user cash
        this.pointsController.userCash -= this.pointsController.totalBet;
        this.reelsController.spinReels(this.spinResponse.final_symbols);
    }

    // TODO: Add free spins functionallity
    freeSpin = () => {
        console.log('Free spins won');

        console.log( this.spinResponse.free_spins_result );

        // this.reelsController.spinReels(this.spinResponse.free_spins_result[0].final_symbols );
    }

    stopReels = () => {
        this.interfaceController.state.stop = false;

        this.reelsController.stopReels();
    }

    // All reels has stopped event
    reelsHasStopped = async () => {
        this.interfaceController.state.stop = false;

        if (this.spinResponse.won) { // Win case
            // Show all winning lines
            // and update user win line by line in callback
            await this.linesController.showWinningLines(this.spinResponse.spin_result, winCashInLine => {
                this.pointsController.userWin += winCashInLine;
                this.interfaceController.panel.notifier.text = `You won ${this.pointsController.userWin} points`;
            });

            console.log('All lines has showed');
            this.interfaceController.state.takeWin = true;
            this.interfaceController.panel.notifier.text = 'Take win or gamble';
        } else { // Lose case
            // In no win then allow spin
            this.interfaceController.state.spin = true;
            this.interfaceController.panel.notifier.text = 'Press start to spin';
        }

        // Checking for free spins
        // if (this.spinResponse.free_spins) {
        //     // Start free spins
        //     this.freeSpin();
        // }
    }

}

export default Game;

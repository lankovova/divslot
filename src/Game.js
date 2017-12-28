import {getNextArrayItem, getMultiplyNearestLowerNumbers} from './Helpers/ArrayMethods';
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
            { reelsHasStopped: this.reelsHasStopped }
        );

        this.linesController = new LinesController(
            document.querySelector('#game_wrapper'),
            { reels: this.reelsController.reels }
        );

        this.interfaceController = new InterfaceController({
            containerNode: document.querySelector('#reels_wrapper'),
            lines: this.linesController.lines,
            spinReels: this.spinReels,
            stopReels: this.stopReels,
            takeWin: this.takeWin,
            setLines: this.setLines,
            setBerPerLine: this.setBerPerLine,
            setMaxBet: this.setMaxBet
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
        // Get lines and betPerLine values for max possible bet depending on user's cash
        const maxBetVars = getMultiplyNearestLowerNumbers(this.pointsController.userCash, settings.lines, settings.betPerLine);

        this.setLines(maxBetVars.firstNumber);
        this.setBerPerLine(maxBetVars.secondNumber);
    }
    setLines = lines => {
        const newLines = lines ? lines : getNextArrayItem(settings.lines, this.pointsController.lines);
        this.pointsController.lines = newLines;

        this.checkBetSpinPossibility();
    }
    setBerPerLine = betPerLine => {
        const newBetPerLine = betPerLine ? betPerLine : getNextArrayItem(settings.betPerLine, this.pointsController.betPerLine);
        this.pointsController.betPerLine = newBetPerLine;

        this.checkBetSpinPossibility();
    }

    // Disables/enables spin possibility depending on user's bet/cash
    checkBetSpinPossibility = () => {
        if (this.pointsController.totalBet > this.pointsController.userCash) {
            this.interfaceController.panel.notifier.text = 'Not enough cash for this bet';
            this.interfaceController.state.spin = false;
        } else {
            this.interfaceController.panel.notifier.text = 'Press start to spin';
            this.interfaceController.state.spin = true;
        }
    }

    // TODO: Make this func async for iterative win transfering
    takeWin = () => {
        this.interfaceController.state.takeWin = false;

        this.transferUsersWin();

        // TODO: Enable after transfering win
        // FIXME: Code duplicate
        this.interfaceController.state.spin = true;
        // Enable possibility to change betPerLine or linesAmount
        this.interfaceController.enableBetChange();
        this.checkBetSpinPossibility();
    }

    // Transfer win cash to user's cash
    transferUsersWin = () => {
        // Update user cash
        this.pointsController.userCash = this.spinResponse.user_cash;
        // Reset user win
        this.pointsController.userWin = 0;
    }

    spinReels = async () => {
        this.interfaceController.panel.notifier.text = 'Fetching data...';
        // Disable spin
        this.interfaceController.state.spin = false;
        // Disable possibility to change betPerLine or linesAmount
        this.interfaceController.disableBetChange();
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

        this.interfaceController.panel.notifier.clear();

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

            // Enable possibility to take win
            this.interfaceController.state.takeWin = true;
            this.interfaceController.panel.notifier.text = 'Take win or gamble';
        } else { // Lose case
            // In no win then allow spin
            // FIXME: Code duplicate
            this.interfaceController.state.spin = true;
            // Enable possibility to change betPerLine or linesAmount
            this.interfaceController.enableBetChange();
            this.checkBetSpinPossibility();
        }

        // Checking for free spins
        // if (this.spinResponse.free_spins) {
        //     // Start free spins
        //     this.freeSpin();
        // }
    }

}

export default Game;

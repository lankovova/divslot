import {getNextArrayItem, getMultiplyNearestLowerNumbers} from './Helpers/ArrayMethods';
import PointsController from './Controllers/PointsController';
import ReelsController from './Controllers/ReelsController';
import LinesController from './Controllers/LinesController';
import InterfaceController from './Controllers/InterfaceController';

import {mockResponse} from './spinMockup';

import axios from 'axios';

let userWinTransferDelta;

class Game {
    constructor(gameName) {
        this.gameName = gameName;

        this.gameNode = document.querySelector('#game');
        // Store for spin response data
        this.spinResponse = {};

        this.bonusSpinsNow = false;
        this.bonusSpinsToPlay = 0;

        this.reelsController = new ReelsController(
            document.querySelector('#reels_wrapper'),
            { reelsHasStopped: this.reelsHasStopped }
        );

        this.linesController = new LinesController(
            document.querySelector('#reels_container'),
            { reels: this.reelsController.reels }
        );

        this.interfaceController = new InterfaceController({
            containerNode: document.querySelector('#reels_wrapper'),
            lines: this.linesController.lines,
            spinReels: this.spin,
            stopReels: this.stop,
            takeWin: this.takeWin,
            speedUpTakeWin: this.speedUpTakeWin,
            setDenomination: this.setDenomination,
            setLines: this.setLines,
            setBerPerLine: this.setBerPerLine,
            setMaxBet: this.setMaxBet
        });

        this.interfaceController.panel.notifier.text = 'Loading...';
        (async () => {
            // Load some necessarily information, use it
            const playerData = await this.getPlayerData();
            const userCash = +playerData.cash;

            this.pointsController = new PointsController({
                panel: this.interfaceController.panel,
                linePresenters: this.interfaceController.linePresenters
            }, {
                userCash: userCash,
                denomination: 1,
                lines: 1,
                betPerLine: 1,
            });

            // And enable game to play
            this.interfaceController.setIdle();
            this.interfaceController.panel.notifier.text = 'Press start to spin';
        })();
    }

    setMaxBet = () => {
        // Get lines and betPerLine values for max possible bet depending on user's cash
        const maxBetVars = getMultiplyNearestLowerNumbers(this.pointsController.userCashInPoints, settings.lines, settings.betPerLine);

        this.setLines(maxBetVars.firstNumber);
        this.setBerPerLine(maxBetVars.secondNumber);
    }

    setBerPerLine = newBetPerLine => this.setBetRelatedValue(settings.betPerLine, this.pointsController.betPerLine, this.pointsController.setBetPerLine)(newBetPerLine);

    setLines = newLines => this.setBetRelatedValue(settings.lines, this.pointsController.lines, this.pointsController.setLines)(newLines);

    setDenomination = newDenom => this.setBetRelatedValue(settings.denominations, this.pointsController.denomination, this.pointsController.setDenomination)(newDenom);

    setBetRelatedValue = (array, currentValue, setNewValue) => {
        return value => {
            const newValue = value ? value : getNextArrayItem(array, currentValue);
            setNewValue.call(null, newValue);
            this.setSpinPossibility();
        }
    }

    // Disables/enables spin possibility depending on user's bet/cash
    setSpinPossibility = () => {
        if (this.pointsController.totalBet > this.pointsController.userCashInPoints) {
            this.interfaceController.panel.notifier.text = 'Not enough cash for this bet';
            this.interfaceController.disableSpinAndAuto();
        } else {
            this.interfaceController.panel.notifier.text = 'Press start to spin';
            this.interfaceController.enableSpinAndAuto();
        }
    }

    takeWin = async () => {
        this.interfaceController.disableInterface();
        this.interfaceController.enableSpeedUpTransferWin();

        // Wait transfering win
        await this.transferUserWin(this.spinResponse.won_points, this.spinResponse.player_coins);

        this.interfaceController.disableSpeedUpTransferWin();
        // After transfering win enable interface
        this.interfaceController.enableInterface();
        this.setSpinPossibility();
    }

    takeBonusSpinsWin = async () => {
        this.interfaceController.disableInterface();
        this.interfaceController.enableSpeedUpTransferWin();

        // Wait transfering win
        await this.transferUserWin(this.spinResponse.bonus_spins.won_points, this.spinResponse.bonus_spins.player_coins);

        this.interfaceController.disableSpeedUpTransferWin();
        // After transfering win enable interface
        this.interfaceController.enableInterface();
        this.setSpinPossibility();
    }

    // Transfer win cash to user's cash
    transferUserWin = (wonPoints, playerCoins) => {
        return new Promise(resolve => {
            // Transfer duration in ms
            const transferDuration = 2000;
            // Delay between each iteration in ms
            const delayBetweenIteration = 50;

            // Amount of iterations
            const iterationsAmount = transferDuration / delayBetweenIteration;

            // Delta of user cash between iterations
            userWinTransferDelta = Math.ceil(wonPoints / iterationsAmount);

            const intervalId = setInterval(() => {
                // If last transfer iteration
                if (this.pointsController.userWin - userWinTransferDelta <= 0) {
                    // Set user cash to final value
                    this.pointsController.userCash = playerCoins;

                    // Reset user win
                    this.pointsController.userWin = 0;

                    clearInterval(intervalId);

                    // Resolve promise when transfering is done
                    resolve();
                } else {
                    // Change values on delta
                    this.pointsController.userCash += userWinTransferDelta;
                    this.pointsController.userWin -= userWinTransferDelta;
                }
            }, delayBetweenIteration);
        });
    }

    speedUpTakeWin = () => {
        userWinTransferDelta *= 2;
        this.interfaceController.disableSpeedUpTransferWin();
    }

    getPlayerData = async () => {
        try {
            return (await axios.post('http://admin.chcgreen.org/getplayerinfo')).data;
        } catch(err) {
            console.log(err);

            return {
                cash: '15.27'
            };
        }
    }

    // Getting spin data
    getSpinResponse = async () => {
        try {
            const response = await axios.post('http://admin.chcgreen.org/spin', {
                lines_amount: this.pointsController.lines,
                bet_per_line: this.pointsController.betPerLine,
                denomination: this.pointsController.denomination,
                game: this.gameName
            });

            // return response.data;
            return mockResponse;
        } catch(err) {
            console.log(err);
        }
    }

    spin = () => {
        if (this.bonusSpinsNow) {
            console.log('Start bonus spins');
            this.bonusSpin(0);
        } else {
            this.getDataAndSpin();
        }
    }

    getDataAndSpin = () => {
        this.interfaceController.panel.notifier.text = 'Fetching data...';
        // Disable whole interface
        this.interfaceController.disableInterface();

        this.getSpinResponse().then(result => {
            console.log(result);
            this.spinResponse = result;

            // Decrease user cash
            this.pointsController.userCash -= this.pointsController.pointsToCoins(this.pointsController.totalBet);

            // Enable stop
            this.interfaceController.enableStop();

            // Clear notifier
            this.interfaceController.panel.notifier.clear();

            // Spin reels to given final symbols
            this.reelsController.startReels(this.spinResponse.final_symbols);
        });
    }

    bonusSpin = (bonusSpinIndex) => {
        this.interfaceController.panel.notifier.text = `Free spin #${bonusSpinIndex + 1}`;
        this.reelsController.startReels(this.spinResponse.bonus_spins.spins[bonusSpinIndex].final_symbols);
    }

    stop = () => {
        this.interfaceController.disableStop();

        this.reelsController.stopReels();
    }

    // All reels has stopped event
    reelsHasStopped = async () => {
        this.interfaceController.disableStop();

        // Checking is there bonus spins
        if (this.spinResponse.bonus_spins) {
            // If bonus spins just started
            if (!this.bonusSpinsNow) {
                this.bonusSpinsNow = true;
                this.bonusSpinsToPlay = this.spinResponse.bonus_spins.spins.length - 1;

                // Show win lines and transfer win from regular spin
                await this.linesController.showWinningLines(this.spinResponse.spin_result, winCashInLine => {
                    this.pointsController.userWin += winCashInLine;
                    this.interfaceController.panel.notifier.text = `You won ${this.pointsController.userWin} points`;
                });

                // Show alert and wait for user to press start btn
                this.interfaceController.showBonusSpinsAlert();

                // Transfer user regular spin win
                const userCashBeforeBonusSpins = this.spinResponse.player_coins - this.spinResponse.bonus_spins.won_coins;
                await this.transferUserWin(this.spinResponse.won_points, userCashBeforeBonusSpins);

                // Enable spin btn to start bonus spins
                this.interfaceController.enableSpin();

                return;
            }

            // If no more bonus spins
            if (this.bonusSpinsToPlay === 0) {
                console.log(`Bonus spins end, user won ${this.spinResponse.bonus_spins.won_points}`);

                this.bonusSpinsNow = false;

                // TODO: Enable taking win if user won something
                console.log('Enable take bonus spins win');

                return;
            }

            // Start bonus spin
            const bonusSpinIndex = this.spinResponse.bonus_spins.spins.length - this.bonusSpinsToPlay;
            this.bonusSpin(bonusSpinIndex);

            // Decrease left bonus spins amount
            this.bonusSpinsToPlay--;
            return;
        }

        // TODO: Handle case when its bonus spin
        if (this.spinResponse.won) { // Win case
            // Show all winning lines
            // and update user win line by line in callback
            await this.linesController.showWinningLines(this.spinResponse.spin_result, winCashInLine => {
                this.pointsController.userWin += winCashInLine;
                this.interfaceController.panel.notifier.text = `You won ${this.pointsController.userWin} points`;
            });

            console.log('All lines has showed');

            // Enable possibility to take win or gamble
            this.interfaceController.setTakeWin();
            this.interfaceController.panel.notifier.text = 'Take win or gamble';
        } else { // Lose case
            // Enable possibility to change betPerLine or linesAmount
            this.interfaceController.enableInterface();

            // In no win then allow spin
            this.setSpinPossibility();
        }

    }

}

export default Game;

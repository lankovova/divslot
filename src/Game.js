import Reel from './Reel';
import settings from './settings.json';

class Game {
	constructor(name) {
		this.name = name;
		this.reels = [];

		this.gameNode = document.querySelector('#game');

		this.initReels();
	}

	initReels() {
		const reelsWrapper = document.createElement('div');
		reelsWrapper.id = 'reels_wrapper';

		this.gameNode.appendChild(reelsWrapper);

		for (let i = 0; i < settings.numOfReels; i++) {
			let reelSymbols = [];
			for (let j = 0; j < settings.numOfRows; j++) {
				reelSymbols.push(9);
				// reelSymbols.push(Math.floor(Math.random() * (settings.symbolsAmount - 1)) + 1);
			}
			this.reels.push(new Reel(reelSymbols));
		}
	}

	async spin() {
		console.log('Spinning');

		for (let i = 0; i < this.reels.length; i++) {
			// Wait previous reel to resolve before startinf next
			await this.reels[i].spin();
		}

		console.log('Last reel start spinning');
	}
}

export default Game;
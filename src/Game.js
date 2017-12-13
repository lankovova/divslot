import Reel from './Reel';
import Symbol from './Symbol';
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
				reelSymbols.push(new Symbol(9));
				// reelSymbols.push(Math.floor(Math.random() * (settings.symbolsAmount - 1)) + 1);
			}
			this.reels.push(new Reel(reelSymbols));
		}
	}

	async spin() {
		console.log('Spinning');

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
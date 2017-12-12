import Reel from './Reel';
import settings from './settings.json';

class Game {
	constructor(name) {
		this.name = name;
		this.reels = [];

		this.gameNode = document.querySelector('#game');
	}

	initReels() {
		const reelsWrapper = document.createElement('div');
		reelsWrapper.id = 'reels_wrapper';

		this.gameNode.appendChild(reelsWrapper);

		for (let i = 0; i < settings.numOfReels; i++) {
			this.reels.push(new Reel());
			this.reels[i].initSymbols([8, 9, 4]);
		}
	}

	async spin() {
		console.log('Spinning');

		for (let i = 0; i < this.reels.length; i++) {
			// Wait previous reel to resolve before startinf next
			await this.reels[i].spin();
		}
	}
}

export default Game;
import settings from './settings.json';

class Interface {
	constructor(gameInstance) {
		this.game = gameInstance;

		this.state = {
			spin: true,
			stop: false
		};

		this.initKeyboardListeners();
	}

	initKeyboardListeners() {
		window.onkeyup = e => {
			var keyCode = event.which || event.keyCode;
			switch (keyCode) {
				// Space
				case 32: {
					if (this.state.spin) {
						this.game.spinReels();
					} else if (this.state.stop) {
						this.game.stopReels();
					}

					break;
				}
				default: {
					// console.log(`Key ${keyCode} pressed`);
				}
			}
		}
	}
}

export default Interface;
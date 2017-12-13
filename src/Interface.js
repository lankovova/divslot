import settings from './settings.json';

class Interface {
	constructor(game) {
		this.game = game;
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
						console.log('Spin called');
						this.game.spin();
					} else if (this.state.stop) {
						console.log('Stop reels');
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
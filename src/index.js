import Game from './Game';

(function() {
	const game = new Game('babyOnFire');
	game.initReels();

	window.onkeyup = e => {
		if (e.keyCode === 32) {
			game.spin();
		}
	}
})();
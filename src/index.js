import Game from './Game';

(function() {
	document.body.onload = () => {
		console.log('All images loaded');
	};

	const game = new Game('babyOnFire');

	window.onkeyup = e => {
		if (e.keyCode === 32) {
			game.spin();
		}
	}
})();
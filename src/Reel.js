import Symbol from './Symbol';
import {transitionEnd} from './events';
import settings from './settings.json';

// TODO: Think about storing reel symbols in reelParts
class Reel {
	constructor() {
		this.reelNode = document.createElement('div');
		this.reelNode.className = 'reel';
		this.reelNode.style.transition = `transform ${settings.spinAnimationTimeInSec}s ${settings.spinAnimTimingFunc}`;

		const reelWrapperNode = document.createElement('div');
		reelWrapperNode.className = 'reel_wrapper';
		reelWrapperNode.appendChild(this.reelNode);

		document.querySelector('#reels_wrapper').appendChild(reelWrapperNode);

		// End spin animation event
		this.reelNode.addEventListener(transitionEnd, () => {
			console.log('End spin');
			this.resetReel();
		});
	}

	// FIXME:
	initSymbols(symbolsArray) {
		for (let i = 0; i < symbolsArray.length; i++) {
			const symbol = new Symbol(symbolsArray[i]);

			this.reelNode.appendChild(symbol.node);
		}
	}

	spin() {
		this.addSpinningSymbols();
		this.addFinalSymbols();
		// Animate spin
		this.reelNode.style.transform = `translate(0, ${(settings.numOfSpinsBeforeStop * settings.numOfRows + settings.numOfRows)* settings.symbolSize}px)`;

		// Resolve promise after delay between starting reels spin
		return new Promise(resolve => {
			setTimeout(() => {
				resolve();
			}, settings.delayBeforeSpinNextReel);
		});
	}

	addSpinningSymbols() {
		for (let i = 0; i < settings.numOfSpinsBeforeStop * settings.numOfRows; i++) {
			const symbol = new Symbol(10);
			this.reelNode.insertBefore(symbol.node, this.reelNode.firstChild);
		}
	}

	addFinalSymbols() {
		for (let i = 0; i < settings.numOfRows; i++) {
			const symbol = new Symbol(i * 3 + 1);
			this.reelNode.insertBefore(symbol.node, this.reelNode.firstChild);
		}
	}

	resetReel() {
		// Remove useless symbols
		while (this.reelNode.childNodes.length !== settings.numOfRows) {
			this.reelNode.removeChild(this.reelNode.childNodes[settings.numOfRows]);
		}

		// Set reel in default position
		this.reelNode.style.transitionDuration = '0s';
		this.reelNode.style.transform = '';

		setTimeout(() => {
			this.reelNode.style.transitionDuration = `${settings.spinAnimationTimeInSec}s`;
		}, 0);
	}
}

export default Reel;
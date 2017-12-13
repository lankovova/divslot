import Symbol from './Symbol';
import {transitionEnd} from './events';
import settings from './settings.json';

// TODO: Think about storing reel symbols in reelParts
class Reel {
	constructor(symbolsArray) {
		this.reelNode = document.createElement('div');
		this.reelNode.className = 'reel';
		this.reelNode.style.transition = `transform ${settings.spinAnimationTimeInSec}s ${settings.spinAnimTimingFunc}`;

		// Init starting symbols
		for (let i = 0; i < symbolsArray.length; i++) {
			const symbol = new Symbol(symbolsArray[i]);
			// Add symbol into reel node
			this.reelNode.appendChild(symbol.node);
		}

		const reelWrapperNode = document.createElement('div');
		reelWrapperNode.className = 'reel_wrapper';
		reelWrapperNode.style.width = `${settings.symbolSize}px`;
		reelWrapperNode.style.height = `${settings.symbolSize * settings.numOfRows}px`;
		reelWrapperNode.style.margin = `0 ${settings.spaceBetweenReels / 2}px`;
		reelWrapperNode.appendChild(this.reelNode);

		document.querySelector('#reels_wrapper').appendChild(reelWrapperNode);

		// End spin animation event
		this.reelNode.addEventListener(transitionEnd, () => {
			console.log('End spin');
			this.resetReel();
		});
	}

	/**
	 * Spins the reel to final symbols
	 * @param {Array<Number>} finalSymbolsArr Final symbols
	 * @returns Resolved promise after some delay
	 */
	spin(finalSymbolsArr) {
		this.addSpinningSymbols();
		this.addFinalSymbols(finalSymbolsArr);
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
			const symbol = new Symbol(Math.floor(Math.random() * (settings.symbolsAmount - 1)) + 1);
			this.reelNode.insertBefore(symbol.node, this.reelNode.firstChild);
		}
	}

	addFinalSymbols(finalSymbols) {
		for (let i = 0; i < finalSymbols.length; i++) {
			// const symbol = new Symbol(9);
			const symbol = new Symbol(finalSymbols[i]);
			this.reelNode.insertBefore(symbol.node, this.reelNode.firstChild);
		}
	}

	resetReel() {
		// Remove useless symbols
		while (this.reelNode.childNodes.length !== settings.numOfRows) {
			this.reelNode.removeChild(this.reelNode.childNodes[settings.numOfRows]);
		}

		// Remove spin animation time to move reel
		this.reelNode.style.transitionDuration = '0s';
		// Set reel in default position
		this.reelNode.style.transform = '';

		// Set spin animation time back
		setTimeout(() => {
			this.reelNode.style.transitionDuration = `${settings.spinAnimationTimeInSec}s`;
		}, 0);
	}
}

export default Reel;
import settings from "../settings.json";

class Symbol {
	constructor(symbolNumber) {
		this.symbolNum = symbolNumber;

		this.initSymbol();
	}

	initSymbol() {
		this.symbolNode = document.createElement('div');
		this.symbolNode.style.width = `${settings.symbolSize}px`;
		this.symbolNode.style.height = `${settings.symbolSize}px`;
		this.symbolNode.style.background = `url('${settings.symbolsPath + settings.symbolsImages[this.symbolNum]}')`;
		this.highlighted = false;
	}

	animate() {
		this.symbolNode.style.animation = 'symbolAnimation 1s steps(15) infinite';
	}

	get node() {
		return this.symbolNode;
	}

	get x() {
		let x = this.symbolNode.getBoundingClientRect();
		return x.x;
	}

	get y() {
		let y = this.symbolNode.getBoundingClientRect();
		return y.y;
	}
}

export default Symbol;
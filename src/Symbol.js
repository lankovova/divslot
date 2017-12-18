import settings from "./settings.json";

class Symbol {
	constructor(symbolNumber) {
		this.symbolNum = symbolNumber;

		this.initSymbol();
	}

	initSymbol() {
		this.symbolNode = document.createElement('div');
		this.symbolNode.style.width = `${settings.symbolSize}px`;
		this.symbolNode.style.height = `${settings.symbolSize}px`;
		this.symbolNode.style.background = `url('${settings.symbolsPath + settings.symbolsImages[this.symbolNum - 1]}')`;
		this.highlighted = false;
	}

	animate() {
		
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
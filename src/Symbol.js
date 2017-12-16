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
	}

	get node() {
		return this.symbolNode;
	}

	getPosition() {
		let x = this.symbolNode.getBoundingClientRect();
		let y = this.symbolNode.getBoundingClientRect();
		// console.log(x.x, y.y)

		return {
			'x': x.x,
			'y': y.y,
		}
	}
}

export default Symbol;
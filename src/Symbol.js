import settings from "./settings.json";

class Symbol {
	constructor(symbolNumber) {
		this.symbolNum = symbolNumber;

		this.symbolNode = document.createElement('div');
		this.symbolNode.style.width = `${settings.symbolSize}px`;
		this.symbolNode.style.height = `${settings.symbolSize}px`;
		this.symbolNode.className = 'symbol';
		this.symbolNode.style.background = `url('${settings.symbolsPath + settings.symbolsImages[this.symbolNum - 1]}')`;
	}

	get node() {
		return this.symbolNode;
	}
}

export default Symbol;
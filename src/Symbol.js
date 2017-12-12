import settings from "./settings.json";

class Symbol {
	constructor(symbolNumber) {
		this.symbolNum = symbolNumber;
		this.symbolNode = document.createElement('div');
		this.symbolNode.style.width = `${settings.symbolSize}px`;
		this.symbolNode.style.height = `${settings.symbolSize}px`;
		this.symbolNode.className = `symbol symbol${this.symbolNum}`;
	}

	get node() {
		return this.symbolNode;
	}
}

export default Symbol;
class Symbol {
	constructor(symbolNumber) {
		this.symbolNum = symbolNumber;
		this._node = document.createElement('div');
		this._node.className = `symbol symbol${this.symbolNum}`;
	}

	get node() {
		return this._node;
	}
}

export default Symbol;
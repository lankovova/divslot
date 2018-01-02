import Symbol from "./Symbol";
import { transitionEnd } from "../events";

export default class SymbolFallAnimation extends Symbol {
    constructor(symbolNumber) {
        super(symbolNumber);

        this.node.addEventListener(transitionEnd, () => {
            // console.log('Symbol fall stopped');
        });
    }

    initSymbol() {
        super.initSymbol();
        this.symbolNode.style.position = "absolute";
        this.symbolNode.style.bottom = `${settings.numOfRows * settings.symbolSize}px`;
        this.symbolNode.style.transition = `bottom 300ms ${settings.fallAnimTimingFunc}`;
    }

    fall(multiplier) {
        return new Promise(resolve => {
            this.symbolNode.style.bottom = `${multiplier * settings.symbolSize}px`;
            setTimeout(() => {
                resolve();
            }, 1000);
        });
    }
}

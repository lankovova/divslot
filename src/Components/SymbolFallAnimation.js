import Symbol from "./Symbol";
import { transitionEnd } from "../events";

export default class SymbolFallAnimation extends Symbol {
    constructor(symbolNumber) {
        super(symbolNumber);
    }

    initSymbol() {
        super.initSymbol();
        this.symbolNode.style.position = "absolute";
        this.symbolNode.style.bottom = `${settings.numOfRows * settings.symbolSize}px`;
    }

    fall(multiplier) {
        let animTime = settings.spinAnimationTimeInMs / 6 * (settings.numOfRows - multiplier + 1);
        this.symbolNode.style.transition = `bottom ${animTime}ms ${settings.fallAnimTimingFunc}`;

        setTimeout(() => {
            this.symbolNode.style.bottom = `${multiplier * settings.symbolSize}px`;
        }, (settings.spinAnimationTimeInMs / settings.numOfRows) * (multiplier + 1));
    }
}
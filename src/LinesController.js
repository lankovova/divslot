import settings from './settings.json';
import Line from './Line';

class LinesController {
    constructor(gameResult = {}) {
        this.winningLines = [];
        this.gameResult = gameResult;
    }

    createWinningLines(reels) {
        // position of very first symbol
        const start = reels[0].finalSymbols[0].getPosition();

        for (const [key, res] of Object.entries(this.gameResult)) {
            const line = new Line('game_wrapper', 'green', res.line);

            for (const [key, sCoor] of Object.entries(res.list)) {
                // Get reel
                const reel = reels[sCoor.col];
                // Get winning symbol
                const symbol = reel.finalSymbols[sCoor.row];
                // Get symbol coordinates
                const symbolCoord = symbol.getPosition();
                console.log(symbolCoord)
                // Add symbol highlite to line
                line.addSymbolHighlite(symbolCoord.x, symbolCoord.y);
            }
            line.connectHighlites();
            this.winningLines.push(line);
        }

        return this.winningLines;
    }
}

export default LinesController;
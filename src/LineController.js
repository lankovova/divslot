import settings from './settings.json';
import Line from './Line';

class LineController {
    constructor(gameResult = {}) {
        this.winningLines = [];
        this.gameResult = gameResult;
    }

    createWinningLines(reels) {
        let line = new Line('game', 'green');

        for (const [key, res] of Object.entries(this.gameResult)) {
            const line = new Line('game_wrapper', 'green');
        
            for (const [key, sCoor] of Object.entries(res.list)) {
                console.log(sCoor)
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

export default LineController;
import settings from './settings.json';
import Line from './Line';

class LineController {
    constructor() {
        this.winningLines = [];
    }

    showWinningLines(reels, gameResult) {
        let line = new Line('game', 'green');
        for (const res of gameResult) {
            const line = new Line('game_wrapper', 'green');

            for (const sCoor of res.list) {
                // Get reel
                const reel = this.reels[sCoor.col];
                // Get winning symbol
                const symbol = reel.finalSymbols[sCoor.row];
                // Get symbol coordinates
                const symbolCoord = symbol.getPosition();
                console.log(symbolCoord)
                // Add symbol highlite to line
                line.addSymbolHighlite(symbolCoord.x, symbolCoord.y);
            }
            line.connectHighlites();
            line.show()
        }
    }
 }

export default LineController;
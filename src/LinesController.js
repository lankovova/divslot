import s from './settings.json';
import Line from './Line';

class LinesController {
    constructor(reels) {
        this.winningLines = [];
        this.lines = [];
        this.gameResult;
        this.linesContainerId = 'game_wrapper';
        this.reels = reels;

        this._createLines();
    }

    createWinningLines() {
        for (const [key, res] of Object.entries(this.gameResult)) {
            const line = new Line(this.linesContainerId, 'green', (res.line - 1), this.reels);

            for (const [key, sCoor] of Object.entries(res.list)) {
                // Get reel
                const reel = this.reels[sCoor.col];
                // Get winning symbol
                const symbol = reel.finalSymbols[sCoor.row];
                symbol.highlighted = true;
                // Get symbol coordinates
                const symbolCoord = symbol.getPosition();
                // Add symbol highlite to line
                line.addSymbolHighlite(symbolCoord.x, symbolCoord.y);
            }
            line.connectHighlites('finalSymbols');
            this.winningLines.push(line);
        }

        return this.winningLines;
    }

    showLineByNumber(number) {
        for( let line of this.lines) {
            line.hide();
        }
        this.lines[number].show()
    }

    setGameResult(gameResult) {
        this.gameResult = gameResult;
    }

    _createLines() {
        for(let i = 0; i < s.lineTypes.length; i++) {
            const line = new Line(this.linesContainerId, 'green', i, this.reels);
            line.connectHighlites('startSymbols');
            this.lines.push(line);
        }
    }
}

export default LinesController;
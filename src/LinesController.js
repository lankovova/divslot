import s from './settings.json';
import Line from './Line';

class LinesController {
    /**
     * @param {Array<Reel>} reels Reels array
     */
    constructor(reels) {
        this.winningLines = [];
        this.lines = [];
        this.linesContainerId = 'game_wrapper';
        this.reels = reels;

        this._createLines();
    }

    /**
     * Create winning lines array of game result
     * @param {Number[][]} gameResult Game result
     */
    createWinningLines(gameResult) {
        for (const [key, res] of Object.entries(gameResult)) {
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
            line.connectHighlites();
            this.winningLines.push(line);
        }
    }

    /**
     * Show all winning lines with delay between them
     * @param {Number[][]} gameResult Game result
     */
    async showWinningLines(gameResult, delay) {
        this.createWinningLines(gameResult);

        for (const line of this.winningLines) {
            await this.showWinningLine(line, delay);
        }
    }

    /**
     * Show specific line and hide after delay
     * @param {Line} line Line to show
     */
    showWinningLine(line, delay) {
        line.show();

        return new Promise(resolve => {
            setTimeout(() => {
                line.hide();
                resolve();
            }, delay);
        });
    }

    /**
     * Show line by index
     * @param {Number} lineIndex lineIndex
     */
    showLineByNumber(lineIndex) {
        for (const line of this.lines) {
            line.hide();
        }
        this.lines[lineIndex].show();
    }

    _createLines() {
        for(let i = 0; i < s.lineTypes.length; i++) {
            const line = new Line(this.linesContainerId, 'green', i, this.reels);
            line.connectHighlites();
            this.lines.push(line);
        }
    }
}

export default LinesController;
import s from './settings.json';
import Line from './Line';

class LinesController {
    /**
     * @param {Array<Reel>} reels Reels array
     */
    constructor(gameWrapperNode, reels) {
        this.lines = [];
        this.gameWrapperNode = gameWrapperNode;
        this.reels = reels;

        this._createLines();
    }

    /**
     * Create winning lines array of game result
     * @param {Number[][]} gameResult Game result
     */
    createWinningLines(gameResult) {
        let winningLines = [];

        for (const [key, res] of Object.entries(gameResult)) {
            const line = new Line(this.gameWrapperNode, 'green', (res.line - 1), this.reels);

            for (const [key, sCoor] of Object.entries(res.list)) {
                // Get reel
                const reel = this.reels[sCoor.col];
                // Get winning symbol
                const symbol = reel.finalSymbols[sCoor.row];
                symbol.highlighted = true;
                symbol.animate()
                // Add symbol highlite to line
                line.addSymbolHighlite(symbol.x, symbol.y);
            }
            line.connectHighlites();
            winningLines.push(line);
        }

        return winningLines;
    }

    /**
     * Show all winning lines with delay between them
     * @param {Number[][]} gameResult Game result
     */
    async showWinningLines(gameResult, delay) {
        const winningLines = this.createWinningLines(gameResult);

        console.log(winningLines);

        for (const line of winningLines) {
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
                // line.hide();
                line.remove();
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
            const line = new Line(this.gameWrapperNode, 'green', i, this.reels);
            line.connectHighlites();
            this.lines.push(line);
        }
    }
}

export default LinesController;
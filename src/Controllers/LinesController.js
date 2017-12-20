import s from '../settings.json';
import Line from '../Components/Line';

class LinesController {
    /**
     * @param {HTMLElement} gameWrapperNode
     * @param {Array<Reel>} reels Reels array
     */
    constructor(gameWrapperNode, props) {
        this.lines = [];
        this.gameWrapperNode = gameWrapperNode;
        this.props = props;

        this._createLines();
    }

    /**
     * Create winning lines array of game result
     * @param {Number[][]} gameResult Game result
     */
    createWinningLines(gameResult) {
        let winningLines = [];

        for (const [key, res] of Object.entries(gameResult)) {
            const line = new Line(this.gameWrapperNode, 'red', res.line - 1, res.cash, this.props.reels);

            for (const [key, sCoor] of Object.entries(res.list)) {
                // Get reel
                const reel = this.props.reels[sCoor.col];
                // Get winning symbol
                const symbol = reel.finalSymbols[sCoor.row];
                symbol.highlighted = true;
                symbol.animate();
                // Add symbol highlite to line
                line.addSymbolHighlite(symbol.x, symbol.y);
            }

            line.connectHighlites();
            winningLines.push(line);
        }

        return winningLines;
    }

    /**
     * Show all winning lines
     * @param {Number[][]} gameResult Game result
     */
    async showWinningLines(gameResult, addUserWin) {
        const winningLines = this.createWinningLines(gameResult);

        for (const line of winningLines) {
            addUserWin(line.cash);
            await this.showWinningLine(line);
        }

        // All lines has shown here
        this.props.linesHasShowed();

        // TODO: Cycle showing lines
    }

    /**
     * Show specific line and hide after delay
     * @param {Line} line Line to show
     */
    showWinningLine(line) {
        line.show();

        return new Promise(resolve => {
            setTimeout(() => {
                line.remove();
                resolve();
            }, s.delayBetweenShowingWinningLines);
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
        for (let i = 0; i < s.lineTypes.length; i++) {
            const line = new Line(this.gameWrapperNode, 'red', i, 0, this.props.reels);
            line.connectHighlites();
            this.lines.push(line);
        }
    }
}

export default LinesController;
import { Container, Graphics } from "pixi.js";
import Cell from "../game/components/cell";

class CellGraphics extends Graphics {
    public cell: Cell;
    constructor(cell: Cell) {
        super();
        this.cell = cell;
        this.drawCell();
    }

    private drawCell(): void {
        const coords = this.calcCoords();
        this.beginFill(this.cell.color);
        this.drawRect(coords.x, coords.y, this.cell.width, this.cell.height);
        if (this.cell.isInCluster) {
            this.alpha = 0.6;
            this.angle += 7;
        }
        this.endFill();
    }

    private calcCoords() {
        const coords = {
            x: this.cell.vector.x * this.cell.width,
            y: this.cell.vector.y * this.cell.height,
        };
        return coords;
    }

    getCell() {
        return this;
    }
}

export default CellGraphics;

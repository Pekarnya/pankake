import { slotSizes } from "../../../shared/constants";
import ColorChoose from "../../../shared/functors/colorChoose";
import Cell from "../cell";
import VectorComponent from "../vector";
import _ from "lodash";

class GridTableComponent {
    public cells: Cell[][];
    constructor(rows: number, cols: number) {
        this.cells = [];
        this.fillGrid(rows, cols);
    }
    private fillGrid(rows: number, cols: number): void {
        const shapeSize = this.calcSize(rows, cols);
        this.cells = _.times(rows, (i) => {
            return _.times(cols, (j) => {
                const vector = new VectorComponent(j, i);
                const colorObj = ColorChoose.choseRandomColor()
                const cell = new Cell(shapeSize, shapeSize, vector, colorObj.randomColorRGB, colorObj.randomColorName);
                return cell;
            });
        });
    }

    private calcSize(rows: number, cols: number): number {
        const width = slotSizes.width() / cols;
        const height = slotSizes.height() / rows;
        return Math.min(width, height);
    }

}
export default GridTableComponent;
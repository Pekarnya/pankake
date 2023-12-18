import { Container, DisplayObject, Graphics } from "pixi.js";
import GridTableComponent from "../game/components/grid";
import CellGraphics from "./cellGraphic";
import Cell from "../game/components/cell";

class GridContainer extends Container {
    private _childs: DisplayObject[];
    private background: DisplayObject | null;
    constructor() {
        super();
        this._childs = [];
        this.background = null;
    }

    addChild<U extends DisplayObject[]>(...children: U): U[0] {
        super.addChild(...children);
        this._childs.push(...children);
        return children[0];
    }

    addCBackground<U extends DisplayObject[]>(...children: U): U[0] {
        super.addChild(...children);
        this.background = children[0];
        return children[0];
    }

    fillGrid(gridTable: Cell[][]) {
        gridTable.forEach((row) =>
            row.forEach((cell) => {
                this.addChild(new CellGraphics(cell));
            }),
        );
    }

    private removeAllChilds() {
        this._childs.forEach((child) => {
            this.removeChild(child);
        });
    }

    redrawGrid(gridTable: Cell[][]) {
        this.removeAllChilds();
        this.fillGrid(gridTable);
    }

    calcCellSizes(gridTable: GridTableComponent) {
        const width = (this.background?.getBounds().width ?? 0) / gridTable.cells.length;
        const height = (this.background?.getBounds().height ?? 0) / gridTable.cells[0].length;
        const size = Math.max(width, height);
        return size;
    }
}

export default GridContainer;

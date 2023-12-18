import { Text } from "pixi.js";
import { IAplication, IEntity } from "../game/interfaces";
import _ from "lodash";
import Application from "../game/managers/applicationManager";
import VectorComponent from "../game/components/vector";
import ShapeComponent from "../game/components/shapes";
import GridTableComponent from "../game/components/grid";
import { rowsColsNumber } from "../shared/constants";

class Button {
    private app: Application;
    public text: Text;
    constructor(app: Application) {
        this.app = app;
        this.text = new Text("Start");
        this.text.style.fontSize = 66;
        this.text.position.set(775, 375);
        this.text.interactive = true;
        this.text.on("click", () => {
            this.app.start();
            // this.app.emit('start', Array.from(this.app.entities).find(entity => entity.components.has('gridTable')));
            const grid = this.app.entityPool.getEntity();
            grid
                ?.tag("visible")
                .attach("position", new VectorComponent(window.innerWidth / 4, window.innerHeight / 4))
                .attach("shape", new ShapeComponent(window.innerWidth / 2, window.innerHeight / 2))
                .attach("gridTable", new GridTableComponent(rowsColsNumber.rows, rowsColsNumber.cols));
            app.add(grid as IEntity);
        });
    }
}

export default Button;

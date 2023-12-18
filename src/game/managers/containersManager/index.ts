import { Container } from "pixi.js";
import GridContainer from "../../../containers/gridContainer";
import DrawGrid from "../../../shared/functors/drawGrid";

class ContainersManager {
    public containerLibrary: Map<string, GridContainer>;
    public gridContainer: GridContainer;
    constructor() {
        this.containerLibrary = new Map();
        this.gridContainer = DrawGrid.createContainer();
        // this.containerLibrary.set(key, container);
    }
    isContain(key: string): boolean {
        return this.containerLibrary.has(key);
    }
    get(key: string): GridContainer {
        return this.containerLibrary.get(key) as GridContainer;
    }
    register(key: string, container: GridContainer) {
        this.containerLibrary.set(key, container);
    }
}

export const containerManager = new ContainersManager();
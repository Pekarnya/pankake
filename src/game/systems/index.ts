import { Graphics, GraphicsGeometry } from "pixi.js";
import { IAplication, ISystem } from "../interfaces";
import { SceneManager } from "../managers/sceneManager/scene-manager";
import DrawGrid from "../../shared/functors/drawGrid";
import _ from "lodash";
import ClustersSearcher from "../../shared/functors/DFSearch";
import { colors } from "../../shared/constants";
import Cell from "../components/cell";
import { containerManager } from "../managers/containersManager";
import GridContainer from "../../containers/gridContainer";
import Button from "../../containers/button";

class Systems {
    static RenderingSystem(app: IAplication) {
        app.on('init', () => {
            // SceneManager.init(FILL_COLOR);
        })
    }

    static ShapeRender(app: IAplication) {
        app.on('add', (entity) => {
            console.info('update', containerManager.get('gridTable'));
            if (entity.components.has('gridTable')) {
                if (containerManager.get('gridTable') !== undefined) {
                    containerManager.get('gridTable').destroy({ children: true });
                }
                // const shape = new Graphics()
                // shape.beginFill(0xDE3249);
                // shape.drawRect(entity.position.x, entity.position.y, entity.shape.width, entity.shape.height);
                // shape.endFill();
                // gridContainer.addCBackground(shape)
                containerManager.gridContainer.redrawGrid(entity.gridTable.cells)
                containerManager.gridContainer.position.set(window.innerWidth / 4 * 0.618, window.innerHeight / 4)
                SceneManager.addChild(containerManager.gridContainer);

            }
            // const entity = [...data.entities][0];

        })
    }

    static SearchClusters(app: IAplication) {
        app.on('add', (entity) => {
            if (entity.components.has('gridTable')) {
                const finalClusters = [];
                const cells = _.cloneDeep(entity.gridTable.cells);
                console.info('cells', typeof cells);
                for (const [color, rgb] of colors) {
                    const clusters = ClustersSearcher.findClusters(cells, color)
                    finalClusters.push(...clusters);
                }

                console.info('final clusters', finalClusters);
                app.updateClusters(cells, finalClusters);

            }
        })
    }

    static redrawClusters(app: IAplication) {
        app.on("updateClusters", (cells, clusters) => {
            console.info('redraw clusters', cells, clusters);
            const markedCells = ClustersSearcher.markCells(cells, clusters);
            console.info('marked cells', markedCells);
            containerManager.gridContainer.redrawGrid(markedCells)
        })
    }
}

export default Systems;
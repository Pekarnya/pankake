import { SceneManager } from './game/managers/sceneManager/scene-manager';
import { LoaderScene } from './scenes/loader-scene';
import { FILL_COLOR, rowsColsNumber } from './shared/constants';
import Application from './game/managers/applicationManager';
import Systems from './game/systems';
import VectorComponent from './game/components/vector';
import ShapeComponent from './game/components/shapes';
import { IEntity } from './game/interfaces';
import GridTableComponent from './game/components/grid';
import Button from './containers/button';

SceneManager.init(FILL_COLOR);

// const loady: LoaderScene = new LoaderScene();
// SceneManager.changeScene(loady);

const app = new Application({
    data: {
        state: {
            score: 0,
            loading: true
        }
    },
    systems: [
        Systems.RenderingSystem,
        Systems.ShapeRender,
        Systems.SearchClusters,
        Systems.redrawClusters
    ]
})

const button = new Button(app);
SceneManager.addChild(button.text);

app.on('start', () => {
    app.refresh();
    const grid = app.entityPool.getEntity();
    grid?.tag('visible')
        .attach('position', new VectorComponent(window.innerWidth / 4, window.innerHeight / 4))
        .attach('shape', new ShapeComponent(window.innerWidth / 2, window.innerHeight / 2))
        .attach('gridTable', new GridTableComponent(rowsColsNumber.rows, rowsColsNumber.cols))
    app.add(grid as IEntity);
})

// SceneManager.init(FILL_COLOR);

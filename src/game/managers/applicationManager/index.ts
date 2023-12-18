import _ from "lodash";
import Cell from "../../components/cell";
import { IAplication, IEntity, IQueryMap, ISystem } from "../../interfaces";
import EntityPool from "../entityManager";
import EventManager from "../eventManager";
import QueryMap from "../queryMap";

class Application extends EventManager implements IAplication {

    data: object;
    entityPool: EntityPool
    entities: Set<IEntity>
    systems: Set<ISystem>
    queryMap: QueryMap
    running: boolean = false
    _lastStep: number = 0;
    _frameRequest: number | null = null;

    constructor({ data = {}, systems }: { data: {}, systems: ISystem[] }) {
        super();
        this.data = data;
        this.entityPool = new EntityPool();
        this.entities = new Set();
        this.systems = new Set(systems);
        this.queryMap = new QueryMap(this);
    }

    refresh() {
        this.entityPool = new EntityPool();
        this.entities = new Set();
        this.queryMap = new QueryMap(this);
    }

    #beforeEmit(): void {
        console.info("beforeEmit");
        this.emit('beforeEmit', []);
    }

    add(entity: IEntity) {
        this.emit("add", entity);
        this.emit('render', entity);
        this.entities.add(entity);
        console.info('entities', this.entities);
    }

    getEntity(query: string) {
        return _.find(this.entities, (entity) => entity.components.has(query));
    }

    remove(entity: IEntity) {
        this.emit("remove", entity);
        this.entities.delete(entity);
        this.entityPool.recycle(entity);
    }

    query(query: string[]): IEntity | undefined | Set<IEntity> {
        console.info('entities', this.entities);
        return this.queryMap.getEntities(query);
    }

    start() {
        this.#beforeEmit();
        if (this.running)
            return;
        this.entityPool = new EntityPool();
        this.entities = new Set();
        this.systems = new Set(this.systems);
        this.queryMap = new QueryMap(this);
        this.running = true;
        this._lastStep = performance.now();

        this.systems.forEach(system => system(this));

        this.emit("init", this);

        const loop = () => {
            this.update();
            this._lastStep = performance.now();
            this._frameRequest = requestAnimationFrame(loop);
        };

        requestAnimationFrame(loop);
    }

    update() {
        const now = performance.now();
        const dt = (now - this._lastStep) / 1000;

        this._lastStep = now;

        this.emit("update", dt, this);
    }

    updateClusters(cells: Cell[][], clusters: number[][][]): void {
        this.emit("updateClusters", cells, clusters);
    }

    stop() {
        if (this._frameRequest)
            cancelAnimationFrame(this._frameRequest);
        this._frameRequest = null;
        this.running = false;
        this.emit("stop");
    }

}

export default Application;
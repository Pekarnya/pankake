import Cell from "../components/cell";

declare interface IEmitter {
    emit(id: string, ...args: any[]): void,
    on(id: string, listener: IListener): void,
    off(id: string, listener: IListener): void
}

export declare interface IListener {
    (...args: any[]): void;
}

export declare interface IQueryMap {
    app: IAplication;
    getEntities(q: any): Set<IEntity> | IEntity | undefined;
    queryMap: Map<string[], Set<IEntity>>;
}

export declare interface IEntity extends IEmitter {
    id: number;
    attach(prop: string, data: any): this;
    detach(prop: string): this;
    components: Set<string>;
    hasComponent(component: string): boolean;
    tag(tag: string): this;
    tags: Set<string>,
    untag(tag: string): this;
    destroy(): void;
}

export declare interface IAplication extends IEmitter {
    running: boolean,
    data: object,
    systems: Set<ISystem>,
    entities: Set<IEntity>
    add(entity: IEntity): void;
    remove(entity: IEntity): void;
    query(query: string[]): IEntity | undefined | Set<IEntity>;
    start(): void;
    update(): void;
    stop(): void;
    updateClusters(cells: Cell[][], clusters: number[][][]): void;
}

export declare interface ISystem {
    (app: IAplication): void;
}
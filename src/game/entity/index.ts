import { IEntity } from "../interfaces";
import EventManager from "../managers/eventManager";
import { idGenerateFunctor } from "../managers/idManager";

class Entity extends EventManager implements IEntity {
    public id: number;
    public tags: Set<string>;
    public components: Set<string>;

    constructor() {
        super();
        this.id = idGenerateFunctor.generateId();
        this.tags = new Set();
        this.components = new Set();
        this.tag('*');
    }

    hasComponent(component: string): boolean {
        return this.components.has(`@${component}`);
    }

    tag(tag: string): this {
        this.tags.add(tag);
        this.emit('tag', tag, this);
        return this;
    }

    attach(prop: string, data: any): this {
        this[prop as keyof Entity] = data;
        this.tag(`@${prop}`);
        this.components.add(prop);
        this.emit('attach', prop, this);
        return this;
    }

    detach(prop: string): this {
        delete this[prop as keyof Entity];
        this.untag(`@${prop}`);
        this.components.delete(prop);
        this.emit('detach', prop, this);
        return this;
    }
    untag(tag: string): this {
        if (this.hasComponent(tag)) {
            console.warn(`${tag} cannot be detached`)
        }
        this.tags.delete(tag);
        this.emit('untag', tag, this);
        return this;
    }
    destroy(): void {
        super.destroy();
        this.components.forEach(component => this.detach(component));
        this.components.clear();
        this.tags.clear();
        this.tags.add('*');
    }
}

export default Entity;
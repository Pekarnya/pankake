import _ from "lodash";
import { IListener } from "../../interfaces";

class EventManager {
    public topics: Record<string, Set<IListener>> = {};

    emit(id: string, ...data: any[]): void {
        const listeners = this.topics[id];
        if (!listeners || listeners.size <= 0) {
            return;
        }
        listeners.forEach(listener => listener(...data));
    }

    hasTopic(id: string): boolean {
        return Reflect.has(this.topics, id);
    }

    on(id: string, listener: IListener) {
        if (!this.hasTopic(id)) {
            this.topics[id] = new Set();
        }

        this.topics[id].add(listener);
        return () => this.off(id, listener);
    }
    off(id: string, listener: IListener) {
        if (this.hasTopic(id)) {
            this.topics[id].delete(listener);
        }
    }

    destroy() {
        this.topics = {};
    }
}

export default EventManager;
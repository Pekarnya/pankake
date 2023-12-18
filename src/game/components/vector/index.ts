import Vec2 from "../../../shared/functors/vec2";

class VectorComponent extends Vec2 {
    constructor(public x: number, public y: number) {
        super(x, y);
        this.x = x;
        this.y = y;
    }
}

export default VectorComponent;
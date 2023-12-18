import * as _ from 'lodash';
class Vec2 {
    constructor(public x: number, public y: number) {
        this.x = x;
        this.y = y;
        // Object.freeze(this);
    }

    add(vec: Vec2) {
        return new Vec2(this.x + vec.x, this.y + vec.y);
    }

    substract(vec: Vec2) {
        return new Vec2(this.x - vec.x, this.y - vec.y);
    }

    scale(scalar: number) {
        return new Vec2(scalar * this.x, scalar * this.y);
    }

    magnitude() {
        return Math.sqrt((this.x * this.x) + (this.y * this.y));
    }

    normalize() {
        const magnitude = this.magnitude();
        return new Vec2(this.x / magnitude, this.y / magnitude);
    }
}

export default Vec2;
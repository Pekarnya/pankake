import { utils } from "pixi.js";
import Vec2 from "../../../shared/functors/vec2";
import { RGB } from "../../types";
import _ from "lodash";

class Cell {
    public type: string;
    width: number;
    height: number;
    vector: Vec2;
    color: number;
    isInCluster: boolean;
    colorName: string;
    isVisited: boolean;
    id: number;
    constructor(width: number, height: number, vector: Vec2, color: RGB, colorName: string) {
        this.type = 'cell';
        this.width = width;
        this.height = height;
        this.vector = vector;
        this.color = this.#getPixiColor(color);
        this.isInCluster = false;
        this.colorName = colorName;
        this.isVisited = false;
        this.id = utils.uid();
    }

    #getPixiColor(color: RGB): number {
        let normalizedArray: RGB;
        let maxNum: number;
        !_.isEmpty(color)
            ? maxNum = _.max(color) || 0
            : maxNum = 0;
        _.isFinite(maxNum)
            ? (normalizedArray = _.map(color, (num) => num / maxNum) as RGB)
            : normalizedArray = [0, 0, 0];
        return utils.rgb2hex(normalizedArray);
    }
}

export default Cell;
import { RGB } from "../game/types";

export const FILL_COLOR = 0xffffff;

export const colors: Map<string, RGB> = new Map([
    ["yellow", [252, 186, 3]],
    ["green", [115, 252, 3]],
    ["orange", [199, 66, 4]],
    ["red", [166, 8, 0]],
    ["blue", [26, 73, 201]],
]);

export const slotSizes = {
    width: () => window.innerWidth / 2,
    height: () => window.innerHeight / 2,
};

export const rowsColsNumber = {
    rows: 6,
    cols: 7,
};

export const minimumClusterSize = 3;

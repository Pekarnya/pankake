import { colors } from "../../constants";
import _ from "lodash";

class ColorChoose {
    static choseRandomColor() {
        const colorArray = Array.from(colors);
        const randomIndex = _.random(colorArray.length - 1);
        const [randomColorName, randomColorRGB] = colorArray[randomIndex];
        return {
            randomColorName,
            randomColorRGB
        };
    }
}
export default ColorChoose;
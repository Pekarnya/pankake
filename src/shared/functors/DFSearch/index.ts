import Cell from "../../../game/components/cell";
import { minimumClusterSize } from "../../constants";

class ClustersSearcher {
    static findClusters(grid: Cell[][], searchingColor: string) {
        const clusters = [];

        for (let i = 0; i < grid.length; i++) {
            for (let j = 0; j < grid[i].length; j++) {
                console.info("Searching clusters", grid[i][j]);;
                if (grid[i][j].colorName == searchingColor) {
                    const cluster: number[][] = [];
                    this.depthFirst(grid, i, j, searchingColor, cluster)
                    if (cluster.length >= minimumClusterSize) {
                        clusters.push(cluster);
                    }
                }
            }
        }
        console.info('clusters: ', clusters);
        return clusters;
    }

    static depthFirst(grid: Cell[][], row: number, col: number, searchingColor: string, cluster: Array<Array<number>>) {
        if (
            row < 0 ||
            row >= grid.length ||
            col < 0 ||
            col >= grid[0].length ||
            grid[row][col].colorName !== searchingColor ||
            grid[row][col].isVisited == true
        ) {
            return;
        }

        cluster.push([row, col]);
        grid[row][col].isVisited = true;

        this.depthFirst(grid, row + 1, col, searchingColor, cluster);
        this.depthFirst(grid, row - 1, col, searchingColor, cluster);
        this.depthFirst(grid, row, col + 1, searchingColor, cluster);
        this.depthFirst(grid, row, col - 1, searchingColor, cluster);


    }

    static markCells(grid: Cell[][], clusters: number[][][]) {
        clusters.forEach((colorCluster) => {
            colorCluster.forEach((vec) => {
                grid[vec[0]][vec[1]].isInCluster = true;
            })
        })
        return grid;
    }
}

export default ClustersSearcher;
class ShapeComponent {
    public type: string;
    public width: number;
    public height: number;
    constructor(width: number, height: number) {
        this.type = 'box';
        this.width = width;
        this.height = height;
    }
}

export default ShapeComponent;
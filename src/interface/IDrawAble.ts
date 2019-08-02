export interface IDrawAble {
    x: number;
    y: number;
    h: number;
    w: number;

    draw(): void;
    getBounds(): void;
};
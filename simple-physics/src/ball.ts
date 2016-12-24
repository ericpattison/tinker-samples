import {ColorSet,StrokeColor,ColorRGB,Circle} from 'tinker-core';
import {Point2D,Vector2D} from 'tinker-core';
import {PhysicsObject} from 'tinker-physics-euler';

class RenderableData implements ColorSet, Circle {
    public type: 'circle';
    public radius: number;
    public fill: ColorRGB;
    public stroke: StrokeColor;

    constructor(radius: number, colors:ColorSet) {
        this.type = 'circle';
        this.radius = radius;
        this.fill = colors.fill;
        this.stroke = colors.stroke;
    }
}

class PhysicsData implements PhysicsObject {
    public pos: Point2D;
    public inverseMass: number;
    public forces: Array<Vector2D>;
    public velocity: Vector2D;

    public constructor(pos:Point2D, inverseMass:number) {
        this.pos = pos;
        this.inverseMass = inverseMass;
        this.forces = [];
        this.velocity = new Vector2D({x:0,y:0});
    }

    public addForce(force: Vector2D) {
        this.forces.push(force);
    }
}

export class Ball {
    public graphics: RenderableData;
    public physics: PhysicsData;

    public constructor(pos:Point2D, inverseMass:number, radius:number, colors:ColorSet) {
        this.graphics = new RenderableData(radius, colors);
        this.physics = new PhysicsData(pos, inverseMass);
    }

    public get pos() { return this.physics.pos; }
}
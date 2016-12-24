import {Game, Canvas2D} from 'tinker-game';
import {Tinker, ColorRGB, Vector2D} from 'tinker-core';
import {EulerPhysics} from 'tinker-physics-euler';

import {Bounce} from './bounce';
import {Ball} from './ball';

let randomMass = () => {
    return Math.random() * 20 + 20
}

export class SimplePhysics extends Game {
    physicsEngine:EulerPhysics;
    collision: Bounce;
    balls: Array<Ball>;

    gravity: Vector2D;
    clearColor: ColorRGB;

    constructor() {
        super();
        this.clearColor = new ColorRGB(1,1,1);

        this.physicsEngine = new EulerPhysics();
        this.collision = new Bounce(470);
        
        this.gravity = new Vector2D({x:0, y:98});

        this.balls = [];
        for(let i = -5; i < 5; i++) {
            let b = new Ball(
                {x:320-(i*40), y: 0},
                randomMass(),
                10,
                {
                    fill: new ColorRGB(.5,1,0),
                    stroke:{
                        color: new ColorRGB(0,0,0),
                        size: 2
                    }
                }
            );
            this.balls.push(b);
            b.physics.addForce(this.gravity);
            this.physicsEngine.add(b.physics);
            this.collision.add(b.physics);
        }

        this.onUpdate(this.physicsEngine);
        this.onUpdate(this.collision);
    }

    update(dt: number): void { }

    render(surface: Canvas2D) {
        surface.clear({fill:this.clearColor});
        for(let i = 0; i < this.balls.length; ++i) {
            surface.drawShapeAt(this.balls[i].graphics, this.balls[i].pos);
        }
    }
}

Tinker(SimplePhysics);
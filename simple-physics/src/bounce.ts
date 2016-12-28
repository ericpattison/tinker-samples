import {Updater, UpdateContext} from 'tinker-game';
import{PhysicsObject} from 'tinker-physics-euler';

export class Bounce extends Updater {
    entities: Array<PhysicsObject>;

    constructor(public bound:number) {
        super();
        this.entities = [];
    }

    public add(entity:PhysicsObject) {
        this.entities.push(entity);
    }

    public invoke(context:UpdateContext, next:Function) {
        next();
        for(let i = 0; i < this.entities.length; ++i) {
            let entity = this.entities[i];
            if(entity.pos.y >= this.bound) {
                entity.pos.y = this.bound;
                entity.velocity = entity.velocity.mul(-.6);
            }
        }
    }
}
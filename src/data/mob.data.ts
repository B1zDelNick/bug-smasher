import {MonsterType} from '../config/game.config';

export class MobData {
    constructor(
        public type: MonsterType,
        public level: number,
        public hp: number,
        public speed: number,
        public jump: number, // % chance to switch lane
        public berserk: number, // % chance to became berserk
        public reward: number
    ) {}
}
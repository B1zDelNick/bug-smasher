import {MobData} from './mob.data';

export class LevelData {
    constructor(
        public duration: number,
        public minSpawn: number, // milis
        public maxSpawn: number, // milis
        public doubleSpawn: number, // %
        public tripleSpawn: number, // %
        public foodCount: number,
        public mobs: MobData[]) {
    }
}
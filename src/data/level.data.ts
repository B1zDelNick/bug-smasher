import {MobData} from './mob.data';

export class LevelData {
    constructor(
        public duration: number,
        public minSpawn: number, // milis
        public maxSpawn: number, // milis
        public doubleSpawn: number, // %
        public tripleSpawn: number, // %
        public foodCount: number,
        public presentChance: number,
        public presentMax: number,
        public mobs: MobData[],
        public boss: MobData = null) {
    }
}
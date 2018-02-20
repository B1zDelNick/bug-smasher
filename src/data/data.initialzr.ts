import {PlayerData} from './player.data';
import {GameConfig, MonsterType, WeaponType} from '../config/game.config';
import {MobData} from './mob.data';
import {LevelData} from './level.data';
export class DataInitializer {
    public static onInitCompleted: Phaser.Signal = new Phaser.Signal();

    public static init() {
        // load player from VK or similar
        const pd = new PlayerData();
        pd.coins = 5000;
        pd.progress = 19;
        pd.arsenal[WeaponType.SLIPPER] = 4;
        pd.arsenal[WeaponType.CHALK] = 2;
        pd.arsenal[WeaponType.POISON] = 1;
        pd.arsenal[WeaponType.GFINGER] = 2;
        pd.arsenal[WeaponType.SPRAY] = 1;
        GameConfig.PLAYER_DATA = pd;
        // mob datas
        const mobArray = [];
        mobArray['fly1'] = new MobData(MonsterType.FLY, 1, 1, 1.3, 5);
        mobArray['fly2'] = new MobData(MonsterType.FLY, 2, 1, 1.5, 5);
        mobArray['fly3'] = new MobData(MonsterType.FLY, 3, 2, 1.7, 5);
        mobArray['coc1'] = new MobData(MonsterType.COC, 3, 3, 1.3, 5);
        mobArray['coc2'] = new MobData(MonsterType.COC, 3, 3, 1.3, 5);
        mobArray['Coc3'] = new MobData(MonsterType.COC, 3, 3, 1.3, 5);
        // level datas
        GameConfig.LEVELS_DATA = [];
        GameConfig.LEVELS_DATA[1] = [];
        GameConfig.LEVELS_DATA[2] = [];
        GameConfig.LEVELS_DATA[3] = [];
        GameConfig.LEVELS_DATA[4] = [];
        GameConfig.LEVELS_DATA[5] = [];
        GameConfig.LEVELS_DATA[6] = [];
        GameConfig.LEVELS_DATA[7] = [];
        GameConfig.LEVELS_DATA[8] = [];
        GameConfig.LEVELS_DATA[1][1] = new LevelData(30, 90, 180, 0, 0, 11, [mobArray['fly1']]);
        GameConfig.LEVELS_DATA[1][2] = new LevelData(30, 90, 180, 0, 0, 11, [mobArray['fly1'], mobArray['fly2']]);
        GameConfig.LEVELS_DATA[1][3] = new LevelData(30, 90, 180, 0, 0, 11, [mobArray['fly1'], mobArray['fly2'], mobArray['fly3']]);
        DataInitializer.onInitCompleted.dispatch();
    }
}
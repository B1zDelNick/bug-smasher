import {PlayerData} from './player.data';
import {GameConfig, MonsterType, WeaponType} from '../config/game.config';
import {MobData} from './mob.data';
import {LevelData} from './level.data';
export class DataInitializer {
    public static onInitCompleted: Phaser.Signal = new Phaser.Signal();

    public static init() {
        // load player from VK or similar
        const pd = new PlayerData();
        pd.vid = '4';
        pd.coins = 0;
        pd.progress = 64;
        /*pd.arsenal[WeaponType.SLIPPER] = 2;
        pd.arsenal[WeaponType.CHALK] = 2;
        pd.arsenal[WeaponType.POISON] = 2;
        pd.arsenal[WeaponType.GFINGER] = 2;
        pd.arsenal[WeaponType.SPRAY] = 2;*/
        GameConfig.PLAYER_DATA = pd;
        // mob datas
        const mobArray = [];
        mobArray['fly1'] = new MobData(
            MonsterType.FLY,
            1, // level
            1, // hp
            5, // speed
            15, // jumps %
            10, // berserk %
            5); // reward
        mobArray['fly2'] = new MobData(MonsterType.FLY, 2, 1, 5.3, 25, 15, 7);
        mobArray['fly3'] = new MobData(MonsterType.FLY, 3, 2, 5.8, 35, 20, 9);
        mobArray['coc1'] = new MobData(MonsterType.COC, 1, 1, 5.2, 5, 15, 4);
        mobArray['coc2'] = new MobData(MonsterType.COC, 2, 1, 5.6, 7, 20, 6);
        mobArray['coc3'] = new MobData(MonsterType.COC, 3, 2, 5.9, 9, 25, 8);
        mobArray['bcoc1'] = new MobData(MonsterType.BIG_COC, 1, 4, 2.7, 5, 0, 25);
        mobArray['bcoc2'] = new MobData(MonsterType.BIG_COC, 2, 5, 3.1, 5, 0, 30);
        mobArray['bcoc3'] = new MobData(MonsterType.BIG_COC, 3, 6, 3.5, 5, 0, 35);
        mobArray['wasp1'] = new MobData(MonsterType.WASP, 1, 2, 3.3, 30, 5, 20);
        mobArray['wasp2'] = new MobData(MonsterType.WASP, 2, 3, 3.7, 40, 7, 25);
        mobArray['wasp3'] = new MobData(MonsterType.WASP, 3, 4, 4.1, 50, 9, 30);
        mobArray['spid1'] = new MobData(MonsterType.SPIDER, 1, 4, 3.3, 10, 5, 25);
        mobArray['spid2'] = new MobData(MonsterType.SPIDER, 2, 5, 3.8, 10, 5, 30);
        mobArray['spid3'] = new MobData(MonsterType.SPIDER, 3, 6, 4.3, 10, 5, 35);
        mobArray['larva1'] = new MobData(MonsterType.LARVA, 1, 3, 2.5, 5, 0, 30);
        mobArray['larva2'] = new MobData(MonsterType.LARVA, 2, 4, 2.9, 5, 0, 35);
        mobArray['larva3'] = new MobData(MonsterType.LARVA, 3, 5, 3.2, 5, 0, 40);
        mobArray['boss1'] = new MobData(MonsterType.BOSS, 1, 15, 2, 5, 0, 250);
        mobArray['boss2'] = new MobData(MonsterType.BOSS, 2, 17, 2, 5, 0, 280);
        mobArray['boss3'] = new MobData(MonsterType.BOSS, 3, 19, 2, 5, 0, 310);
        mobArray['boss4'] = new MobData(MonsterType.BOSS, 4, 21, 2, 5, 0, 340);
        mobArray['boss5'] = new MobData(MonsterType.BOSS, 5, 23, 2, 5, 0, 370);
        mobArray['boss6'] = new MobData(MonsterType.BOSS, 6, 25, 2, 5, 0, 400);
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
        GameConfig.LEVELS_DATA[1][1] = new LevelData(
            15, // duration
            25, // min spawn
            30, // max spawn
            2, // double spawn %
            2, // triple spawn
            11, // foods
            5, // present drop %
            2, // present max amount
            [mobArray['coc1']] // mobs
        );
        GameConfig.LEVELS_DATA[1][2] =
            new LevelData(15, 25, 30, 5, 2, 11, 5, 2, [mobArray['coc1'], mobArray['coc1'], mobArray['coc2']]);
        GameConfig.LEVELS_DATA[1][3] =
            new LevelData(15, 25, 30, 6, 2, 11, 5, 2, [mobArray['coc1'], mobArray['coc1'], mobArray['coc2'], mobArray['coc2']]);
        GameConfig.LEVELS_DATA[1][4] =
            new LevelData(15, 25, 30, 7, 2, 11, 5, 2, [mobArray['coc1'], mobArray['coc2'], mobArray['coc2']]);
        GameConfig.LEVELS_DATA[1][5] =
            new LevelData(15, 25, 30, 8, 2, 11, 5, 2, [mobArray['coc1'], mobArray['coc2'], mobArray['coc2'], mobArray['coc3']]);
        GameConfig.LEVELS_DATA[1][6] =
            new LevelData(15, 25, 30, 9, 3, 11, 5, 2, [mobArray['coc1'], mobArray['coc2'], mobArray['coc3']]);
        GameConfig.LEVELS_DATA[1][7] =
            new LevelData(20, 25, 30, 11, 3, 11, 5, 2, [mobArray['coc1'], mobArray['coc2'], mobArray['coc3'], mobArray['coc3']]);
        GameConfig.LEVELS_DATA[1][8] =
            new LevelData(20, 25, 30, 13, 4, 11, 5, 2, [mobArray['coc2'], mobArray['coc3'], mobArray['coc3']]);

        // level 2

        GameConfig.LEVELS_DATA[2][1] =
            new LevelData(15, 25, 35, 8, 4, 11, 5, 2, [mobArray['fly1'], mobArray['coc1']]);
        GameConfig.LEVELS_DATA[2][2] =
            new LevelData(15, 25, 35, 8, 3, 11, 5, 2, [mobArray['fly1'], mobArray['fly1'], mobArray['fly2'], mobArray['coc1'], mobArray['coc2']]);
        GameConfig.LEVELS_DATA[2][3] =
            new LevelData(15, 25, 35, 8, 3, 11, 5, 2, [mobArray['fly1'], mobArray['fly1'], mobArray['fly2'], mobArray['fly2'], mobArray['coc2'], mobArray['coc2']]);
        GameConfig.LEVELS_DATA[2][4] =
            new LevelData(15, 25, 35, 8, 3, 11, 5, 2, [mobArray['fly1'], mobArray['fly2'], mobArray['fly2'], mobArray['coc2'], mobArray['coc3']]);
        GameConfig.LEVELS_DATA[2][5] =
            new LevelData(15, 25, 35, 8, 4, 11, 5, 2, [mobArray['fly1'], mobArray['fly2'], mobArray['fly2'], mobArray['fly3'], mobArray['coc3']]);
        GameConfig.LEVELS_DATA[2][6] =
            new LevelData(15, 25, 35, 11, 5, 11, 5, 2, [mobArray['fly1'], mobArray['fly2'], mobArray['fly3'], mobArray['coc3']]);
        GameConfig.LEVELS_DATA[2][7] =
            new LevelData(20, 25, 35, 11, 5, 11, 5, 2, [mobArray['fly1'], mobArray['fly2'], mobArray['fly3'], mobArray['fly3'], mobArray['coc3']]);
        GameConfig.LEVELS_DATA[2][8] =
            new LevelData(20, 25, 35, 15, 5, 11, 5, 2, [mobArray['fly2'], mobArray['fly3'], mobArray['fly3'], mobArray['coc3']]);

        // level 3

        GameConfig.LEVELS_DATA[3][1] =
            new LevelData(15, 25, 35, 10, 0, 11, 5, 2, [
                mobArray['coc1'],
                mobArray['coc1'],
                mobArray['coc2'],
                mobArray['fly1']]);
        GameConfig.LEVELS_DATA[3][2] =
            new LevelData(15, 25, 35, 10, 2, 11, 5, 2, [
                mobArray['coc1'],
                mobArray['fly1'],
                mobArray['coc2'],
                mobArray['coc2'],
                mobArray['coc3'],
                mobArray['fly2'],
                mobArray['fly2']]);
        GameConfig.LEVELS_DATA[3][3] =
            new LevelData(15, 25, 35, 12, 3, 11, 5, 2, [
                mobArray['fly3'],
                mobArray['coc3'],
                mobArray['coc2'],
                mobArray['coc2'],
                mobArray['fly2'],
                mobArray['fly2']]);
        GameConfig.LEVELS_DATA[3][4] =
            new LevelData(15, 25, 35, 12, 3, 11, 5, 2, [
                mobArray['bcoc1'],
                mobArray['fly1'],
                mobArray['fly1'],
                mobArray['coc1'],
                mobArray['coc1'],
                mobArray['coc3'],
                mobArray['coc2'],
                mobArray['fly3'],
                mobArray['fly2']]);
        GameConfig.LEVELS_DATA[3][5] =
            new LevelData(15, 25, 35, 14, 4, 11, 5, 2, [
                mobArray['bcoc1'],
                mobArray['bcoc2'],
                mobArray['fly1'],
                mobArray['fly1'],
                mobArray['coc1'],
                mobArray['coc1'],
                mobArray['coc3'],
                mobArray['coc3'],
                mobArray['coc2'],
                mobArray['coc2'],
                mobArray['fly3'],
                mobArray['fly3'],
                mobArray['fly2'],
                mobArray['fly2']]);
        GameConfig.LEVELS_DATA[3][6] =
            new LevelData(15, 25, 35, 16, 5, 11, 5, 2, [
                mobArray['bcoc2'],
                mobArray['coc2'],
                mobArray['coc2'],
                mobArray['coc2'],
                mobArray['coc3'],
                mobArray['coc2'],
                mobArray['fly2'],
                mobArray['fly2'],
                mobArray['fly2'],
                mobArray['fly2'],
                mobArray['fly3']]);
        GameConfig.LEVELS_DATA[3][7] =
            new LevelData(20, 25, 35, 16, 5, 11, 5, 2, [
                mobArray['bcoc3'],
                mobArray['coc2'],
                mobArray['coc2'],
                mobArray['coc2'],
                mobArray['coc3'],
                mobArray['coc3'],
                mobArray['fly2'],
                mobArray['fly2'],
                mobArray['fly2'],
                mobArray['fly3'],
                mobArray['fly3']]);
        GameConfig.LEVELS_DATA[3][8] =
            new LevelData(20, 25, 35, 18, 5, 11, 5, 2, [
                mobArray['bcoc3'],
                mobArray['coc2'],
                mobArray['coc2'],
                mobArray['coc3'],
                mobArray['coc3'],
                mobArray['fly2'],
                mobArray['fly2'],
                mobArray['fly3'],
                mobArray['fly3']]);

        // level 4

        GameConfig.LEVELS_DATA[4][1] =
            new LevelData(20, 25, 35, 10, 0, 11, 5, 2, [
                mobArray['fly2'],
                mobArray['coc2'],
                mobArray['bcoc1']]);
        GameConfig.LEVELS_DATA[4][2] =
            new LevelData(20, 25, 35, 10, 2, 11, 5, 2, [
                mobArray['coc2'],
                mobArray['fly2'],
                mobArray['coc3'],
                mobArray['fly3'],
                mobArray['bcoc1']]);
        GameConfig.LEVELS_DATA[4][3] =
            new LevelData(20, 25, 35, 10, 3, 11, 5, 2, [
                mobArray['bcoc2'],
                mobArray['fly3'],
                mobArray['coc3'],
                mobArray['coc3'],
                mobArray['coc2'],
                mobArray['coc2'],
                mobArray['fly3'],
                mobArray['fly2'],
                mobArray['fly2']]);
        GameConfig.LEVELS_DATA[4][4] =
            new LevelData(20, 25, 35, 10, 3, 11, 5, 2, [
                mobArray['bcoc2'],
                mobArray['coc3'],
                mobArray['coc3'],
                mobArray['coc3'],
                mobArray['fly3'],
                mobArray['fly3'],
                mobArray['fly3']]);
        GameConfig.LEVELS_DATA[4][5] =
            new LevelData(20, 25, 35, 12, 3, 11, 5, 2, [
                mobArray['bcoc1'],
                mobArray['bcoc2'],
                mobArray['fly3'],
                mobArray['fly3'],
                mobArray['coc3'],
                mobArray['coc3'],
                mobArray['coc3'],
                mobArray['coc3'],
                mobArray['fly3'],
                mobArray['fly3'],
                mobArray['fly2'],
                mobArray['fly2']]);
        GameConfig.LEVELS_DATA[4][6] =
            new LevelData(20, 25, 40, 12, 3, 11, 5, 2, [
                mobArray['bcoc2'],
                mobArray['coc3'],
                mobArray['coc3'],
                mobArray['fly3'],
                mobArray['fly3']]);
        GameConfig.LEVELS_DATA[4][7] =
            new LevelData(25, 25, 40, 12, 4, 11, 5, 2, [
                mobArray['bcoc3'],
                mobArray['coc3'],
                mobArray['coc3'],
                mobArray['fly3'],
                mobArray['fly3']]);
        GameConfig.LEVELS_DATA[4][8] =
            new LevelData(25, 25, 40, 14, 4, 11, 5, 2, [
                mobArray['bcoc3'],
                mobArray['coc3'],
                mobArray['fly2'],
                mobArray['fly3']]);

        // level 5

        GameConfig.LEVELS_DATA[5][1] =
            new LevelData(25, 30, 45, 10, 0, 11, 5, 2, [
                mobArray['fly2'],
                mobArray['fly2'],
                mobArray['coc2'],
                mobArray['coc2'],
                mobArray['wasp1']]);
        GameConfig.LEVELS_DATA[5][2] =
            new LevelData(25, 30, 45, 10, 2, 11, 5, 2, [
                mobArray['wasp1'],
                mobArray['fly2'],
                mobArray['coc3'],
                mobArray['coc3'],
                mobArray['fly3']]);
        GameConfig.LEVELS_DATA[5][3] =
            new LevelData(25, 30, 45, 12, 3, 11, 5, 2, [
                mobArray['wasp1'],
                mobArray['fly3'],
                mobArray['coc3'],
                mobArray['coc3']]);
        GameConfig.LEVELS_DATA[5][4] =
            new LevelData(25, 30, 45, 12, 3, 11, 5, 2, [
                mobArray['wasp2'],
                mobArray['fly3'],
                mobArray['coc2'],
                mobArray['coc3']]);
        GameConfig.LEVELS_DATA[5][5] =
            new LevelData(25, 30, 45, 14, 4, 11, 5, 2, [
                mobArray['wasp1'],
                mobArray['wasp2'],
                mobArray['fly2'],
                mobArray['fly3'],
                mobArray['coc3']]);
        GameConfig.LEVELS_DATA[5][6] =
            new LevelData(30, 30, 45, 16, 5, 11, 5, 2, [
                mobArray['wasp1'],
                mobArray['wasp1'],
                mobArray['wasp2'],
                mobArray['fly2'],
                mobArray['fly3'],
                mobArray['coc2'],
                mobArray['bcoc1'],
                mobArray['coc3']]);
        GameConfig.LEVELS_DATA[5][7] =
            new LevelData(30, 30, 45, 16, 5, 11, 5, 2, [
                mobArray['wasp1'],
                mobArray['wasp2'],
                mobArray['wasp3'],
                mobArray['fly3'],
                mobArray['coc3'],
                mobArray['bcoc2']]);
        GameConfig.LEVELS_DATA[5][8] =
            new LevelData(30, 30, 45, 18, 5, 11, 5, 2, [
                mobArray['wasp2'],
                mobArray['wasp3'],
                mobArray['fly3'],
                mobArray['coc3'],
                mobArray['coc3'],
                mobArray['coc3'],
                mobArray['bcoc3']]
            );

        // level 6

        GameConfig.LEVELS_DATA[6][1] =
            new LevelData(25, 35, 50, 10, 0, 11, 5, 2, [
                mobArray['wasp1'],
                mobArray['fly2'],
                mobArray['fly2'],
                mobArray['coc3'],
                mobArray['coc2'],
                mobArray['spid1']]);
        GameConfig.LEVELS_DATA[6][2] =
            new LevelData(25, 35, 50, 10, 2, 11, 5, 2, [
                mobArray['bcoc2'],
                mobArray['wasp1'],
                mobArray['wasp2'],
                mobArray['fly3'],
                mobArray['fly3'],
                mobArray['coc3'],
                mobArray['coc3'],
                mobArray['coc3'],
                mobArray['spid2'],
                mobArray['spid1']]);
        GameConfig.LEVELS_DATA[6][3] =
            new LevelData(25, 35, 50, 12, 3, 11, 5, 2, [
                mobArray['bcoc2'],
                mobArray['wasp3'],
                mobArray['wasp3'],
                mobArray['fly3'],
                mobArray['fly3'],
                mobArray['fly3'],
                mobArray['coc3'],
                mobArray['coc3'],
                mobArray['coc3'],
                mobArray['spid2']]);
        GameConfig.LEVELS_DATA[6][4] =
            new LevelData(25, 35, 50, 12, 3, 11, 5, 2, [
                mobArray['bcoc3'],
                mobArray['wasp2'],
                mobArray['wasp3'],
                mobArray['wasp3'],
                mobArray['fly3'],
                mobArray['fly3'],
                mobArray['fly3'],
                mobArray['coc3'],
                mobArray['coc3'],
                mobArray['coc3'],
                mobArray['coc3'],
                mobArray['spid3']]);
        GameConfig.LEVELS_DATA[6][5] =
            new LevelData(25, 35, 50, 14, 4, 11, 5, 2, [
                mobArray['bcoc2'],
                mobArray['bcoc3'],
                mobArray['wasp3'],
                mobArray['wasp3'],
                mobArray['wasp2'],
                mobArray['fly3'],
                mobArray['fly3'],
                mobArray['fly3'],
                mobArray['coc3'],
                mobArray['coc3'],
                mobArray['coc3'],
                mobArray['coc3'],
                mobArray['coc3'],
                mobArray['spid2'],
                mobArray['spid3']]);
        GameConfig.LEVELS_DATA[6][6] =
            new LevelData(30, 35, 50, 16, 5, 11, 5, 2, [
                mobArray['bcoc2'],
                mobArray['bcoc3'],
                mobArray['wasp3'],
                mobArray['wasp3'],
                mobArray['fly3'],
                mobArray['fly3'],
                mobArray['coc3'],
                mobArray['coc3'],
                mobArray['coc3'],
                mobArray['coc3'],
                mobArray['spid2'],
                mobArray['spid3']]);
        GameConfig.LEVELS_DATA[6][7] =
            new LevelData(30, 35, 50, 16, 5, 11, 5, 2, [
                mobArray['bcoc3'],
                mobArray['wasp3'],
                mobArray['wasp3'],
                mobArray['fly3'],
                mobArray['fly3'],
                mobArray['coc3'],
                mobArray['coc3'],
                mobArray['spid3']]);
        GameConfig.LEVELS_DATA[6][8] =
            new LevelData(30, 35, 50, 18, 5, 11, 5, 2, [
                mobArray['bcoc3'],
                mobArray['wasp2'],
                mobArray['wasp3'],
                mobArray['fly3'],
                mobArray['coc3'],
                mobArray['spid3']],
                mobArray['boss2']
            );

        // level 7

        GameConfig.LEVELS_DATA[7][1] =
            new LevelData(30, 40, 55, 10, 0, 11, 5, 2, [
                mobArray['wasp2'],
                mobArray['fly3'],
                mobArray['coc3'],
                mobArray['coc3'],
                mobArray['spid2']]);
        GameConfig.LEVELS_DATA[7][2] =
            new LevelData(30, 40, 55, 10, 2, 11, 5, 2, [
                mobArray['bcoc2'],
                mobArray['wasp2'],
                mobArray['fly3'],
                mobArray['fly3'],
                mobArray['coc3'],
                mobArray['coc3'],
                mobArray['coc3'],
                mobArray['spid2']]);
        GameConfig.LEVELS_DATA[7][3] =
            new LevelData(30, 40, 55, 12, 3, 11, 5, 2, [
                mobArray['bcoc2'],
                mobArray['wasp2'],
                mobArray['wasp3'],
                mobArray['fly3'],
                mobArray['fly3'],
                mobArray['fly3'],
                mobArray['coc3'],
                mobArray['coc3'],
                mobArray['coc3'],
                mobArray['spid2']]);
        GameConfig.LEVELS_DATA[7][4] =
            new LevelData(30, 40, 55, 12, 3, 11, 5, 2, [
                mobArray['bcoc3'],
                mobArray['wasp2'],
                mobArray['wasp3'],
                mobArray['wasp3'],
                mobArray['fly3'],
                mobArray['fly3'],
                mobArray['fly3'],
                mobArray['coc3'],
                mobArray['coc3'],
                mobArray['coc3'],
                mobArray['spid2'],
                mobArray['spid3']]);
        GameConfig.LEVELS_DATA[7][5] =
            new LevelData(30, 40, 55, 14, 4, 11, 5, 2, [
                mobArray['bcoc3'],
                mobArray['wasp3'],
                mobArray['wasp3'],
                mobArray['fly3'],
                mobArray['fly3'],
                mobArray['coc3'],
                mobArray['coc3'],
                mobArray['coc3'],
                mobArray['spid2'],
                mobArray['spid3']]);
        GameConfig.LEVELS_DATA[7][6] =
            new LevelData(35, 40, 55, 16, 5, 11, 5, 2, [
                mobArray['bcoc3'],
                mobArray['wasp3'],
                mobArray['wasp3'],
                mobArray['fly3'],
                mobArray['coc3'],
                mobArray['coc3'],
                mobArray['spid3']]);
        GameConfig.LEVELS_DATA[7][7] =
            new LevelData(35, 40, 55, 16, 5, 11, 5, 2, [
                mobArray['bcoc3'],
                mobArray['wasp3'],
                mobArray['wasp3'],
                mobArray['fly3'],
                mobArray['fly3'],
                mobArray['coc3'],
                mobArray['coc3'],
                mobArray['spid3']]);
        GameConfig.LEVELS_DATA[7][8] =
            new LevelData(35, 40, 55, 18, 5, 11, 5, 2, [
                mobArray['bcoc3'],
                mobArray['wasp3'],
                mobArray['fly3'],
                mobArray['coc3'],
                mobArray['coc3'],
                mobArray['spid3']],
                mobArray['boss2']
            );

        // level 8

        GameConfig.LEVELS_DATA[8][1] =
            new LevelData(30, 45, 55, 10, 0, 11, 5, 2, [
                mobArray['wasp2'],
                mobArray['fly3'],
                mobArray['coc3'],
                mobArray['coc3'],
                mobArray['larva1']]);
        GameConfig.LEVELS_DATA[8][2] =
            new LevelData(30, 45, 55, 10, 2, 11, 5, 2, [
                mobArray['bcoc2'],
                mobArray['wasp2'],
                mobArray['fly3'],
                mobArray['fly3'],
                mobArray['coc3'],
                mobArray['coc3'],
                mobArray['coc3'],
                mobArray['coc3'],
                mobArray['larva1']]);
        GameConfig.LEVELS_DATA[8][3] =
            new LevelData(30, 45, 55, 12, 3, 11, 5, 2, [
                mobArray['bcoc2'],
                mobArray['wasp2'],
                mobArray['wasp3'],
                mobArray['fly3'],
                mobArray['fly3'],
                mobArray['fly3'],
                mobArray['coc3'],
                mobArray['coc3'],
                mobArray['coc3'],
                mobArray['larva1'],
                mobArray['spid2']]);
        GameConfig.LEVELS_DATA[8][4] =
            new LevelData(30, 45, 55, 12, 3, 11, 5, 2, [
                mobArray['bcoc3'],
                mobArray['wasp2'],
                mobArray['wasp3'],
                mobArray['wasp3'],
                mobArray['fly3'],
                mobArray['fly3'],
                mobArray['fly3'],
                mobArray['coc3'],
                mobArray['coc3'],
                mobArray['coc3'],
                mobArray['larva2'],
                mobArray['spid2'],
                mobArray['spid3']]);
        GameConfig.LEVELS_DATA[8][5] =
            new LevelData(30, 45, 55, 14, 4, 11, 5, 2, [
                mobArray['bcoc3'],
                mobArray['wasp3'],
                mobArray['wasp3'],
                mobArray['fly3'],
                mobArray['fly3'],
                mobArray['coc3'],
                mobArray['coc3'],
                mobArray['coc3'],
                mobArray['larva1'],
                mobArray['larva2'],
                mobArray['spid2'],
                mobArray['spid3']],
                mobArray['boss3']
            );
        GameConfig.LEVELS_DATA[8][6] =
            new LevelData(35, 45, 55, 16, 5, 11, 5, 2, [
                mobArray['bcoc3'],
                mobArray['wasp3'],
                mobArray['wasp3'],
                mobArray['fly3'],
                mobArray['coc3'],
                mobArray['coc3'],
                mobArray['larva3'],
                mobArray['spid3']],
                mobArray['boss4']
            );
        GameConfig.LEVELS_DATA[8][7] =
            new LevelData(35, 45, 55, 16, 5, 11, 5, 2, [
                mobArray['bcoc3'],
                mobArray['wasp3'],
                mobArray['wasp3'],
                mobArray['fly3'],
                mobArray['fly3'],
                mobArray['coc3'],
                mobArray['coc3'],
                mobArray['larva3'],
                mobArray['spid3']],
                mobArray['boss5']
            );
        GameConfig.LEVELS_DATA[8][8] =
            new LevelData(35, 45, 55, 18, 5, 11, 5, 2, [
                mobArray['bcoc3'],
                mobArray['wasp3'],
                mobArray['fly3'],
                mobArray['coc3'],
                mobArray['coc3'],
                mobArray['larva3'],
                mobArray['spid3']],
                mobArray['boss6']
            );

        DataInitializer.onInitCompleted.dispatch();
    }
}
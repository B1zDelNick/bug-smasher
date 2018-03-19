import {Doll} from '../states/template/dress/doll';
import {DecorBackground} from '../states/template/decor/decor.background';
import {PlayerData} from '../data/player.data';
import {LevelData} from '../data/level.data';

export class GameConfig {

    public static GAME: Phaser.Game = null;
    public static GADGET: GadgetMode = null;
    public static LOCALE: LOCALE = null;
    public static ASSET_MODE: AssetMode = null;
    public static ASSET_SIZE: string = null;
    public static PUB_MODE: PublishMode = null;
    public static IS_ASSETS_LOADED: boolean = false;
    public static CURRENT_STATE: number = 0;
    public static GAME_RESULT: number = 0;
    public static GAME_COMPLETED: boolean = false;

    public static FREE_RESULT: any = null;
    public static PLAYER_DATA: PlayerData = null;
    public static LEVELS_DATA: Array<any> = null;

    public static SELECTED_BG: number = 0;
    public static SELECTED_LVL: number = 1;
    public static SELECTED_STAGE: number = 3;
    public static PROGRESS: number = 0;
    public static SCORE_1: number = 0;
    public static SCORE_2: number = 0;
    public static SCORE_3: number = 0;
    public static SCORE_4: number = 0;
    public static SCORE_5: number = 0;
    public static SCORE_6: number = 0;

    private static _inited: boolean = false;
    private static _gameId: string;

    public static init(gadget: GadgetMode, pmode: PublishMode, amode: AssetMode, gameTitle: string) {
        if (this._inited) return;

        this._inited = true;
        this.GADGET = gadget;
        this.ASSET_MODE = amode;
        this.PUB_MODE = pmode;
    }

    public static getTitle(): string {
        return this._gameId;
    }

    public static getLevelData(lvl: number, stg: number): LevelData {
        return GameConfig.LEVELS_DATA[lvl][stg] as LevelData;
    }
}

export enum LOCALE {
    RUS = 'Ru',
    ENG = 'En'
}

export enum GadgetMode {
    DESKTOP,
    MOBILE
}

export enum PublishMode {
    VK,
    FB,
    OK,
    WEB
}

export enum AssetMode {
    LOAD_ALL,
    LOAD_BACKGROUND,
    LOAD_BEFORE
}

export enum WeaponType {
    FINGER = 'FingerMale',
    SLIPPER = 'Slipper',
    CHALK = 'Chalk',
    POISON = 'Poison',
    GFINGER = 'FingerFemale',
    SPRAY = 'Spray'
}

export enum MonsterType {
    FLY = 'Fly',
    WASP = 'Wasp',
    LARVA = 'Larva',
    SPIDER = 'Spidy',
    COC = 'Coc',
    BIG_COC = 'Bcoc',
}

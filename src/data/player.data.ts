import {GameConfig, WeaponType} from '../config/game.config';
import {isUndefined} from 'util';
export class PlayerData {
    public vid: string;
    public coins: number = 0;
    public progress: number = 1; // 1-8 for first, 9-16 second etc...

    public arsenal = [];

    public moneyChanged: Phaser.Signal = new Phaser.Signal();

    public isLevelUnlocked(lvl: number): boolean {
        return this.progress > (lvl - 1) * 8;
    }

    public isStageUnlocked(lvl: number, stg: number): boolean {
        return this.progress >= (lvl - 1) * 8 + stg;
    }

    public reduceWeapon(c: WeaponType) {
        this.arsenal[c]--;
    }

    public addCoins(amount: number) {
        this.coins += amount;
        this.moneyChanged.dispatch(this.coins);
    }

    public unlockWeapon(wt: WeaponType) {
        this.arsenal[wt] = 3;
    }

    public unlockNext() {
        if (this.progress === (GameConfig.SELECTED_LVL - 1) * 8 + GameConfig.SELECTED_STAGE) {
            this.progress++;
        }
    }

    public dropIsPossible(): boolean {
        return !isUndefined(this.arsenal[WeaponType.SLIPPER])
            || !isUndefined(this.arsenal[WeaponType.CHALK])
            || !isUndefined(this.arsenal[WeaponType.POISON])
            || !isUndefined(this.arsenal[WeaponType.GFINGER])
            || !isUndefined(this.arsenal[WeaponType.SPRAY]);
    }

    public getPossibleDrop(): WeaponType[] {
        let arr: WeaponType[] = [];
        if (!isUndefined(this.arsenal[WeaponType.SLIPPER])) {
            arr.push(WeaponType.SLIPPER);
        }
        if (!isUndefined(this.arsenal[WeaponType.CHALK])) {
            arr.push(WeaponType.CHALK);
        }
        if (!isUndefined(this.arsenal[WeaponType.POISON])) {
            arr.push(WeaponType.POISON);
        }
        if (!isUndefined(this.arsenal[WeaponType.GFINGER])) {
            arr.push(WeaponType.GFINGER);
        }
        if (!isUndefined(this.arsenal[WeaponType.SPRAY])) {
            arr.push(WeaponType.SPRAY);
        }
        return arr;
    }
}
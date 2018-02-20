export class PlayerData {
    public coins: number = 0;
    public progress: number = 0; // 1-8 for first, 9-16 second etc...

    public arsenal = [];

    public isLevelUnlocked(lvl: number): boolean {
        return this.progress >= (lvl - 1) * 8;
    }

    public isStageUnlocked(lvl: number, stg: number): boolean {
        return this.progress >= (lvl - 1) * 8 + stg - 1;
    }
}
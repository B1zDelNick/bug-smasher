import {GameConfig, MonsterType} from '../../../../config/game.config';
import {ImageUtils} from '../../../../utils/images/image.utils';
import {TweenUtils} from '../../../../utils/tween.utils';
import {Mob} from '../mobs/mob';

export class Slipper {

    private game: Phaser.Game = null;
    private container: Phaser.Group = null;
    public smashPoint: Phaser.Point = new Phaser.Point();
    private base: Phaser.Sprite = null;
    private web: Phaser.Sprite = null;
    private txt: Phaser.Sprite = null;
    private animating: boolean = false;
    private spiderBited: boolean = false;
    private spiderBiteTimer: number = 0;

    constructor() {
        this.game = GameConfig.GAME;
        this.container = this.game.add.group();
        this.base = this.game.add.sprite(-158, -157,
            ImageUtils.getAtlasClass('AtlasesWeaponSlipper').getName(),
            ImageUtils.getAtlasClass('AtlasesWeaponSlipper').Frames.Base,
            this.container
        );
        this.txt = this.game.add.sprite(-158, -157,
            ImageUtils.getAtlasClass('AtlasesWeaponSlipper').getName(),
            ImageUtils.getAtlasClass('AtlasesWeaponSlipper').Frames['Dad' + GameConfig.LOCALE],
            this.container
        );
        this.web = this.game.add.sprite(-158, -157,
            ImageUtils.getAtlasClass('AtlasesWeaponSlipper').getName(),
            ImageUtils.getAtlasClass('AtlasesWeaponSlipper').Frames.Web,
            this.container
        );
        this.web.alpha = 0;
        this.container.position.setTo(540, 960);
    }

    public update() {
        if (this.spiderBited) {
            this.spiderBiteTimer++;
            if (this.spiderBiteTimer >= 60 * 5) {
                this.spiderBited = false;
                this.spiderBiteTimer = 0;
                TweenUtils.fadeOut(this.web, 250);
            }
        }
    }

    public smash(point: Phaser.Point, callback: Function, context: any): boolean {
        if (this.animating) {
            return false;
        }
        this.animating = true;
        this.smashPoint = point;
        TweenUtils.kill(this.container);
        TweenUtils.kill(this.container.scale);
        TweenUtils.delayedCall(100 * this.getMultiplier(), callback, context);
        TweenUtils.moveAndRotate(this.container, point.x, point.y + 5 * this.getMultiplier(), 0, 110 * this.getMultiplier(), 0, () => {}, this);
        return true;
    }

    public processMob(mobs: Mob[]) {
        /*if (mobs === null) {
            this.animating = false;
            TweenUtils.delayedCall(200 * this.getMultiplier(), this.toHoldPosition, this);
            return;
        }*/
        TweenUtils.scale(this.container, .95, 150 * this.getMultiplier(), 0, true, () => {
            if (this.containsSpiders(mobs) && !this.spiderBited) { // SPIDY TODO
                this.spiderBited = true;
                this.animating = false;
                TweenUtils.fadeIn(this.web, 250);
            }
            else {
                this.animating = false;
            }
            TweenUtils.delayedCall(20 * this.getMultiplier(), this.toHoldPosition, this);
        }, this);
    }

    private containsSpiders(mobs: Mob[]): boolean {
        for (let m of mobs) {
            if (m.getType() === MonsterType.SPIDER) {
                return true;
            }
        }
        return false;
    }

    private getMultiplier(): number {
        return this.spiderBited ? 2.5 : 1;
    }

    public getPosition(): Phaser.Point {
        return this.container.position;
    }

    public getSmashPosition(): Phaser.Point {
        return this.smashPoint;
    }

    public toHoldPosition() {
        if (this.animating)
            return;
        TweenUtils.moveAndRotate(this.container, 700, 960, 0, 300 * this.getMultiplier());
    }

    public toOutPosition() {
        TweenUtils.moveAndRotate(this.container, 700, 960, 0, 300 * this.getMultiplier());
    }

    public dispose() {
        this.container.removeAll(true, true, true);
        this.container.destroy(true);
    }
}
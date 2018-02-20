import {GameConfig, MonsterType} from '../../../../config/game.config';
import {ImageUtils} from '../../../../utils/images/image.utils';
import {TweenUtils} from '../../../../utils/tween.utils';
import {Mob} from '../mobs/mob';

export class Slipper {

    private game: Phaser.Game = null;
    private container: Phaser.Group = null;
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

    public smash(mob: Mob, callback: Function, context: any): boolean {
        if (this.animating) {
            return false;
        }
        this.animating = true;
        TweenUtils.kill(this.container);
        TweenUtils.kill(this.container.scale);
        TweenUtils.delayedCall(200 * this.getMultiplier(), callback, context);
        TweenUtils.moveAndRotate(this.container, mob.getX(), mob.getY() + 25 * this.getMultiplier(), 0, 210 * this.getMultiplier(), 0, () => {
            TweenUtils.scale(this.container, .95, 150 * this.getMultiplier(), 0, true, () => {
                if (mob.getType() === MonsterType.SPIDER && !this.spiderBited) { // SPIDY TODO
                    this.spiderBited = true;
                    this.animating = false;
                    TweenUtils.fadeIn(this.web, 250);
                }
                else {
                    this.animating = false;
                }
                TweenUtils.delayedCall(20 * this.getMultiplier(), this.toHoldPosition, this);
            }, this);
        }, this);
        return true;
    }

    private getMultiplier(): number {
        return this.spiderBited ? 2.5 : 1;
    }

    public toHoldPosition() {
        if (this.animating)
            return;
        TweenUtils.moveAndRotate(this.container, 538, 866, -34, 300 * this.getMultiplier());
    }

    public toOutPosition() {
        TweenUtils.moveAndRotate(this.container, 700, 960, 0, 300 * this.getMultiplier());
    }
}
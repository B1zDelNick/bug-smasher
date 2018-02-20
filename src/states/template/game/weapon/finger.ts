import {GameConfig, MonsterType} from '../../../../config/game.config';
import {ImageUtils} from '../../../../utils/images/image.utils';
import {TweenUtils} from '../../../../utils/tween.utils';
import {Mob} from '../mobs/mob';

export class Finger {

    private game: Phaser.Game = null;
    private container: Phaser.Group = null;
    private kishContainer: Phaser.Group = null;
    public base: Phaser.Sprite = null;
    private ouch1: Phaser.Sprite = null;
    private ouch2: Phaser.Sprite = null;
    private web: Phaser.Sprite = null;
    private spot: Phaser.Sprite = null;
    private animating: boolean = false;
    private waspBited: boolean = false;
    private spiderBited: boolean = false;
    private spiderBiteTimer: number = 0;

    constructor() {
        this.game = GameConfig.GAME;
        this.container = this.game.add.group();
        this.base = this.game.add.sprite(-210, -115,
            ImageUtils.getAtlasClass('AtlasesWeaponFinger').getName(),
            ImageUtils.getAtlasClass('AtlasesWeaponFinger').Frames.Base,
            this.container
        );
        this.kishContainer = this.game.add.group();
        this.container.add(this.kishContainer);
        this.spot = this.game.add.sprite(-210, -115,
            ImageUtils.getAtlasClass('AtlasesWeaponFinger').getName(),
            ImageUtils.getAtlasClass('AtlasesWeaponFinger').Frames.Spot,
            this.container
        );
        this.spot.alpha = 0;
        this.ouch1 = this.game.add.sprite(-210, -115,
            ImageUtils.getAtlasClass('AtlasesWeaponFinger').getName(),
            ImageUtils.getAtlasClass('AtlasesWeaponFinger').Frames.Ouch1,
            this.container
        );
        this.ouch1.alpha = 0;
        this.ouch2 = this.game.add.sprite(-210, -115,
            ImageUtils.getAtlasClass('AtlasesWeaponFinger').getName(),
            ImageUtils.getAtlasClass('AtlasesWeaponFinger').Frames.Ouch2,
            this.container
        );
        this.ouch2.alpha = 0;
        this.web = this.game.add.sprite(-210, -115,
            ImageUtils.getAtlasClass('AtlasesWeaponFinger').getName(),
            ImageUtils.getAtlasClass('AtlasesWeaponFinger').Frames.Web,
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
            this.addKish(mob.getType());
            TweenUtils.scale(this.container, .95, 150 * this.getMultiplier(), 0, true, () => {
                if (mob.getType() === MonsterType.WASP) { // % TODO
                    this.addWaspBite();
                }
                else if (mob.getType() === MonsterType.SPIDER && !this.spiderBited) { // SPIDY TODO
                    this.spiderBited = true;
                    this.animating = false;
                    TweenUtils.fadeIn(this.web, 250);
                }
                else {
                    this.animating = false;
                }
                TweenUtils.delayedCall(20 * this.getMultiplier(), this.toHoldPosition, this);
            }, this);
            /*TweenUtils.delayedCall(320 * this.getMultiplier(), this.toHoldPosition, this);*/
        }, this);
        return true;
    }

    private getMultiplier(): number {
        return this.spiderBited ? 2.5 : 1;
    }

    private addKish(mob: MonsterType) {
        const k = this.game.add.sprite(-210, -115,
            ImageUtils.getAtlasClass('AtlasesWeaponFinger2').getName(),
            ImageUtils.getAtlasClass('AtlasesWeaponFinger2').Frames[mob + 'Kish'],
            this.kishContainer
        );
        k.alpha = 0;
        TweenUtils.fadeIn(k, 250, 0, () => {
            TweenUtils.fadeOut(k, 250, 3000, () => {
                k.destroy(true);
            }, this);
        }, this);
    }

    private addWaspBite() {
        this.waspBited = true;
        TweenUtils.fade(this.spot, 1, 250 * 1.4, 0, 2, true);
        TweenUtils.fade(this.ouch1, 1, 250 * 1.4, 0, 0, false, () => {
            TweenUtils.fade(this.ouch2, 1, 250 * 1.4, 0, 2, true);
            TweenUtils.delayedCall(1500 * 1.4, () => {
                TweenUtils.fadeOut(this.ouch1, 250 * 1.4);
                this.waspBited = false;
                this.animating = false;
                this.toHoldPosition();
            }, this);
        }, this);
    }

    public toHoldPosition() {
        if (this.waspBited || this.animating)
            return;
        TweenUtils.moveAndRotate(this.container, 465, 670, -30, 300 * this.getMultiplier());
    }

    public toOutPosition() {
        TweenUtils.moveAndRotate(this.container, 700, 960, 0, 300 * this.getMultiplier());
    }
}
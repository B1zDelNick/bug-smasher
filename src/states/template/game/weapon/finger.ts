import {GameConfig, MonsterType} from '../../../../config/game.config';
import {ImageUtils} from '../../../../utils/images/image.utils';
import {TweenUtils} from '../../../../utils/tween.utils';
import {Mob} from '../mobs/mob';
import {Boss} from '../mobs/boss';
import {SoundUtils} from '../../../../utils/sound/sound.utils';

export class Finger {

    private game: Phaser.Game = null;
    private container: Phaser.Group = null;
    private kishContainer: Phaser.Group = null;
    public smashPoint: Phaser.Point = new Phaser.Point();
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
            if (this.spiderBiteTimer >= 30 * 5) {
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
        TweenUtils.moveAndRotate(this.container, point.x, point.y + 5 * this.getMultiplier(), 0, 210 * this.getMultiplier(), 0, () => {}, this);
        return true;
    }

    processMob(mob: Mob|Boss) {
        if (mob === null) {
            this.animating = false;
            TweenUtils.delayedCall(200 * this.getMultiplier(), this.toHoldPosition, this);
            return;
        }
        if (mob.isDead() && mob.getType() !== MonsterType.BOSS)
            this.addKish(mob.getType());
        TweenUtils.scale(this.container, .95, 150 * this.getMultiplier(), 0, true, () => {
            if (mob.getType() === MonsterType.WASP && this.game.rnd.between(0, 100) < 10) { // % TODO
                this.addWaspBite();
                if (SoundUtils.isSoundEnabled())
                    SoundUtils.playFX('Ouch');
            }
            else if (mob.getType() === MonsterType.SPIDER && !this.spiderBited && this.game.rnd.between(0, 100) < 5) { // SPIDY TODO
                this.spiderBited = true;
                this.animating = false;
                TweenUtils.fadeIn(this.web, 250);
                if (SoundUtils.isSoundEnabled())
                    SoundUtils.playFX('Web');
            }
            else {
                this.animating = false;
            }
            TweenUtils.delayedCall(20 * this.getMultiplier(), this.toHoldPosition, this);
        }, this);
    }

    private getMultiplier(): number {
        return this.spiderBited ? 1.7 : 1;
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
        TweenUtils.fade(this.spot, 1, 100 * 1.4, 0, 2, true);
        TweenUtils.fade(this.ouch1, 1, 100 * 1.4, 0, 0, false, () => {
            TweenUtils.fade(this.ouch2, 1, 100 * 1.4, 0, 2, true);
            TweenUtils.delayedCall(610 * 1.4, () => {
                TweenUtils.fadeOut(this.ouch1, 100 * 1.4);
                this.waspBited = false;
                this.animating = false;
                this.toHoldPosition();
            }, this);
        }, this);
    }

    public getPosition(): Phaser.Point {
        return this.container.position;
    }

    public getSmashPosition(): Phaser.Point {
        return this.smashPoint;
    }

    public toHoldPosition() {
        if (this.waspBited || this.animating)
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
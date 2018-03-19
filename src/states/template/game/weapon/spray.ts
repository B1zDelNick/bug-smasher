import {GameConfig, LOCALE, MonsterType} from '../../../../config/game.config';
import {ImageUtils} from '../../../../utils/images/image.utils';
import {TweenUtils} from '../../../../utils/tween.utils';
import {EffectUtils} from '../../../../utils/effect.utils';
import {SoundUtils} from '../../../../utils/sound/sound.utils';

export class Spray {

    public onKill: Phaser.Signal = new Phaser.Signal();
    public onEnd: Phaser.Signal = new Phaser.Signal();
    private game: Phaser.Game = null;
    private container: Phaser.Group = null;
    private base: Phaser.Sprite = null;
    private atom: Phaser.Sprite = null;
    private sp1: Phaser.Sprite = null;
    private sp2: Phaser.Sprite = null;
    private sp3: Phaser.Sprite = null;
    private web: Phaser.Sprite = null;
    private animating: boolean = false;
    private spraying: boolean = false;
    public activated: boolean = false;
    private spiderBited: boolean = false;
    private spiderBiteTimer: number = 0;
    private putBrushTimer: number = 0;
    private timer: number = 0;

    constructor() {
        this.game = GameConfig.GAME;
        this.container = this.game.add.group();
        this.sp1 = this.game.add.sprite(-430, -323,
            ImageUtils.getAtlasClass('AtlasesWeaponSpray').getName(),
            ImageUtils.getAtlasClass('AtlasesWeaponSpray').Frames.Spr1,
            this.container
        );
        this.sp2 = this.game.add.sprite(-430, -323,
            ImageUtils.getAtlasClass('AtlasesWeaponSpray').getName(),
            ImageUtils.getAtlasClass('AtlasesWeaponSpray').Frames.Spr2,
            this.container
        );
        this.sp3 = this.game.add.sprite(-430, -323,
            ImageUtils.getAtlasClass('AtlasesWeaponSpray').getName(),
            ImageUtils.getAtlasClass('AtlasesWeaponSpray').Frames.Spr3,
            this.container
        );
        this.atom = this.game.add.sprite(-430, -323,
            ImageUtils.getAtlasClass('AtlasesWeaponSpray').getName(),
            ImageUtils.getAtlasClass('AtlasesWeaponSpray').Frames.Atom,
            this.container
        );
        this.sp1.alpha = 0;
        this.sp2.alpha = 0;
        this.sp3.alpha = 0;
        this.atom.alpha = 0;
        this.base = this.game.add.sprite(-430, -323,
            ImageUtils.getAtlasClass('AtlasesWeaponSpray').getName(),
            ImageUtils.getAtlasClass('AtlasesWeaponSpray').Frames.Base,
            this.container
        );
        this.web = this.game.add.sprite(-430, -323,
            ImageUtils.getAtlasClass('AtlasesWeaponSpray').getName(),
            ImageUtils.getAtlasClass('AtlasesWeaponSpray').Frames.Web,
            this.container
        );
        this.web.alpha = 0;
        this.container.position.setTo(540, 960);
        /*this.game.input.onDown.add(() => {
            this.spraying = true;
            this.atom.visible = true;
            this.sp1.visible = true;
            this.sp2.visible = true;
            this.sp3.visible = true;
        }, this);
        this.game.input.onUp.add(() => {
            this.spraying = false;
            this.atom.visible = false;
            this.sp1.visible = false;
            this.sp2.visible = false;
            this.sp3.visible = false;
        }, this);*/
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
        if (this.activated) {
            this.putBrushTimer++;
            this.timer++;
            if (this.game.input.mousePointer.isDown) {
                this.spraying = true;
                this.atom.visible = true;
                this.sp1.visible = true;
                this.sp2.visible = true;
                this.sp3.visible = true;
            }
            else if (!this.game.device.desktop) {
                this.spraying = true;
                this.atom.visible = true;
                this.sp1.visible = true;
                this.sp2.visible = true;
                this.sp3.visible = true;
            }
            else {
                this.spraying = false;
                this.atom.visible = false;
                this.sp1.visible = false;
                this.sp2.visible = false;
                this.sp3.visible = false;
            }
            if (this.timer % 15 === 0 && this.spraying) {
                this.onKill.dispatch();
            }
            if (this.timer >= 90) {
                TweenUtils.fadeOut(this.atom, 250, 0);
                TweenUtils.fadeOut(this.sp1, 250, 0);
                TweenUtils.fadeOut(this.sp2, 250, 0);
                TweenUtils.fadeOut(this.sp3, 250, 0);
                this.activated = false;
                this.animating = false;
                this.toHoldPosition();
                this.onKill = new Phaser.Signal();
                this.onEnd.dispatch();
            }
        }
        if (this.animating && this.spraying) {
            const addX = Math.round((this.game.input.x - this.container.x) / 3 * this.getMultiplier());
            const addY = Math.round((this.game.input.y - this.container.y) / 3 * this.getMultiplier());
            this.container.x += addX;
            this.container.y += addY;
        }
    }

    public activate() {
        TweenUtils.moveInOut(this.container, this.game.input.x, this.game.input.y, 100, 0, () => {
            this.animating = true;
            if (!this.activated) {
                if (SoundUtils.isSoundEnabled())
                    SoundUtils.playFX('Spray');
                this.putBrushTimer = 0;
                this.timer = 0;
                this.activated = true;
                TweenUtils.fadeIn(this.atom, 250, 200);
                TweenUtils.delayedCall(200, () => {
                    EffectUtils.makeAlphaAnimation(this.sp1, 1, 250, true);
                }, this);
                TweenUtils.delayedCall(400, () => {
                    EffectUtils.makeAlphaAnimation(this.sp2, 1, 250, true);
                }, this);
                TweenUtils.delayedCall(600, () => {
                    EffectUtils.makeAlphaAnimation(this.sp3, 1, 250, true);
                }, this);
            }
        }, this);
    }

    public getSprayCenter(): Phaser.Point {
        return new Phaser.Point(this.container.x - 218 / 3, this.container.y - 142 / 3); // (this.container.x - 218, this.container.y - 142);
    }

    public deactivate() {
        this.animating = false;
    }

    private getMultiplier(): number {
        return this.spiderBited ? 2.5 : 1;
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
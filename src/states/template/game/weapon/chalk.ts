import {GameConfig, LOCALE, MonsterType} from '../../../../config/game.config';
import {ImageUtils} from '../../../../utils/images/image.utils';
import {TweenUtils} from '../../../../utils/tween.utils';
import {Mob} from '../mobs/mob';
import {GuiUtils} from '../../../../utils/gui.utils';
import {SoundUtils} from '../../../../utils/sound/sound.utils';

export class Chalk {

    public onEndDraw: Phaser.Signal = new Phaser.Signal();
    private game: Phaser.Game = null;
    private container: Phaser.Group = null;
    private outerContainer: Phaser.Group = null;
    private base: Phaser.Sprite = null;
    private web: Phaser.Sprite = null;
    private txt: Phaser.Sprite = null;
    private brushes: Phaser.Sprite[] = [];
    private animating: boolean = false;
    public activated: boolean = false;
    private spiderBited: boolean = false;
    private spiderBiteTimer: number = 0;
    private putBrushTimer: number = 0;
    private timer: number = 0;
    private prevPoint: Phaser.Point = null;

    constructor(outerContainer: Phaser.Group) {
        this.game = GameConfig.GAME;
        this.container = this.game.add.group();
        this.outerContainer = outerContainer;
        this.base = this.game.add.sprite(-43, -31,
            ImageUtils.getAtlasClass('AtlasesWeaponChalk').getName(),
            ImageUtils.getAtlasClass('AtlasesWeaponChalk').Frames.Base,
            this.container
        );
        if (GameConfig.LOCALE === LOCALE.RUS) {
            this.txt = this.game.add.sprite(-43, -31,
                ImageUtils.getAtlasClass('AtlasesWeaponChalk').getName(),
                ImageUtils.getAtlasClass('AtlasesWeaponChalk').Frames.Txt,
                this.container
            );
        }
        this.web = this.game.add.sprite(-43, -31,
            ImageUtils.getAtlasClass('AtlasesWeaponChalk').getName(),
            ImageUtils.getAtlasClass('AtlasesWeaponChalk').Frames.Web,
            this.container
        );
        this.web.alpha = 0;
        this.container.position.setTo(540, 960);
    }

    public update() {
        for (let c of this.brushes) {
            let num = parseInt(c.name);
            num++;
            if (num > 300) {
                this.outerContainer.remove(c);
                c.destroy(true);
                c = null;
            }
            else {
                c.name = num.toString();
            }
        }
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
            if (this.timer >= 45) {
                this.activated = false;
                this.animating = false;
                this.toHoldPosition();
                this.onEndDraw.dispatch();
            }
        }
        if (this.animating) {
            const addX = Math.round((this.game.input.x - this.container.x) / 3 * this.getMultiplier());
            const addY = Math.round((this.game.input.y - this.container.y) / 3 * this.getMultiplier());
            this.container.x += addX;
            this.container.y += addY;
            if (this.putBrushTimer > 0) {
                this.putBrushTimer = 0;
                const br = this.game.add.sprite(0, 0,
                    ImageUtils.getAtlasClass('AtlasesWeaponChalk').getName(),
                    ImageUtils.getAtlasClass('AtlasesWeaponChalk').Frames.Brush,
                    this.outerContainer
                );
                GuiUtils.centrize(br);
                // br.angle = this.calcAngle(this.prevPoint, br.position);
                br.position.setTo(this.game.input.x - 10, this.game.input.y - 5);
                br.alpha = this.game.rnd.between(70, 100) / 100;
                br.angle = this.game.rnd.between(-10, 10);
                br.scale.setTo(this.game.rnd.between(50, 65) / 100);
                br.name = '0';
                this.brushes.push(br);
                this.prevPoint = new Phaser.Point(this.game.input.x, this.game.input.y);
            }
        }
    }

    private calcAngle(p1: Phaser.Point, p2: Phaser.Point): number {
        return (Math.atan2(p2.y - p1.y, p2.x - p1.x) * 180 / Math.PI);
    }

    public activate() {
        TweenUtils.moveInOut(this.container, this.game.input.x, this.game.input.y, 100, 0, () => {
            this.animating = true;
            if (!this.activated) {
                if (SoundUtils.isSoundEnabled())
                    SoundUtils.playFX('Chalk');
                this.prevPoint = new Phaser.Point(this.game.input.x, this.game.input.y);
                this.putBrushTimer = 0;
                this.timer = 0;
                this.activated = true;
            }
        }, this);
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
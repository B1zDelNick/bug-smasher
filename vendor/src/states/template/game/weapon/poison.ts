import {GameConfig, LOCALE, MonsterType} from '../../../../config/game.config';
import {ImageUtils} from '../../../../utils/images/image.utils';
import {TweenUtils} from '../../../../utils/tween.utils';
import {Mob} from '../mobs/mob';
import {GuiUtils} from '../../../../utils/gui.utils';

export class Poison {

    public onEndDrop: Phaser.Signal = new Phaser.Signal();
    public onEndPoison: Phaser.Signal = new Phaser.Signal();
    private game: Phaser.Game = null;
    private container: Phaser.Group = null;
    private outerContainer: Phaser.Group = null;
    private base: Phaser.Sprite = null;
    private web: Phaser.Sprite = null;
    private drop1: Phaser.Sprite = null;
    private drop2: Phaser.Sprite = null;
    private drop3: Phaser.Sprite = null;
    private poisonPoint: Phaser.Point = new Phaser.Point();
    private animating: boolean = false;
    private activated: boolean = false;
    private spiderBited: boolean = false;
    private spiderBiteTimer: number = 0;
    private putBrushTimer: number = 0;
    private timer: number = 0;

    constructor(outerContainer: Phaser.Group) {
        this.game = GameConfig.GAME;
        this.container = this.game.add.group();
        this.outerContainer = outerContainer;
        this.base = this.game.add.sprite(-43, -31,
            ImageUtils.getAtlasClass('AtlasesWeaponPoison').getName(),
            ImageUtils.getAtlasClass('AtlasesWeaponPoison').Frames.Base,
            this.container
        );
        GuiUtils.centrize(this.base);
        this.web = this.game.add.sprite(-43, -31,
            ImageUtils.getAtlasClass('AtlasesWeaponPoison').getName(),
            ImageUtils.getAtlasClass('AtlasesWeaponPoison').Frames.Web,
            this.container
        );
        this.web.alpha = 0;
        GuiUtils.centrize(this.web);
        this.drop1 = this.game.add.sprite(-38, 24,
            ImageUtils.getAtlasClass('AtlasesWeaponPoison').getName(),
            ImageUtils.getAtlasClass('AtlasesWeaponPoison').Frames.Drop,
            this.container
        );
        this.drop2 = this.game.add.sprite(5, 24,
            ImageUtils.getAtlasClass('AtlasesWeaponPoison').getName(),
            ImageUtils.getAtlasClass('AtlasesWeaponPoison').Frames.Drop,
            this.container
        );
        this.drop3 = this.game.add.sprite(-22, 24,
            ImageUtils.getAtlasClass('AtlasesWeaponPoison').getName(),
            ImageUtils.getAtlasClass('AtlasesWeaponPoison').Frames.Drop,
            this.container
        );
        
        this.drop1.alpha = 0;
        this.drop2.alpha = 0;
        this.drop3.alpha = 0;
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
        if (this.activated) {
            this.putBrushTimer++;
            this.timer++;
            if (this.timer >= 300) {
                this.activated = false;
                this.animating = false;
                this.onEndPoison.dispatch();
            }
        }
        if (this.animating) {
            /*const addX = Math.round((this.game.input.x - this.container.x) / 5 * this.getMultiplier());
            const addY = Math.round((this.game.input.y - this.container.y) / 5 * this.getMultiplier());
            this.container.x += addX;
            this.container.y += addY;
            if (this.putBrushTimer > 3) {
                this.putBrushTimer = 0;
                const br = this.game.add.sprite(0, 0,
                    ImageUtils.getAtlasClass('AtlasesWeaponChalk').getName(),
                    ImageUtils.getAtlasClass('AtlasesWeaponChalk').Frames.Brush,
                    this.outerContainer
                );
                GuiUtils.centrize(br);
                br.position.setTo(this.game.input.x, this.game.input.y);
                br.alpha = this.game.rnd.between(70, 100) / 100;
                br.angle = this.game.rnd.between(-30, 30);
                br.scale.setTo(this.game.rnd.between(85, 105) / 100);
            }*/
        }
    }

    public activate() {
        this.poisonPoint = new Phaser.Point(this.game.input.x, this.game.input.y);
        this.animating = true;
        TweenUtils.moveInOut(this.container, 440 / 2, 550, 200, 0, () => {
            if (!this.activated) {
                this.drop1.alpha = 0;
                this.drop2.alpha = 0;
                this.drop3.alpha = 0;
                this.drop1.position.setTo(-38, 24);
                this.drop2.position.setTo(-38, 24);
                this.drop3.position.setTo(-38, 24);
                this.putBrushTimer = 0;
                this.timer = 0;
                this.activated = true;
                TweenUtils.rotate(this.base, -10, 250, 0, 0, true);
                TweenUtils.fadeIn(this.drop1, 100, 0, () => {
                    TweenUtils.moveOut(this.drop1, this.drop1.x, this.drop1.y + 250, 500, 0, () => {
                        TweenUtils.fadeOut(this.drop1, 100);
                        this.animating = false;
                        this.activated = false;
                        this.toHoldPosition();
                        this.onEndDrop.dispatch(this.poisonPoint);
                    }, this);
                }, this);
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
}
import {GameConfig, LOCALE, MonsterType} from '../../../../config/game.config';
import {ImageUtils} from '../../../../utils/images/image.utils';
import {TweenUtils} from '../../../../utils/tween.utils';
import {Mob} from '../mobs/mob';
import {GuiUtils} from '../../../../utils/gui.utils';

export class Poison {

    public onEndDrop: Phaser.Signal = new Phaser.Signal();
    private game: Phaser.Game = null;
    private container: Phaser.Group = null;
    private outerContainer: Phaser.Group = null;
    private base: Phaser.Sprite = null;
    private web: Phaser.Sprite = null;
    private animating: boolean = false;
    private activated: boolean = false;
    private spiderBited: boolean = false;
    private spiderBiteTimer: number = 0;
    private timer: number = 0;

    constructor(outerContainer: Phaser.Group) {
        this.game = GameConfig.GAME;
        this.container = this.game.add.group();
        this.outerContainer = outerContainer;
        this.base = this.game.add.sprite(-227, -160,
            ImageUtils.getAtlasClass('AtlasesWeaponPoison').getName(),
            ImageUtils.getAtlasClass('AtlasesWeaponPoison').Frames.Base,
            this.container
        );
        this.web = this.game.add.sprite(-227, -160,
            ImageUtils.getAtlasClass('AtlasesWeaponPoison').getName(),
            ImageUtils.getAtlasClass('AtlasesWeaponPoison').Frames.Web,
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
        if (this.activated) {
            this.timer++;
            if (this.timer >= 90) {
                this.activated = false;
                this.animating = false;
                this.toHoldPosition();
                this.onEndDrop.dispatch();
            }
        }
        if (this.animating) {
            const addX = Math.round((this.game.input.x - this.container.x) / 5 * this.getMultiplier());
            const addY = Math.round((this.game.input.y - this.container.y) / 5 * this.getMultiplier());
            this.container.x += addX;
            this.container.y += addY;
        }
    }

    public activate() {
        TweenUtils.moveInOut(this.container, 320, 300, 200, 0, () => {
            this.animating = true;
            if (!this.activated) {
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
        TweenUtils.moveAndRotate(this.container, 600, 763, 17, 300 * this.getMultiplier());
    }

    public toOutPosition() {
        TweenUtils.moveAndRotate(this.container, 900, 960, 0, 300 * this.getMultiplier());
    }
}
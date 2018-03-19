import {GameConfig} from '../../../config/game.config';
import {ImageUtils} from '../../../utils/images/image.utils';

export class Scroller {

    private game: Phaser.Game = null;
    private container: Phaser.Group = null;
    private bar: Phaser.Sprite = null;
    private thumb: Phaser.Sprite = null;
    private object: Phaser.Group = null;
    private max: number = 0;
    private isDown: boolean = false;
    private clickPoint: Phaser.Point = null;

    constructor(x: number, y: number, object: Phaser.Group, max: number) {
        this.game = GameConfig.GAME;
        this.object = object;
        this.max = max;
        this.container = this.game.add.group();
        this.bar = this.game.add.sprite(0, 0,
            ImageUtils.getAtlasClass('AtlasesScroller').getName(),
            ImageUtils.getAtlasClass('AtlasesScroller').Frames.Bar,
            this.container
        );
        this.thumb = this.game.add.sprite(7, 10, // 325
            ImageUtils.getAtlasClass('AtlasesScroller').getName(),
            ImageUtils.getAtlasClass('AtlasesScroller').Frames.Thumb,
            this.container
        );
        this.thumb.inputEnabled = true;
        this.thumb.events.onInputDown.add(this.down, this);
        this.thumb.events.onInputUp.add(this.up, this);
        this.container.position.setTo(x, y);
    }

    private down(sprite: Phaser.Sprite, pointer: Phaser.Pointer) {
        this.isDown = true;
        this.clickPoint = this.game.input.getLocalPosition(sprite, pointer);
    }

    private up() {
        this.isDown = false;
    }

    public move() {
        if (this.isDown) {
            this.thumb.y = this.game.input.y - this.container.y - this.clickPoint.y;
            if (this.thumb.y < 10) {
                this.thumb.y = 10;
            }
            if (this.thumb.y > 325) {
                this.thumb.y = 325;
            }
            const proc = (this.thumb.y - 10) / (325 - 10);
            const newPos = -(this.max * proc);
            this.object.y = newPos;
        }
    }

    public dispose() {
        this.bar.destroy(true);
        this.thumb.destroy(true);
        this.object.destroy(true);
        this.container.removeAll(true, true, true);
        this.container.destroy(true);
    }
}
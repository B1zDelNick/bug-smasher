import {FoodType} from './food.table';
import {GameConfig} from '../../../../config/game.config';
import {ImageUtils} from '../../../../utils/images/image.utils';
import {GuiUtils} from '../../../../utils/gui.utils';
import {TweenUtils} from '../../../../utils/tween.utils';

export class FoodItem {

    private game: Phaser.Game = null;
    private container: Phaser.Group = null;
    private mainSprite: Phaser.Sprite = null;
    private poisonedSprite: Phaser.Sprite = null;
    private XX: number = 0;
    private YY: number = 0;
    private timeLeft: number = 0;
    private hasPoison: boolean = false;
    
    constructor(parent: Phaser.Group, type: FoodType, x: number, y: number) {
        this.game = GameConfig.GAME;
        this.XX = x;
        this.YY = x;
        this.container = parent;
        this.mainSprite = this.game.add.sprite(0, 0,
            ImageUtils.getAtlasClass('AtlasesFood').getName(),
            ImageUtils.getAtlasClass('AtlasesFood').Frames[type],
            this.container
        );
        GuiUtils.centrize(this.mainSprite);
        this.mainSprite.position.setTo(x, y);
        this.poisonedSprite = this.game.add.sprite(0, 0,
            ImageUtils.getAtlasClass('AtlasesFood').getName(),
            ImageUtils.getAtlasClass('AtlasesFood').Frames[type + 'G'],
            this.container
        );
        GuiUtils.centrize(this.poisonedSprite);
        this.poisonedSprite.position.setTo(x, y);
        this.poisonedSprite.alpha = 0;
    }
    
    public addPoison(point: Phaser.Point): FoodItem {
        this.hasPoison = true;
        this.timeLeft = 360;
        this.XX = this.poisonedSprite.x;
        this.YY = this.poisonedSprite.y;
        TweenUtils.fadeOut(this.mainSprite, 250);
        TweenUtils.fadeIn(this.poisonedSprite, 250, 0, () => {
            TweenUtils.moveInOut(this.poisonedSprite, point.x, point.y, 750);
            // this.timeLeft = 300;
        }, this);
        return this;
    }
    
    public removePoison() {
        this.hasPoison = false;
        TweenUtils.moveInOut(this.poisonedSprite, this.XX, this.YY, 750, 0, () => {
            TweenUtils.fadeOut(this.poisonedSprite, 250);
            TweenUtils.fadeIn(this.mainSprite, 250, 0, () => {}, this);
        }, this);
    }
    
    public update() {
        this.timeLeft--;
        if (0 >= this.timeLeft) {
            this.removePoison();
        }
    }
    
    public isPoisoned(): boolean {
        return this.hasPoison;
    }

    public setPosition(x: number, y: number) {
        this.mainSprite.position.setTo(x, y);
    }

    public dispose() {
        this.mainSprite.destroy(true);
    }
}
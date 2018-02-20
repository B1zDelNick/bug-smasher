import {FoodType} from './food.table';
import {GameConfig} from '../../../../config/game.config';
import {ImageUtils} from '../../../../utils/images/image.utils';
import {GuiUtils} from '../../../../utils/gui.utils';

export class FoodItem {

    private game: Phaser.Game = null;
    private container: Phaser.Group = null;
    private mainSprite: Phaser.Sprite = null;

    constructor(parent: Phaser.Group, type: FoodType, x: number, y: number) {
        this.game = GameConfig.GAME;
        this.container = parent;
        this.mainSprite = this.game.add.sprite(0, 0,
            ImageUtils.getAtlasClass('AtlasesFood').getName(),
            ImageUtils.getAtlasClass('AtlasesFood').Frames[type],
            this.container
        );
        GuiUtils.centrize(this.mainSprite);
        this.mainSprite.position.setTo(x, y);
    }

    public setPosition(x: number, y: number) {
        this.mainSprite.position.setTo(x, y);
    }

    public dispose() {
        this.mainSprite.destroy(true);
    }
}
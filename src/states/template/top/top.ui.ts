import {GameConfig, LOCALE} from '../../../config/game.config';
import {ImageUtils} from '../../../utils/images/image.utils';
import {GuiUtils} from '../../../utils/gui.utils';
import {TweenUtils} from '../../../utils/tween.utils';
import {HandyUtils} from '../../../utils/utility/handy.utils';

export class TopUi {
    private game: Phaser.Game = null;
    private container: Phaser.Group = null;
    private panel: Phaser.Sprite = null;
    private lvl: Phaser.Sprite = null;
    private coin: Phaser.Sprite = null;
    private time: Phaser.Text = null;
    private level: Phaser.Text = null;
    private level2: Phaser.Text = null;
    private score: Phaser.Text = null;
    private points: number = 0;

    constructor() {
        this.game = GameConfig.GAME;
        this.container = this.game.add.group();
        this.panel = this.game.add.sprite(0, 0,
            ImageUtils.getAtlasClass('AtlasesStateLevel').getName(),
            ImageUtils.getAtlasClass('AtlasesStateLevel').Frames.Panel,
            this.container
        );
        this.panel.inputEnabled = true;
        this.lvl = this.game.add.sprite(207, 6,
            ImageUtils.getAtlasClass('AtlasesStateLevel').getName(),
            ImageUtils.getAtlasClass('AtlasesStateLevel').Frames.Lvl,
            this.container
        );
        this.coin = this.game.add.sprite(287, 19,
            ImageUtils.getAtlasClass('AtlasesStateLevel').getName(),
            ImageUtils.getAtlasClass('AtlasesStateLevel').Frames.Coin,
            this.container
        );
        const style = {
            font: 'Calibri',
            align: 'center',
            fill: '#f8ffad',
            fontSize: 42
        };
        const style2 = {
            font: 'Calibri',
            align: 'center',
            fill: '#313900',
            fontSize: 50
        };
        this.time = this.game.add.text(13, 28, '56:25', style, this.container);
        GuiUtils.centrize(this.time);
        this.time.setShadow(3, 3, 'rgba(0,0,0,0.3)', 3);
        this.level = this.game.add.text(137, 28, GameConfig.LOCALE === LOCALE.ENG ? 'LVL:' : ' УР:', style, this.container);
        GuiUtils.centrize(this.level);
        this.level.setShadow(3, 3, 'rgba(0,0,0,0.3)', 3);
        this.level2 = this.game.add.text(227, 23, GameConfig.SELECTED_STAGE.toString(), style2, this.container);
        GuiUtils.centrize(this.level2);
        this.level2.setShadow(3, 3, 'rgba(0,0,0,0.3)', 3);
        this.score = this.game.add.text(336, 28, '0', style, this.container);
        // GuiUtils.centrize(this.score);
        this.score.setShadow(3, 3, 'rgba(0,0,0,0.3)', 3);
        this.container.y = -100;
    }

    public setTime(val: number) {
        this.time.setText(HandyUtils.intToTime(val));
    }

    public addPoints(val: number) {
        this.points += val;
        this.score.setText(this.points.toString());
    }

    public getPoints(): number {
        return this.points;
    }

    public show() {
        TweenUtils.moveIn(this.container, 0, 0, 1000);
    }

    public hide() {
        TweenUtils.moveOut(this.container, 0, -100, 1000);
    }

    public dispose() {
        this.container.removeAll(true, true, true);
        this.container.destroy(true);
    }
}
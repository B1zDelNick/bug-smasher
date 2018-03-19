import {GameConfig} from '../../../config/game.config';
import {ImageUtils} from '../../../utils/images/image.utils';
import {GuiUtils} from '../../../utils/gui.utils';
import {LeaderData} from '../../../data/leader.data';

export class LeaderItem {

    private game: Phaser.Game = null;
    private container: Phaser.Group = null;
    private panel: Phaser.Sprite = null;
    private medal: Phaser.Sprite = null;
    private avaBg: Phaser.Sprite = null;
    private coins: Phaser.Sprite = null;
    private nameTxt: Phaser.Text = null;
    private scoreTxt: Phaser.Text = null;
    private placeTxt: Phaser.Text = null;
    private place: number = 0;

    constructor(parent: Phaser.Group, place: number, x: number, y: number, data: LeaderData) {
        this.place = place;
        this.game = GameConfig.GAME;
        this.container = this.game.add.group(parent);
        this.panel = this.game.add.sprite(0, 0,
            ImageUtils.getAtlasClass('AtlasesStateLeaders').getName(),
            ImageUtils.getAtlasClass('AtlasesStateLeaders').Frames.Panel,
            this.container
        );
        this.medal = this.game.add.sprite(7, 12,
            ImageUtils.getAtlasClass('AtlasesStateLeaders').getName(),
            ImageUtils.getAtlasClass('AtlasesStateLeaders').Frames.First,
            this.container
        );
        if (this.place === 0) {
            this.medal.loadTexture(
                ImageUtils.getAtlasClass('AtlasesStateLeaders').getName(),
                ImageUtils.getAtlasClass('AtlasesStateLeaders').Frames.First
            );
        }
        else if (this.place === 1) {
            this.medal.loadTexture(
                ImageUtils.getAtlasClass('AtlasesStateLeaders').getName(),
                ImageUtils.getAtlasClass('AtlasesStateLeaders').Frames.Second
            );
        }
        else if (this.place === 2) {
            this.medal.loadTexture(
                ImageUtils.getAtlasClass('AtlasesStateLeaders').getName(),
                ImageUtils.getAtlasClass('AtlasesStateLeaders').Frames.Third
            );
        }
        else {
            const style3 = {
                font: 'Arial Black',
                align: 'center',
                fill: '#652d0e',
                fontSize: 50
            };
            this.medal.visible = false;
            this.placeTxt = this.game.add.text(30, 25, (this.place + 1).toString(), style3, this.container);
            this.placeTxt.setShadow(3, 3, 'rgba(0,0,0,0.3)', 3);
        }
        this.avaBg = this.game.add.sprite(96, 5,
            ImageUtils.getAtlasClass('AtlasesStateLeaders').getName(),
            ImageUtils.getAtlasClass('AtlasesStateLeaders').Frames.Ava,
            this.container
        );
        this.coins = this.game.add.sprite(173, 17,
            ImageUtils.getAtlasClass('AtlasesStateLeaders').getName(),
            ImageUtils.getAtlasClass('AtlasesStateLeaders').Frames.Coins,
            this.container
        );
        const style = {
            font: 'Arial Black',
            align: 'center',
            fill: (data.vid === GameConfig.PLAYER_DATA.vid ? '#ff6e14' : '#652d0e'),
            fontSize: 34
        };
        const style2 = {
            font: 'Arial Black',
            align: 'center',
            fill: '#3f322e',
            fontSize: 44
        };
        this.nameTxt = this.game.add.text(192, 3, (data.vid === GameConfig.PLAYER_DATA.vid ? 'Я любимый' : data.name), style, this.container);
        this.nameTxt.setShadow(3, 3, 'rgba(0,0,0,0.3)', 3);
        this.scoreTxt = this.game.add.text(260, 40, data.score.toString(), style2, this.container);
        this.scoreTxt.setShadow(3, 3, 'rgba(0,0,0,0.3)', 3);
        this.container.position.setTo(x, y);
    }

    dispose() {
        this.container.removeAll(true, true, true);
        this.container.destroy(true);
    }
}
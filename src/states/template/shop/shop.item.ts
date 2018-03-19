import {ImageUtils} from '../../../utils/images/image.utils';
import {GameConfig, WeaponType} from '../../../config/game.config';

export class ShopItem {

    private game: Phaser.Game = null;
    private container: Phaser.Group = null;
    private panel: Phaser.Sprite = null;
    private fader: Phaser.Sprite = null;
    private lock: Phaser.Sprite = null;
    private icon: Phaser.Sprite = null;
    private cost: Phaser.Text = null;
    private type: WeaponType = null;
    public onUnblock: Phaser.Signal = new Phaser.Signal();

    constructor(wt: WeaponType, parent: Phaser.Group, masker: Phaser.Graphics, x: number, y: number, frame: string, type: string, unblocked: boolean) {
        this.game = GameConfig.GAME;
        this.type = wt;
        this.container = this.game.add.group();
        this.panel = this.game.add.sprite(0, 0,
            ImageUtils.getAtlasClass('AtlasesShop').getName(),
            ImageUtils.getAtlasClass('AtlasesShop').Frames[frame + 'Panel' + GameConfig.LOCALE],
            this.container
        );
        this.fader = this.game.add.sprite(0, 0,
            ImageUtils.getAtlasClass('AtlasesShop').getName(),
            ImageUtils.getAtlasClass('AtlasesShop').Frames['Dark' + type],
            this.container
        );
        this.lock = this.game.add.sprite(0, 0,
            ImageUtils.getAtlasClass('AtlasesShop').getName(),
            ImageUtils.getAtlasClass('AtlasesShop').Frames.Lock,
            this.container
        );
        this.icon = this.game.add.sprite(0, 0,
            ImageUtils.getAtlasClass('AtlasesShop').getName(),
            ImageUtils.getAtlasClass('AtlasesShop').Frames.CostPanel,
            this.container
        );
        const style = {
            font: 'adigiana',
            align: 'center',
            fill: '#271f1d',
            fontSize: 50
        };
        this.cost = this.game.add.text(13, 66, '100', style, this.container);
        this.cost.setShadow(3, 3, 'rgba(0,0,0,0.3)', 3);
        this.panel.inputEnabled = true;
        this.panel.input.pixelPerfectOver = true;
        this.panel.input.pixelPerfectClick = true;
        this.panel.input.pixelPerfectAlpha = 10;
        this.panel.events.onInputDown.add(() => {
            GameConfig.PLAYER_DATA.addCoins(-100);
            GameConfig.PLAYER_DATA.arsenal[this.type] += 3;
        }, this);
        this.panel.inputEnabled = unblocked;
        this.lock.inputEnabled = true;
        this.lock.events.onInputDown.add(() => {
            this.onUnblock.dispatch(this);
        }, this);
        this.lock.inputEnabled = !unblocked;
        if (wt === WeaponType.FINGER) {
            this.panel.inputEnabled = false;
        }
        if (!unblocked) {
            this.fader.visible = true;
            this.lock.visible = true;
            this.icon.visible = false;
            this.cost.visible = false;
            if (wt === WeaponType.SLIPPER) {
                this.lock.position.setTo(335, 45);
            }
            if (wt === WeaponType.POISON) {
                this.lock.position.setTo(29, 32);
            }
            if (wt === WeaponType.CHALK) {
                this.lock.position.setTo(23, 16);
            }
            if (wt === WeaponType.SPRAY) {
                this.lock.position.setTo(336, 46);
            }
            if (wt === WeaponType.GFINGER) {
                this.lock.position.setTo(29, 32);
            }
        }
        else {
            this.fader.visible = false;
            this.lock.visible = false;
            this.icon.visible = true;
            this.cost.visible = true;
            if (wt === WeaponType.FINGER) {
                this.icon.visible = false;
                this.cost.visible = false;
            }
            if (wt === WeaponType.SLIPPER) {
                this.icon.position.setTo(310, 172);
                this.cost.position.setTo(370, 180);
            }
            if (wt === WeaponType.POISON) {
                this.icon.position.setTo(10, 158);
                this.cost.position.setTo(70, 166);
            }
            if (wt === WeaponType.CHALK) {
                this.icon.position.setTo(12, 115);
                this.cost.position.setTo(72, 125);
            }
            if (wt === WeaponType.SPRAY) {
                this.icon.position.setTo(310, 172);
                this.cost.position.setTo(370, 180);
            }
            if (wt === WeaponType.GFINGER) {
                this.icon.position.setTo(10, 158);
                this.cost.position.setTo(70, 166);
            }
        }
        this.container.position.setTo(x, y);
        this.container.mask = masker;
        parent.add(this.container);
    }

    public unblock() {
        this.fader.visible = false;
        this.lock.visible = false;
        this.icon.visible = true;
        this.cost.visible = true;
        this.panel.inputEnabled = true;
        this.lock.inputEnabled = false;
        if (this.type === WeaponType.FINGER) {
            this.icon.visible = false;
            this.cost.visible = false;
        }
        if (this.type === WeaponType.SLIPPER) {
            this.icon.position.setTo(310, 172);
            this.cost.position.setTo(370, 180);
        }
        if (this.type === WeaponType.POISON) {
            this.icon.position.setTo(10, 158);
            this.cost.position.setTo(70, 166);
        }
        if (this.type === WeaponType.CHALK) {
            this.icon.position.setTo(12, 115);
            this.cost.position.setTo(72, 125);
        }
        if (this.type === WeaponType.SPRAY) {
            this.icon.position.setTo(310, 172);
            this.cost.position.setTo(370, 180);
        }
        if (this.type === WeaponType.GFINGER) {
            this.icon.position.setTo(10, 158);
            this.cost.position.setTo(70, 166);
        }
        GameConfig.PLAYER_DATA.unlockWeapon(this.type);
    }

    dispose() {
        this.panel.destroy(true);
        this.fader.destroy(true);
        this.lock.destroy(true);
        this.icon.destroy(true);
        this.cost.destroy(true);
        this.container.removeAll(true, true, true);
        this.container.destroy(true);
        this.onUnblock.dispose();
    }
}
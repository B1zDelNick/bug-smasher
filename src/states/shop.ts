import * as AssetUtils from '../utils/asset.utils';
import {AssetMode, GadgetMode, GameConfig, WeaponType} from '../config/game.config';
import {TweenUtils} from '../utils/tween.utils';
import {ImageUtils} from '../utils/images/image.utils';
import {InstantGui} from './gui/instant.gui';
import {GuiButtons} from './gui/enum.gui';
import {EffectUtils} from '../utils/effect.utils';
import {GuiUtils} from '../utils/gui.utils';
import {TopUi} from './template/top/top.ui';
import {FoodTable} from './template/game/table/food.table';
import {ViralUtils} from '../utils/viral/viral.utils';
import {InviteWindow} from '../utils/viral/invite.window';
import {UnblockWindow} from '../utils/viral/unblock.window';
import {PauseWindow} from '../utils/viral/pause.window';
import {QuitWindow} from '../utils/viral/quit.window';
import {WeaponWindow} from '../utils/viral/weapon.window';
import {LeaderItem} from './template/leaders/leader.item';
import {LeaderData} from '../data/leader.data';
import {SoundUtils} from '../utils/sound/sound.utils';
import {Scroller} from './template/scroller/scroller';
import {ShopItem} from './template/shop/shop.item';
import {isUndefined} from 'util';
import {BuyCoinsWindow} from '../utils/viral/buycoins.window';

export default class Shop extends Phaser.State {

    private NEXT = 'Level';
    private nextPrepared = false;

    private gui: InstantGui = null;

    private container: Phaser.Group = null;
    private containerItems: Phaser.Group = null;
    private bg: Phaser.Sprite = null;
    private board: Phaser.Sprite = null;
    private masker: Phaser.Graphics = null;
    private masker2: Phaser.Graphics = null;
    private fg: Phaser.Sprite = null;
    private nail1: Phaser.Sprite = null;
    private nail2: Phaser.Sprite = null;
    private coinsBtn: Phaser.Button = null;
    private backBtn: Phaser.Button = null;
    private scroller: Scroller = null;
    private money: Phaser.Text = null;
    private coinsWin: BuyCoinsWindow;
    private unblockWin: UnblockWindow = null;
    private items: ShopItem[];
    private unblock: ShopItem;

    private spinner: Phaser.Sprite = null;
    private blocker: Phaser.Graphics = null;

    public init(...args: any[]): void {
        this.gui = new InstantGui(this);
        this.NEXT = args[0] as string;
        this.items = [];
        this.unblock = null;
        SoundUtils.play('MainTheme');
        GameConfig.PLAYER_DATA.moneyChanged.add(this.moneyCallback, this);
    }

    public preload(): void {
    }

    private moneyCallback(newCoins: number) {
        this.money.setText(newCoins.toString());
    }

    public create(): void {

        this.bg = this.game.add.sprite(0, 0, ImageUtils.getImageClass('ImagesBgShop').getName());

        this.container = this.game.add.group();
        this.board = this.game.add.sprite(0, 244,
            ImageUtils.getAtlasClass('AtlasesShop').getName(),
            ImageUtils.getAtlasClass('AtlasesShop').Frames.Board,
            this.container
        );

        this.containerItems = this.game.add.group();
        this.container.add(this.containerItems);

        this.masker = GuiUtils.makeRectangle(25, 255, 475, 616, 0xcccc00);
        this.masker.alpha = 0;
        this.masker2 = GuiUtils.makeRectangle(0, 245, 540, 636, 0xcccc00);
        this.masker2.alpha = 0;
        this.containerItems.mask = this.masker2;

        const style = {
            font: 'adigiana',
            align: 'center',
            fill: '#f8ffac',
            fontSize: 50
        };
        this.money = this.game.add.text(13, 66, GameConfig.PLAYER_DATA.coins.toString(), style);
        this.money.setShadow(5, 5, 'rgba(0,0,0,0.3)', 3);

        this.fg = this.game.add.sprite(0, 0,
            ImageUtils.getAtlasClass('AtlasesShop').getName(),
            ImageUtils.getAtlasClass('AtlasesShop').Frames.Fg,
            this.container
        );

        this.scroller = new Scroller(492, 287, this.containerItems, 610);

        this.items.push(new ShopItem(WeaponType.FINGER, this.containerItems, this.masker, 31, 264, 'Finger', 'Top', true));
        this.items.push(new ShopItem(WeaponType.SLIPPER, this.containerItems, this.masker, 36, 397, 'Slipper', 'Mid', !isUndefined(GameConfig.PLAYER_DATA.arsenal[WeaponType.SLIPPER])));
        this.items.push(new ShopItem(WeaponType.POISON, this.containerItems, this.masker, 29, 628, 'Poison', 'Bot', !isUndefined(GameConfig.PLAYER_DATA.arsenal[WeaponType.POISON])));
        this.items.push(new ShopItem(WeaponType.CHALK, this.containerItems, this.masker, 31, 873, 'Chalk', 'Top', !isUndefined(GameConfig.PLAYER_DATA.arsenal[WeaponType.CHALK])));
        this.items.push(new ShopItem(WeaponType.SPRAY, this.containerItems, this.masker, 36, 1004, 'Spray', 'Mid', !isUndefined(GameConfig.PLAYER_DATA.arsenal[WeaponType.SPRAY])));
        this.items.push(new ShopItem(WeaponType.GFINGER, this.containerItems, this.masker, 29, 1233, 'Gfinger', 'Bot', !isUndefined(GameConfig.PLAYER_DATA.arsenal[WeaponType.GFINGER])));
        for (let i of this.items) {
            i.onUnblock.add((item: ShopItem) => {
                this.unblock = item;
                this.unblockWin.show();
            }, this);
        }

        this.nail1 = this.game.add.sprite(19, 250,
            ImageUtils.getAtlasClass('AtlasesShop').getName(),
            ImageUtils.getAtlasClass('AtlasesShop').Frames.Nails,
            this.containerItems
        );
        this.nail2 = this.game.add.sprite(0, 244 + 607,
            ImageUtils.getAtlasClass('AtlasesShop').getName(),
            ImageUtils.getAtlasClass('AtlasesShop').Frames.Nails,
            this.containerItems
        );

        this.coinsBtn = GuiUtils.makeButton(this, this.container, 332, 32, 1, '',
            ImageUtils.getAtlasClass('AtlasesShop').getName(),
            ImageUtils.getAtlasClass('AtlasesShop').Frames['GetCoinBtn' + GameConfig.LOCALE],
            true, false, true,
            () => {
                this.coinsWin.show();
            },
            GameConfig.GADGET === GadgetMode.DESKTOP ? GuiUtils.addOverHandler : null,
            GameConfig.GADGET === GadgetMode.DESKTOP ? GuiUtils.addOutHandler : null
        );
        this.backBtn = GuiUtils.makeButton(this, this.container, 202, 822, 1, '',
            ImageUtils.getAtlasClass('AtlasesStateLeaders').getName(),
            ImageUtils.getAtlasClass('AtlasesStateLeaders').Frames.ReturnBtn,
            true, false, true,
            () => {
                if (GameConfig.SELECTED_STAGE === 8 && GameConfig.SELECTED_LVL === 8) {
                    this.NEXT = 'SelectLevel';
                }
                else if (GameConfig.SELECTED_STAGE === 8) {
                    GameConfig.SELECTED_STAGE = 1;
                    GameConfig.SELECTED_LVL++;
                }
                else {
                    GameConfig.SELECTED_STAGE++;
                }
                this.nextState();
            },
            GameConfig.GADGET === GadgetMode.DESKTOP ? GuiUtils.addOverHandler : null,
            GameConfig.GADGET === GadgetMode.DESKTOP ? GuiUtils.addOutHandler : null
        );

        this.coinsWin = ViralUtils.addBuyCoinsWindow();
        this.coinsWin.setListeners(() => {
            GameConfig.PLAYER_DATA.addCoins(500);
        }, this);
        this.unblockWin = ViralUtils.addUnblockWindow();
        this.unblockWin.setListeners(() => {
            if (GameConfig.PLAYER_DATA.coins >= 300) {
                this.unblock.unblock();
                GameConfig.PLAYER_DATA.addCoins(-300);
                if (SoundUtils.isSoundEnabled())
                    SoundUtils.playFX('Unblock');
            } else {
                this.coinsWin.show();
            }
        }, () => {
            if (SoundUtils.isSoundEnabled())
                SoundUtils.playFX('Unblock');
        }, this);

        // Animations goes here
	    this.game.camera.flash(0x000000, 1000);
	    TweenUtils.fadeAndScaleIn(this.backBtn, 750, 1000);

        // Assets Managment starts here
        if (GameConfig.IS_ASSETS_LOADED)
            this.waitForLoading();
        else if (GameConfig.ASSET_MODE === AssetMode.LOAD_BACKGROUND) {
            // Loads
            // PreloaderUtils.preloadComixState();
            AssetUtils.Loader.loadSelectedAssets(this.game, true, this.waitForLoading, this);
        }
    }

    public update(): void {
        super.update(this.game);
        this.scroller.move();
    }

    public shutdown(): void {
        this.game.time.events.removeAll();
        this.game.tweens.removeAll();
        if (this.bg) this.bg.destroy(true);
        if (this.board) this.board.destroy(true);
        if (this.masker) this.masker.destroy(true);
        if (this.masker2) this.masker2.destroy(true);
        if (this.fg) this.fg.destroy(true);
        if (this.nail1) this.nail1.destroy(true);
        if (this.nail2) this.nail2.destroy(true);
        if (this.coinsBtn) this.coinsBtn.destroy(true);
        if (this.backBtn) this.backBtn.destroy(true);
        if (this.scroller) this.scroller.dispose();
        if (this.money) this.money.destroy(true);
        if (this.coinsWin) this.coinsWin.dispose();
        if (this.unblockWin) this.unblockWin.dispose();
        if (this.containerItems) this.containerItems.destroy(true);
        if (this.container) this.container.destroy(true);
        if (this.spinner) this.spinner.destroy(true);
        if (this.blocker) this.blocker.destroy(true);
        GameConfig.PLAYER_DATA.moneyChanged.remove(this.moneyCallback, this);
    }

    private waitForLoading(): void {
        this.nextPrepared = true;
    }

    private nextState(): void {
        this.gui.disable();
        this.blocker = this.game.add.graphics(0, 0);
        this.blocker.beginFill(0);
        this.blocker.drawRect(0, 0, 540, 960);
        this.blocker.inputEnabled = true;
        this.blocker.alpha = 0;
        this.game.camera.onFadeComplete.addOnce(() => {
            this.game.time.events.removeAll();
            this.game.tweens.removeAll();
            this.game.camera.fade(0x000000, 1, true, 0);
            this.blocker.alpha = .85;
            this.reallyGoNextState(true);
        }, this);
        this.game.camera.fade(0x000000, 500, true, .85);
    }

    private reallyGoNextState(addLoader: boolean = false): void {
        if (this.nextPrepared) {
            this.game.state.start(this.NEXT, false, false);
        } else {
            if (addLoader) {
                this.spinner = this.game.add.sprite(
                    this.game.world.centerX,
                    this.game.world.centerY,
                    ImageUtils.getImageClass('ImagesSpin').getName());
                this.spinner.anchor.setTo(.5, .5);
                // this.spinner.scale.setTo(.5);
                TweenUtils.rotate(this.spinner, 360, Phaser.Timer.SECOND * 1, 0, -1);
            }
            this.game.time.events.add(Phaser.Timer.SECOND *  .25, this.reallyGoNextState, this);
        }
    }
}


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
import {isUndefined} from 'util';
import {SoundUtils} from '../utils/sound/sound.utils';

export default class Win extends Phaser.State {

    private NEXT = 'SelectStage';
    private nextPrepared = false;

    private gui: InstantGui = null;

    private container: Phaser.Group = null;
    private bg: Phaser.Sprite = null;
    private bug1: Phaser.Sprite = null;
    private bug2: Phaser.Sprite = null;
    private label: Phaser.Sprite = null;
    private board: Phaser.Sprite = null;
    private paper: Phaser.Sprite = null;
    private scorePanel: Phaser.Sprite = null;
    private scoreLabel: Phaser.Sprite = null;
    private scoreTxt: Phaser.Text = null;
    private share: Phaser.Sprite = null;
    private shareBtn: Phaser.Button = null;
    private playBtn: Phaser.Button = null;
    private st1: Phaser.Sprite = null;
    private st2: Phaser.Sprite = null;
    private st3: Phaser.Sprite = null;
    private st4: Phaser.Sprite = null;
    private st5: Phaser.Sprite = null;

    private weapWin: WeaponWindow = null;

    private spinner: Phaser.Sprite = null;
    private blocker: Phaser.Graphics = null;

    private points: number = 0;

    public init(...args: any[]): void {
        this.gui = new InstantGui(this);
        this.points = args[0] as number;
        GameConfig.PLAYER_DATA.addCoins(this.points);
        SoundUtils.play('MainTheme');
        if (SoundUtils.isSoundEnabled())
            SoundUtils.playFX('Win');
    }

    public preload(): void {
    }

    public create(): void {

        this.bg = this.game.add.sprite(0, 0, ImageUtils.getImageClass('ImagesBgWin').getName());

        this.container = this.game.add.group();
        this.st1 = this.game.add.sprite(403, 148,
            ImageUtils.getAtlasClass('AtlasesStateWin').getName(),
            ImageUtils.getAtlasClass('AtlasesStateWin').Frames.Star1,
            this.container
        );
        this.st2 = this.game.add.sprite(6, 27,
            ImageUtils.getAtlasClass('AtlasesStateWin').getName(),
            ImageUtils.getAtlasClass('AtlasesStateWin').Frames.Star2,
            this.container
        );
        this.st3 = this.game.add.sprite(354, 363,
            ImageUtils.getAtlasClass('AtlasesStateWin').getName(),
            ImageUtils.getAtlasClass('AtlasesStateWin').Frames.Star3,
            this.container
        );
        this.st4 = this.game.add.sprite(259, 157,
            ImageUtils.getAtlasClass('AtlasesStateWin').getName(),
            ImageUtils.getAtlasClass('AtlasesStateWin').Frames.Star4,
            this.container
        );
        this.st5 = this.game.add.sprite(33, 280,
            ImageUtils.getAtlasClass('AtlasesStateWin').getName(),
            ImageUtils.getAtlasClass('AtlasesStateWin').Frames.Star5,
            this.container
        );

        this.bug2 = this.game.add.sprite(72, 143,
            ImageUtils.getAtlasClass('AtlasesStateWin').getName(),
            ImageUtils.getAtlasClass('AtlasesStateWin').Frames.Bug2,
            this.container
        );
        this.bug1 = this.game.add.sprite(209, 274,
            ImageUtils.getAtlasClass('AtlasesStateWin').getName(),
            ImageUtils.getAtlasClass('AtlasesStateWin').Frames.Bug1,
            this.container
        );

        this.label = this.game.add.sprite(132, 15,
            ImageUtils.getAtlasClass('AtlasesStateWin').getName(),
            ImageUtils.getAtlasClass('AtlasesStateWin').Frames['Label' + GameConfig.LOCALE],
            this.container
        );

        this.board = this.game.add.sprite(11, 499,
            ImageUtils.getAtlasClass('AtlasesPopups').getName(),
            ImageUtils.getAtlasClass('AtlasesPopups').Frames.Board,
            this.container
        );
        this.paper = this.game.add.sprite(39, 521,
            ImageUtils.getAtlasClass('AtlasesStateWin').getName(),
            ImageUtils.getAtlasClass('AtlasesStateWin').Frames.Panel,
            this.container
        );
        this.scorePanel = this.game.add.sprite(145, 459,
            ImageUtils.getAtlasClass('AtlasesPopups').getName(),
            ImageUtils.getAtlasClass('AtlasesPopups').Frames.ScorePanel,
            this.container
        );
        this.scoreLabel = this.game.add.sprite(186, 492,
            ImageUtils.getAtlasClass('AtlasesPopups').getName(),
            ImageUtils.getAtlasClass('AtlasesPopups').Frames['Score' + GameConfig.LOCALE],
            this.container
        );
        const style = {
            font: 'Calibri',
            align: 'center',
            fill: '#775A07',
            fontSize: 90
        };
        this.scoreTxt = this.game.add.text(13, 28, this.points.toString(), style);
        this.scoreTxt.setShadow(3, 3, 'rgba(0,0,0,0.3)', 3);
        GuiUtils.centrize(this.scoreTxt);
        this.scoreTxt.position.setTo(270, 610);
        this.scoreTxt.setShadow(3, 3, 'rgba(0,0,0,0.3)', 3);
        this.share = this.game.add.sprite(77, 700,
            ImageUtils.getAtlasClass('AtlasesPopups').getName(),
            ImageUtils.getAtlasClass('AtlasesPopups').Frames['Share' + GameConfig.LOCALE],
            this.container
        );

        this.shareBtn = GuiUtils.makeButton(this, this.container, 323, 672, 1, '',
            ImageUtils.getAtlasClass('AtlasesGui').getName(),
            ImageUtils.getAtlasClass('AtlasesGui').Frames.ShareBtn,
            true, false, true,
            null,
            GameConfig.GADGET === GadgetMode.DESKTOP ? GuiUtils.addOverHandler : null,
            GameConfig.GADGET === GadgetMode.DESKTOP ? GuiUtils.addOutHandler : null
        );
        this.playBtn = GuiUtils.makeButton(this, this.container, 196, 788, 1, '',
            ImageUtils.getAtlasClass('AtlasesGui').getName(),
            ImageUtils.getAtlasClass('AtlasesGui').Frames.YesBtn,
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
        this.playBtn.scale.setTo(0);
        this.playBtn.alpha = 0;

        // GUI Buttons
        this.gui.addGui();
        this.gui.addHomeBtn(() => {
            this.NEXT = 'SelectStage';
            this.nextState();
        });
        this.gui.addShopBtn(() => {
            this.NEXT = 'Shop';
            this.nextState();
        });

        this.weapWin = ViralUtils.addWeaponWindow();
        if (GameConfig.SELECTED_LVL === 1 &&
            GameConfig.SELECTED_STAGE === 8 &&
            isUndefined(GameConfig.PLAYER_DATA.arsenal[WeaponType.SLIPPER])) {
            this.weapWin.setWeapon(WeaponType.SLIPPER);
            TweenUtils.delayedCall(1000, this.weapWin.show, this.weapWin);
            GameConfig.PLAYER_DATA.arsenal[WeaponType.SLIPPER] = 999;
        }
        if (GameConfig.SELECTED_LVL === 2 &&
            GameConfig.SELECTED_STAGE === 8 &&
            isUndefined(GameConfig.PLAYER_DATA.arsenal[WeaponType.CHALK])) {
            this.weapWin.setWeapon(WeaponType.CHALK);
            TweenUtils.delayedCall(1000, this.weapWin.show, this.weapWin);
            GameConfig.PLAYER_DATA.arsenal[WeaponType.CHALK] = 999;
        }
        if (GameConfig.SELECTED_LVL === 3 &&
            GameConfig.SELECTED_STAGE === 8 &&
            isUndefined(GameConfig.PLAYER_DATA.arsenal[WeaponType.POISON])) {
            this.weapWin.setWeapon(WeaponType.POISON);
            TweenUtils.delayedCall(1000, this.weapWin.show, this.weapWin);
            GameConfig.PLAYER_DATA.arsenal[WeaponType.POISON] = 999;
        }
        if (GameConfig.SELECTED_LVL === 4 &&
            GameConfig.SELECTED_STAGE === 8 &&
            isUndefined(GameConfig.PLAYER_DATA.arsenal[WeaponType.GFINGER])) {
            this.weapWin.setWeapon(WeaponType.GFINGER);
            TweenUtils.delayedCall(1000, this.weapWin.show, this.weapWin);
            GameConfig.PLAYER_DATA.arsenal[WeaponType.GFINGER] = 999;
        }
        if (GameConfig.SELECTED_LVL === 5 &&
            GameConfig.SELECTED_STAGE === 8 &&
            isUndefined(GameConfig.PLAYER_DATA.arsenal[WeaponType.SPRAY])) {
            this.weapWin.setWeapon(WeaponType.SPRAY);
            TweenUtils.delayedCall(1000, this.weapWin.show, this.weapWin);
            GameConfig.PLAYER_DATA.arsenal[WeaponType.SPRAY] = 999;
        }

        // Animations goes here
	    this.game.camera.flash(0x000000, 1000);
	    TweenUtils.fadeAndScaleIn(this.playBtn, 750, 1000);

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
    }

    public shutdown(): void {
        this.game.time.events.removeAll();
        this.game.tweens.removeAll();
        if (this.bg) this.bg.destroy(true);
        if (this.bug1) this.bug1.destroy(true);
        if (this.bug2) this.bug2.destroy(true);
        if (this.label) this.label.destroy(true);
        if (this.board) this.board.destroy(true);
        if (this.paper) this.paper.destroy(true);
        if (this.scorePanel) this.scorePanel.destroy(true);
        if (this.scoreLabel) this.scoreLabel.destroy(true);
        if (this.scoreTxt) this.scoreTxt.destroy(true);
        if (this.share) this.share.destroy(true);
        if (this.shareBtn) this.shareBtn.destroy(true);
        if (this.playBtn) this.playBtn.destroy(true);
        if (this.scoreLabel) this.scoreLabel.destroy(true);
        if (this.st1) this.st1.destroy(true);
        if (this.st2) this.st2.destroy(true);
        if (this.st3) this.st3.destroy(true);
        if (this.st4) this.st4.destroy(true);
        if (this.st5) this.st5.destroy(true);
        if (this.weapWin) this.weapWin.dispose();
        if (this.container) this.container.destroy(true);
        if (this.spinner) this.spinner.destroy(true);
        if (this.blocker) this.blocker.destroy(true);
        this.gui.dispose();
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
            if ('Shop' === this.NEXT)
                this.game.state.start(this.NEXT, false, false, 'Win');
            else
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


import * as AssetUtils from '../utils/asset.utils';
import {AssetMode, GameConfig} from '../config/game.config';
import {TweenUtils} from '../utils/tween.utils';
import {ImageUtils} from '../utils/images/image.utils';
import {InstantGui} from './gui/instant.gui';
import {GuiButtons} from './gui/enum.gui';
import {EffectUtils} from '../utils/effect.utils';
import {GuiUtils} from '../utils/gui.utils';
import {UnblockWindow} from '../utils/viral/unblock.window';
import {ViralUtils} from '../utils/viral/viral.utils';
import {SoundUtils} from '../utils/sound/sound.utils';

export default class SelectStage extends Phaser.State {

    private NEXT = 'Level';
    private nextPrepared = false;

    private gui: InstantGui = null;

    private bg: Phaser.Sprite = null;
    private container: Phaser.Group = null;
    private title: Phaser.Sprite = null;
    private ln1: Phaser.Sprite = null;
    private ln2: Phaser.Sprite = null;
    private ln3: Phaser.Sprite = null;
    private ln4: Phaser.Sprite = null;
    private ln5: Phaser.Sprite = null;
    private ln6: Phaser.Sprite = null;
    private ln7: Phaser.Sprite = null;

    private btn1: Phaser.Button = null;
    private btn2: Phaser.Button = null;
    private btn3: Phaser.Button = null;
    private btn4: Phaser.Button = null;
    private btn5: Phaser.Button = null;
    private btn6: Phaser.Button = null;
    private btn7: Phaser.Button = null;
    private btn8: Phaser.Button = null;

    private unlock2: Phaser.Button = null;
    private unlock3: Phaser.Button = null;
    private unlock4: Phaser.Button = null;
    private unlock5: Phaser.Button = null;
    private unlock6: Phaser.Button = null;
    private unlock7: Phaser.Button = null;
    private unlock8: Phaser.Button = null;

    private unblockWin: UnblockWindow = null;

    private spinner: Phaser.Sprite = null;
    private blocker: Phaser.Graphics = null;

    public init(...args: any[]): void {
        this.gui = new InstantGui(this);
        this.NEXT = 'Level';
        SoundUtils.play('MainTheme');
    }

    public preload(): void {
    }

    public create(): void {

        this.bg = this.game.add.sprite(0, 0, ImageUtils.getImageClass('ImagesBack' + GameConfig.SELECTED_LVL).getName());

        this.container = this.game.add.group();

        this.ln1 = this.game.add.sprite(228, 197,
            ImageUtils.getAtlasClass('AtlasesStateSelectStage').getName(),
            ImageUtils.getAtlasClass('AtlasesStateSelectStage').Frames.Line1,
            this.container
        );
        this.ln2 = this.game.add.sprite(173, 260,
            ImageUtils.getAtlasClass('AtlasesStateSelectStage').getName(),
            ImageUtils.getAtlasClass('AtlasesStateSelectStage').Frames.Line2,
            this.container
        );
        this.ln3 = this.game.add.sprite(142, 340,
            ImageUtils.getAtlasClass('AtlasesStateSelectStage').getName(),
            ImageUtils.getAtlasClass('AtlasesStateSelectStage').Frames.Line3,
            this.container
        );
        this.ln4 = this.game.add.sprite(183, 449,
            ImageUtils.getAtlasClass('AtlasesStateSelectStage').getName(),
            ImageUtils.getAtlasClass('AtlasesStateSelectStage').Frames.Line4,
            this.container
        );
        this.ln5 = this.game.add.sprite(189, 542,
            ImageUtils.getAtlasClass('AtlasesStateSelectStage').getName(),
            ImageUtils.getAtlasClass('AtlasesStateSelectStage').Frames.Line5,
            this.container
        );
        this.ln6 = this.game.add.sprite(198, 641,
            ImageUtils.getAtlasClass('AtlasesStateSelectStage').getName(),
            ImageUtils.getAtlasClass('AtlasesStateSelectStage').Frames.Line6,
            this.container
        );
        this.ln7 = this.game.add.sprite(214, 758,
            ImageUtils.getAtlasClass('AtlasesStateSelectStage').getName(),
            ImageUtils.getAtlasClass('AtlasesStateSelectStage').Frames.Line7,
            this.container
        );

        this.unlock2 = GuiUtils.makeButton(this, this.container, 323, 151, 1, 'unlock2',
            ImageUtils.getAtlasClass('AtlasesStateSelectStage').getName(),
            ImageUtils.getAtlasClass('AtlasesStateSelectStage').Frames.Cup2G,
            false, true, true,
            null
        );
        this.unlock3 = GuiUtils.makeButton(this, this.container, 21, 242, 1, 'unlock3',
            ImageUtils.getAtlasClass('AtlasesStateSelectStage').getName(),
            ImageUtils.getAtlasClass('AtlasesStateSelectStage').Frames.Cup3G,
            false, true, true,
            null
        );
        this.unlock4 = GuiUtils.makeButton(this, this.container, 244, 344, 1, 'unlock4',
            ImageUtils.getAtlasClass('AtlasesStateSelectStage').getName(),
            ImageUtils.getAtlasClass('AtlasesStateSelectStage').Frames.Cup4G,
            false, true, true,
            null
        );
        this.unlock5 = GuiUtils.makeButton(this, this.container, 72, 453, 1, 'unlock5',
            ImageUtils.getAtlasClass('AtlasesStateSelectStage').getName(),
            ImageUtils.getAtlasClass('AtlasesStateSelectStage').Frames.Cup5G,
            false, true, true,
            null
        );
        this.unlock6 = GuiUtils.makeButton(this, this.container, 329, 532, 1, 'unlock6',
            ImageUtils.getAtlasClass('AtlasesStateSelectStage').getName(),
            ImageUtils.getAtlasClass('AtlasesStateSelectStage').Frames.Cup6G,
            false, true, true,
            null
        );
        this.unlock7 = GuiUtils.makeButton(this, this.container, 60, 676, 1, 'unlock7',
            ImageUtils.getAtlasClass('AtlasesStateSelectStage').getName(),
            ImageUtils.getAtlasClass('AtlasesStateSelectStage').Frames.Cup7G,
            false, true, true,
            null
        );
        this.unlock8 = GuiUtils.makeButton(this, this.container, 298, 751, 1, 'unlock8',
            ImageUtils.getAtlasClass('AtlasesStateSelectStage').getName(),
            ImageUtils.getAtlasClass('AtlasesStateSelectStage').Frames.Cup8G,
            false, true, true,
            null
        );

        this.btn1 = GuiUtils.makeButton(this, this.container, 102, 96, 1, 'btn1',
            ImageUtils.getAtlasClass('AtlasesStateSelectStage').getName(),
            ImageUtils.getAtlasClass('AtlasesStateSelectStage').Frames.Cup1,
            true, true, true,
            this.preNext
        );
        this.btn2 = GuiUtils.makeButton(this, this.container, 323, 151, 1, 'btn2',
            ImageUtils.getAtlasClass('AtlasesStateSelectStage').getName(),
            ImageUtils.getAtlasClass('AtlasesStateSelectStage').Frames.Cup2,
            GameConfig.PLAYER_DATA.isStageUnlocked(GameConfig.SELECTED_LVL, 2), true, GameConfig.PLAYER_DATA.isStageUnlocked(GameConfig.SELECTED_LVL, 2),
            this.preNext
        );
        this.btn3 = GuiUtils.makeButton(this, this.container, 21, 242, 1, 'btn3',
            ImageUtils.getAtlasClass('AtlasesStateSelectStage').getName(),
            ImageUtils.getAtlasClass('AtlasesStateSelectStage').Frames.Cup3,
            GameConfig.PLAYER_DATA.isStageUnlocked(GameConfig.SELECTED_LVL, 3), true, GameConfig.PLAYER_DATA.isStageUnlocked(GameConfig.SELECTED_LVL, 3),
            this.preNext
        );
        this.btn4 = GuiUtils.makeButton(this, this.container, 244, 344, 1, 'btn4',
            ImageUtils.getAtlasClass('AtlasesStateSelectStage').getName(),
            ImageUtils.getAtlasClass('AtlasesStateSelectStage').Frames.Cup4,
            GameConfig.PLAYER_DATA.isStageUnlocked(GameConfig.SELECTED_LVL, 4), true, GameConfig.PLAYER_DATA.isStageUnlocked(GameConfig.SELECTED_LVL, 4),
            this.preNext
        );
        this.btn5 = GuiUtils.makeButton(this, this.container, 72, 453, 1, 'btn5',
            ImageUtils.getAtlasClass('AtlasesStateSelectStage').getName(),
            ImageUtils.getAtlasClass('AtlasesStateSelectStage').Frames.Cup5,
            GameConfig.PLAYER_DATA.isStageUnlocked(GameConfig.SELECTED_LVL, 5), true, GameConfig.PLAYER_DATA.isStageUnlocked(GameConfig.SELECTED_LVL, 5),
            this.preNext
        );
        this.btn6 = GuiUtils.makeButton(this, this.container, 329, 532, 1, 'btn6',
            ImageUtils.getAtlasClass('AtlasesStateSelectStage').getName(),
            ImageUtils.getAtlasClass('AtlasesStateSelectStage').Frames.Cup6,
            GameConfig.PLAYER_DATA.isStageUnlocked(GameConfig.SELECTED_LVL, 6), true, GameConfig.PLAYER_DATA.isStageUnlocked(GameConfig.SELECTED_LVL, 6),
            this.preNext
        );
        this.btn7 = GuiUtils.makeButton(this, this.container, 60, 676, 1, 'btn7',
            ImageUtils.getAtlasClass('AtlasesStateSelectStage').getName(),
            ImageUtils.getAtlasClass('AtlasesStateSelectStage').Frames.Cup7,
            GameConfig.PLAYER_DATA.isStageUnlocked(GameConfig.SELECTED_LVL, 7), true, GameConfig.PLAYER_DATA.isStageUnlocked(GameConfig.SELECTED_LVL, 7),
            this.preNext
        );
        this.btn8 = GuiUtils.makeButton(this, this.container, 298, 751, 1, 'btn8',
            ImageUtils.getAtlasClass('AtlasesStateSelectStage').getName(),
            ImageUtils.getAtlasClass('AtlasesStateSelectStage').Frames.Cup8,
            GameConfig.PLAYER_DATA.isStageUnlocked(GameConfig.SELECTED_LVL, 8), true, GameConfig.PLAYER_DATA.isStageUnlocked(GameConfig.SELECTED_LVL, 8),
            this.preNext
        );

        this.title = this.game.add.sprite(65, 13,
            ImageUtils.getAtlasClass('AtlasesStateSelectStage').getName(),
            ImageUtils.getAtlasClass('AtlasesStateSelectStage').Frames['LName' + GameConfig.SELECTED_LVL + GameConfig.LOCALE],
            this.container
        );

        this.ln1.visible = GameConfig.PLAYER_DATA.isStageUnlocked(GameConfig.SELECTED_LVL, 2);
        this.ln2.visible = GameConfig.PLAYER_DATA.isStageUnlocked(GameConfig.SELECTED_LVL, 3);
        this.ln3.visible = GameConfig.PLAYER_DATA.isStageUnlocked(GameConfig.SELECTED_LVL, 4);
        this.ln4.visible = GameConfig.PLAYER_DATA.isStageUnlocked(GameConfig.SELECTED_LVL, 5);
        this.ln5.visible = GameConfig.PLAYER_DATA.isStageUnlocked(GameConfig.SELECTED_LVL, 6);
        this.ln6.visible = GameConfig.PLAYER_DATA.isStageUnlocked(GameConfig.SELECTED_LVL, 7);
        this.ln7.visible = GameConfig.PLAYER_DATA.isStageUnlocked(GameConfig.SELECTED_LVL, 8);

        // GUI Buttons
        this.gui.addGui();
        this.gui.addHomeBtn(() => {
            this.NEXT = 'SelectLevel';
            this.nextState();
        });
        this.gui.addLeadersBtn(() => {
            this.NEXT = 'Leaders';
            this.nextState();
        });
        this.gui.addShopBtn(() => {
            this.NEXT = 'Shop';
            this.nextState();
        });

        const playBtn = this.gui.addPlayBtn(GuiButtons.START, this.nextState, 130, 738);
        playBtn.alpha = 0;
        playBtn.scale.setTo(0);

        this.unblockWin = ViralUtils.addUnblockWindow();
        this.unblockWin.setListeners(() => {
            GameConfig.PLAYER_DATA.addCoins(-2500);
        }, () => {
            //
        }, this);

        // Animations goes here
	    this.game.camera.flash(0x000000, 1000);

        // Assets Managment starts here
        if (GameConfig.IS_ASSETS_LOADED)
            this.waitForLoading();
        else if (GameConfig.ASSET_MODE === AssetMode.LOAD_BACKGROUND) {
            // Loads
            // PreloaderUtils.preloadComixState();
            AssetUtils.Loader.loadSelectedAssets(this.game, true, this.waitForLoading, this);
        }
    }

    private preNext(sprite: Phaser.Button) {
        // disable all btns !!
        GameConfig.SELECTED_STAGE = parseInt(sprite.name.substr(3));
        this.nextState();
    }

    public update(): void {
        super.update(this.game);
    }

    public shutdown(): void {
        this.game.time.events.removeAll();
        this.game.tweens.removeAll();
        if (this.bg) this.bg.destroy(true);
        if (this.ln1) this.ln1.destroy(true);
        if (this.ln2) this.ln2.destroy(true);
        if (this.ln3) this.ln3.destroy(true);
        if (this.ln4) this.ln4.destroy(true);
        if (this.ln5) this.ln5.destroy(true);
        if (this.ln6) this.ln6.destroy(true);
        if (this.ln7) this.ln7.destroy(true);
        if (this.btn1) this.btn1.destroy(true);
        if (this.btn2) this.btn2.destroy(true);
        if (this.btn3) this.btn3.destroy(true);
        if (this.btn4) this.btn4.destroy(true);
        if (this.btn5) this.btn5.destroy(true);
        if (this.btn6) this.btn6.destroy(true);
        if (this.btn7) this.btn7.destroy(true);
        if (this.btn8) this.btn8.destroy(true);
        if (this.unlock2) this.unlock2.destroy(true);
        if (this.unlock3) this.unlock3.destroy(true);
        if (this.unlock4) this.unlock4.destroy(true);
        if (this.unlock5) this.unlock5.destroy(true);
        if (this.unlock6) this.unlock6.destroy(true);
        if (this.unlock7) this.unlock7.destroy(true);
        if (this.unlock8) this.unlock8.destroy(true);
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
            if ('Leaders' === this.NEXT)
                this.game.state.start(this.NEXT, false, false, 'SelectStage');
            else if ('Shop' === this.NEXT)
                this.game.state.start(this.NEXT, false, false, 'SelectStage');
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


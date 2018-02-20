import * as AssetUtils from '../utils/asset.utils';
import {AssetMode, GameConfig} from '../config/game.config';
import {TweenUtils} from '../utils/tween.utils';
import {ImageUtils} from '../utils/images/image.utils';
import {InstantGui} from './gui/instant.gui';
import {GuiButtons} from './gui/enum.gui';
import {EffectUtils} from '../utils/effect.utils';
import {GuiUtils} from '../utils/gui.utils';

export default class SelectLevel extends Phaser.State {

    private NEXT = 'Select';
    private nextPrepared = false;

    private gui: InstantGui = null;

    private bg: Phaser.Sprite = null;
    private container: Phaser.Group = null;
    private ln1: Phaser.Sprite = null;
    private ln2: Phaser.Sprite = null;
    private ln3: Phaser.Sprite = null;
    private ln4: Phaser.Sprite = null;
    private ln5: Phaser.Sprite = null;
    private ln6: Phaser.Sprite = null;
    private ln7: Phaser.Sprite = null;
    private ln8: Phaser.Sprite = null;

    private btn1: Phaser.Button = null;
    private btn2: Phaser.Button = null;
    private btn3: Phaser.Button = null;
    private btn4: Phaser.Button = null;
    private btn5: Phaser.Button = null;
    private btn6: Phaser.Button = null;
    private btn7: Phaser.Button = null;
    private btn8: Phaser.Button = null;

    private lock2: Phaser.Button = null;
    private lock3: Phaser.Button = null;
    private lock4: Phaser.Button = null;
    private lock5: Phaser.Button = null;
    private lock6: Phaser.Button = null;
    private lock7: Phaser.Button = null;
    private lock8: Phaser.Button = null;

    private spinner: Phaser.Sprite = null;
    private blocker: Phaser.Graphics = null;

    public init(...args: any[]): void {
        this.gui = new InstantGui(this);
    }

    public preload(): void {
    }

    public create(): void {

        this.bg = this.game.add.sprite(0, 0, ImageUtils.getImageClass('ImagesBgMenu').getName());

        this.container = this.game.add.group();
        this.btn1 = GuiUtils.makeButton(this, this.container, 33, 11, 1, 'btn1',
            ImageUtils.getAtlasClass('AtlasesStateSelectLevel').getName(),
            ImageUtils.getAtlasClass('AtlasesStateSelectLevel').Frames.Level1,
            true, true, true,
            null
        );
        this.btn2 = GuiUtils.makeButton(this, this.container, 231, 1, 1, 'btn2',
            ImageUtils.getAtlasClass('AtlasesStateSelectLevel').getName(),
            ImageUtils.getAtlasClass('AtlasesStateSelectLevel').Frames.Level2,
            true, true, true,
            null
        );
        this.btn3 = GuiUtils.makeButton(this, this.container, 0, 260, 1, 'btn3',
            ImageUtils.getAtlasClass('AtlasesStateSelectLevel').getName(),
            ImageUtils.getAtlasClass('AtlasesStateSelectLevel').Frames.Level3,
            true, true, true,
            null
        );
        this.btn4 = GuiUtils.makeButton(this, this.container, 351, 209, 1, 'btn4',
            ImageUtils.getAtlasClass('AtlasesStateSelectLevel').getName(),
            ImageUtils.getAtlasClass('AtlasesStateSelectLevel').Frames.Level4,
            true, true, true,
            null
        );
        this.btn5 = GuiUtils.makeButton(this, this.container, 103, 467, 1, 'btn5',
            ImageUtils.getAtlasClass('AtlasesStateSelectLevel').getName(),
            ImageUtils.getAtlasClass('AtlasesStateSelectLevel').Frames.Level5,
            true, true, true,
            null
        );
        this.btn6 = GuiUtils.makeButton(this, this.container, 287, 504, 1, 'btn6',
            ImageUtils.getAtlasClass('AtlasesStateSelectLevel').getName(),
            ImageUtils.getAtlasClass('AtlasesStateSelectLevel').Frames.Level6,
            true, true, true,
            null
        );
        this.btn7 = GuiUtils.makeButton(this, this.container, 0, 731, 1, 'btn7',
            ImageUtils.getAtlasClass('AtlasesStateSelectLevel').getName(),
            ImageUtils.getAtlasClass('AtlasesStateSelectLevel').Frames.Level7,
            true, true, true,
            null
        );
        this.btn8 = GuiUtils.makeButton(this, this.container, 366, 759, 1, 'btn8',
            ImageUtils.getAtlasClass('AtlasesStateSelectLevel').getName(),
            ImageUtils.getAtlasClass('AtlasesStateSelectLevel').Frames.Level8,
            true, true, true,
            null
        );

        this.lock2 = GuiUtils.makeButton(this, this.container, 352, 46, 1, 'lock2',
            ImageUtils.getAtlasClass('AtlasesStateSelectLevel').getName(),
            ImageUtils.getAtlasClass('AtlasesStateSelectLevel').Frames.Lock2,
            true, true, true,
            null
        );
        this.lock3 = GuiUtils.makeButton(this, this.container, 118, 305, 1, 'lock3',
            ImageUtils.getAtlasClass('AtlasesStateSelectLevel').getName(),
            ImageUtils.getAtlasClass('AtlasesStateSelectLevel').Frames.Lock3,
            true, true, true,
            null
        );
        this.lock4 = GuiUtils.makeButton(this, this.container, 452, 279, 1, 'lock4',
            ImageUtils.getAtlasClass('AtlasesStateSelectLevel').getName(),
            ImageUtils.getAtlasClass('AtlasesStateSelectLevel').Frames.Lock4,
            true, true, true,
            null
        );
        this.lock5 = GuiUtils.makeButton(this, this.container, 175, 558, 1, 'lock5',
            ImageUtils.getAtlasClass('AtlasesStateSelectLevel').getName(),
            ImageUtils.getAtlasClass('AtlasesStateSelectLevel').Frames.Lock5,
            true, true, true,
            null
        );
        this.lock6 = GuiUtils.makeButton(this, this.container, 402, 558, 1, 'lock6',
            ImageUtils.getAtlasClass('AtlasesStateSelectLevel').getName(),
            ImageUtils.getAtlasClass('AtlasesStateSelectLevel').Frames.Lock6,
            true, true, true,
            null
        );
        this.lock7 = GuiUtils.makeButton(this, this.container, 113, 786, 1, 'lock7',
            ImageUtils.getAtlasClass('AtlasesStateSelectLevel').getName(),
            ImageUtils.getAtlasClass('AtlasesStateSelectLevel').Frames.Lock7,
            true, true, true,
            null
        );
        this.lock8 = GuiUtils.makeButton(this, this.container, 446, 843, 1, 'lock8',
            ImageUtils.getAtlasClass('AtlasesStateSelectLevel').getName(),
            ImageUtils.getAtlasClass('AtlasesStateSelectLevel').Frames.Lock8,
            true, true, true,
            null
        );

	    this.ln1 = this.game.add.sprite(34, 153,
		    ImageUtils.getAtlasClass('AtlasesStateSelectLevel').getName(),
		    ImageUtils.getAtlasClass('AtlasesStateSelectLevel').Frames['LName1' + GameConfig.LOCALE],
            this.container
        );
        this.ln2 = this.game.add.sprite(208, 126,
            ImageUtils.getAtlasClass('AtlasesStateSelectLevel').getName(),
            ImageUtils.getAtlasClass('AtlasesStateSelectLevel').Frames['LName2' + GameConfig.LOCALE],
            this.container
        );
        this.ln3 = this.game.add.sprite(27, 408,
            ImageUtils.getAtlasClass('AtlasesStateSelectLevel').getName(),
            ImageUtils.getAtlasClass('AtlasesStateSelectLevel').Frames['LName3' + GameConfig.LOCALE],
            this.container
        );
        this.ln4 = this.game.add.sprite(305, 390,
            ImageUtils.getAtlasClass('AtlasesStateSelectLevel').getName(),
            ImageUtils.getAtlasClass('AtlasesStateSelectLevel').Frames['LName4' + GameConfig.LOCALE],
            this.container
        );
        this.ln5 = this.game.add.sprite(47, 620,
            ImageUtils.getAtlasClass('AtlasesStateSelectLevel').getName(),
            ImageUtils.getAtlasClass('AtlasesStateSelectLevel').Frames['LName5' + GameConfig.LOCALE],
            this.container
        );
        this.ln6 = this.game.add.sprite(321, 684,
            ImageUtils.getAtlasClass('AtlasesStateSelectLevel').getName(),
            ImageUtils.getAtlasClass('AtlasesStateSelectLevel').Frames['LName6' + GameConfig.LOCALE],
            this.container
        );
        this.ln7 = this.game.add.sprite(50, 687,
            ImageUtils.getAtlasClass('AtlasesStateSelectLevel').getName(),
            ImageUtils.getAtlasClass('AtlasesStateSelectLevel').Frames['LName7' + GameConfig.LOCALE],
            this.container
        );
        this.ln8 = this.game.add.sprite(202, 903,
            ImageUtils.getAtlasClass('AtlasesStateSelectLevel').getName(),
            ImageUtils.getAtlasClass('AtlasesStateSelectLevel').Frames['LName8' + GameConfig.LOCALE],
            this.container
        );

        // GUI Buttons
        this.gui.addGui();
        this.gui.addHomeBtn(null);

        const playBtn = this.gui.addPlayBtn(GuiButtons.START, this.nextState, 130, 738);
        playBtn.alpha = 0;
        playBtn.scale.setTo(0);

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
        if (this.ln8) this.ln8.destroy(true);
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


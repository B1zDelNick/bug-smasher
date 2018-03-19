import * as AssetUtils from '../utils/asset.utils';
import {AssetMode, GameConfig} from '../config/game.config';
import {TweenUtils} from '../utils/tween.utils';
import {ImageUtils} from '../utils/images/image.utils';
import {InstantGui} from './gui/instant.gui';
import {GuiButtons} from './gui/enum.gui';
import {EffectUtils} from '../utils/effect.utils';
import {GuiUtils} from '../utils/gui.utils';

export default class Start extends Phaser.State {

    private NEXT = 'Select';
    private nextPrepared = false;

    private gui: InstantGui = null;

    private bg: Phaser.Sprite = null;
    private bug: Phaser.Sprite = null;
    private title: Phaser.Sprite = null;
    private copyrights: Phaser.Sprite = null;

    private spinner: Phaser.Sprite = null;
    private blocker: Phaser.Graphics = null;

    public init(...args: any[]): void {
        this.gui = new InstantGui(this);
    }

    public preload(): void {
    }

    public create(): void {

        this.bg = this.game.add.sprite(0, 0, ImageUtils.getImageClass('ImagesBgStart').getName());

	    this.bug = this.game.add.sprite(0, 109,
		    ImageUtils.getAtlasClass('AtlasesStateStart').getName(),
		    ImageUtils.getAtlasClass('AtlasesStateStart').Frames.Bug);

        this.title = this.game.add.sprite(0, 25, ImageUtils.getImageClass('ImagesTitle' + GameConfig.LOCALE).getName());

        GuiUtils.centrize(this.title);
        this.title.alpha = 0;
        this.title.scale.setTo(0);

	    this.copyrights = this.game.add.sprite(0, 40 - 500,
		    ImageUtils.getAtlasClass('AtlasesStateStart').getName(),
		    ImageUtils.getAtlasClass('AtlasesStateStart').Frames.Copyrights);

        // GUI Buttons
        this.gui.addGui(false);
        const cop = this.gui.addCopyrightBtn(() => {
        	if (this.copyrights.y < 0) {
        		TweenUtils.rotate(cop, 360 * 3 + 180, 500);
        		TweenUtils.moveIn(this.copyrights, 0, 40, 1000);
	        }
	        else {
		        TweenUtils.rotate(cop, 360 * 3, 500);
        		TweenUtils.moveOut(this.copyrights, 0, 40 - 500, 1000);
	        }
        });
	    cop.alpha = 0;
	    cop.scale.setTo(0);
        const playBtn = this.gui.addPlayBtn(GuiButtons.START, this.nextState, 130, 738);
        playBtn.alpha = 0;
        playBtn.scale.setTo(0);

        // Animations goes here
	    this.game.camera.flash(0x000000, 1000);
	    TweenUtils.fadeAndScale(this.title, 1, 1, Phaser.Timer.SECOND * .5, Phaser.Timer.SECOND * 1, () => {
		    EffectUtils.makeScaleAnimation(this.title, 1.03, Phaser.Timer.SECOND * 1.2);
		    TweenUtils.fadeAndScaleIn(cop, Phaser.Timer.SECOND * .75, Phaser.Timer.SECOND * 1);
		    TweenUtils.fadeAndScaleIn(playBtn, Phaser.Timer.SECOND * .75, Phaser.Timer.SECOND * .5);
	    }, this);

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
        if (this.title) this.title.destroy(true);
        if (this.bug) this.bug.destroy(true);
        if (this.copyrights) this.copyrights.destroy(true);
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


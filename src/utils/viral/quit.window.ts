import {GadgetMode, GameConfig} from '../../config/game.config';
import {ImageUtils} from '../images/image.utils';
import {GuiUtils} from '../gui.utils';
import {TweenUtils} from '../tween.utils';

export class QuitWindow {

	private game: Phaser.Game = null;
	private container: Phaser.Group = null;
	private fader: Phaser.Graphics = null;
	private panel: Phaser.Sprite = null;
	private label: Phaser.Sprite = null;
	private icon: Phaser.Sprite = null;
	private noBtn: Phaser.Button = null;
	private yesBtn: Phaser.Button = null;
	private onQuitHandler: Function = null;
	private onContinueHandler: Function = null;
	private parent: any = null;

	constructor() {
		this.game = GameConfig.GAME;
		this.fader = this.game.add.graphics(0, 0);
		this.fader.beginFill(0x2b2b2b, .75);
		this.fader.drawRect(0, 0, 540, 960);
		this.fader.alpha = 0;
		this.fader.inputEnabled = false;
        this.container = this.game.add.group();
		this.panel = this.game.add.sprite(23, 225,
			ImageUtils.getAtlasClass('AtlasesPopupQuit').getName(),
			ImageUtils.getAtlasClass('AtlasesPopupQuit').Frames.Panel,
			this.container
		);
        this.icon = this.game.add.sprite(67, 369,
            ImageUtils.getAtlasClass('AtlasesPopupQuit').getName(),
            ImageUtils.getAtlasClass('AtlasesPopupQuit').Frames.Icon,
            this.container
        );
		this.label = this.game.add.sprite(47, 245,
			ImageUtils.getAtlasClass('AtlasesPopupQuit').getName(),
			ImageUtils.getAtlasClass('AtlasesPopupQuit').Frames['Label' + GameConfig.LOCALE],
			this.container
		);
		this.yesBtn = GuiUtils.makeButton(this, this.container, 22, 738, 1, '',
			ImageUtils.getAtlasClass('AtlasesGui').getName(),
			ImageUtils.getAtlasClass('AtlasesGui').Frames.YesBtn,
            false, false, true,
			this.onQuit,
			GameConfig.GADGET === GadgetMode.DESKTOP ? GuiUtils.addOverHandler : null,
			GameConfig.GADGET === GadgetMode.DESKTOP ? GuiUtils.addOutHandler : null
		);
		this.noBtn = GuiUtils.makeButton(this, this.container, 366, 737, 1, '',
			ImageUtils.getAtlasClass('AtlasesGui').getName(),
			ImageUtils.getAtlasClass('AtlasesGui').Frames.NoBtn,
            false, false, true,
			this.onContinue,
			GameConfig.GADGET === GadgetMode.DESKTOP ? GuiUtils.addOverHandler : null,
			GameConfig.GADGET === GadgetMode.DESKTOP ? GuiUtils.addOutHandler : null
		);
		this.container.x = -540;
		this.container.y = 0;
	}

	private onQuit() {
        this.hide();
        if (this.onQuitHandler)
            TweenUtils.delayedCall(1000, this.onQuitHandler, this.parent);
	}

    private onContinue() {
        this.hide();
        if (this.onContinueHandler)
            TweenUtils.delayedCall(1000, this.onContinueHandler, this.parent);
    }

	setListeners(quitCallback: Function, continueCallback: Function, context: any) {
		this.onQuitHandler = quitCallback;
		this.onContinueHandler = continueCallback;
		this.parent = context;
	}

	show() {
        this.fader.inputEnabled = true;
	    TweenUtils.fadeIn(this.fader, 500, 0, () => {
            TweenUtils.slideIn(this.container, 0, 1000, 0, () => {
                this.yesBtn.inputEnabled = true;
                this.noBtn.inputEnabled = true;
            }, this);
        }, this);
	}

	hide() {
	    this.yesBtn.inputEnabled = false;
	    this.noBtn.inputEnabled = false;
		TweenUtils.slideOut(this.container, -540, 1000, 0, () => {
		    TweenUtils.fadeOut(this.fader, 500, 0, () => {
                this.fader.inputEnabled = false;
            }, this);
        }, this);
	}

	dispose() {
		if (this.yesBtn) this.yesBtn.destroy(true);
		if (this.noBtn) this.noBtn.destroy(true);
		if (this.label) this.label.destroy(true);
		if (this.icon) this.icon.destroy(true);
		if (this.panel) this.panel.destroy(true);
		if (this.fader) this.fader.destroy(true);
		if (this.container) this.container.destroy(true);
	}
}

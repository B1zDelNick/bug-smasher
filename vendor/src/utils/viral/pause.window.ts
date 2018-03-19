import {GadgetMode, GameConfig} from '../../config/game.config';
import {ImageUtils} from '../images/image.utils';
import {GuiUtils} from '../gui.utils';
import {TweenUtils} from '../tween.utils';

export class PauseWindow {

	private game: Phaser.Game = null;
	private container: Phaser.Group = null;
	private fader: Phaser.Graphics = null;
	private panel: Phaser.Sprite = null;
	private label: Phaser.Sprite = null;
	private icon: Phaser.Sprite = null;
	private continueBtn: Phaser.Button = null;
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
		this.panel = this.game.add.sprite(22, 295,
			ImageUtils.getAtlasClass('AtlasesPopupPause').getName(),
			ImageUtils.getAtlasClass('AtlasesPopupPause').Frames.Panel,
			this.container
		);
        this.icon = this.game.add.sprite(194, 295,
            ImageUtils.getAtlasClass('AtlasesPopupPause').getName(),
            ImageUtils.getAtlasClass('AtlasesPopupPause').Frames.Icon,
            this.container
        );
		this.label = this.game.add.sprite(48, 606,
			ImageUtils.getAtlasClass('AtlasesPopupPause').getName(),
			ImageUtils.getAtlasClass('AtlasesPopupPause').Frames['Label' + GameConfig.LOCALE],
			this.container
		);
		this.continueBtn = GuiUtils.makeButton(this, this.container, 35, 406, 1, '',
			ImageUtils.getAtlasClass('AtlasesGui').getName(),
			ImageUtils.getAtlasClass('AtlasesGui').Frames.PlayBtn,
            false, false, true,
			this.onContinue,
			GameConfig.GADGET === GadgetMode.DESKTOP ? GuiUtils.addOverHandlerMcg : null,
			GameConfig.GADGET === GadgetMode.DESKTOP ? GuiUtils.addOutHandlerMcg : null
		);
		this.container.x = -540;
		this.container.y = 0;
	}

	private onContinue() {
	    this.hide();
	    if (this.onContinueHandler)
		    TweenUtils.delayedCall(1000, this.onContinueHandler, this.parent);
	}

	setListeners(callback: Function, context: any) {
		this.onContinueHandler = callback;
		this.parent = context;
	}

	show() {
        this.fader.inputEnabled = true;
	    TweenUtils.fadeIn(this.fader, 500, 0, () => {
            TweenUtils.slideIn(this.container, 0, 1000, 0, () => {
                this.continueBtn.inputEnabled = true;
            }, this);
        }, this);
	}

	hide() {
	    this.continueBtn.inputEnabled = false;
		TweenUtils.slideOut(this.container, -540, 1000, 0, () => {
		    TweenUtils.fadeOut(this.fader, 500, 0, () => {
                this.fader.inputEnabled = false;
            }, this);
        }, this);
	}

	dispose() {
		if (this.continueBtn) this.continueBtn.destroy(true);
		if (this.label) this.label.destroy(true);
		if (this.icon) this.icon.destroy(true);
		if (this.panel) this.panel.destroy(true);
		if (this.fader) this.fader.destroy(true);
		if (this.container) this.container.destroy(true);
	}
}

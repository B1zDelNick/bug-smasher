import {GadgetMode, GameConfig} from '../../config/game.config';
import {ImageUtils} from '../images/image.utils';
import {GuiUtils} from '../gui.utils';
import {TweenUtils} from '../tween.utils';

export class InviteWindow {

	private game: Phaser.Game = null;
	private container: Phaser.Group = null;
	private fader: Phaser.Graphics = null;
	private panel: Phaser.Sprite = null;
	private label: Phaser.Sprite = null;
	private txt: Phaser.Sprite = null;
	private icon: Phaser.Sprite = null;
	private closeBtn: Phaser.Button = null;
	private inviteBtn: Phaser.Button = null;
	private onInviteHandler: Function = null;
	private parent: any = null;

	constructor() {
		this.game = GameConfig.GAME;
		this.fader = this.game.add.graphics(0, 0);
		this.fader.beginFill(0x2b2b2b, .75);
		this.fader.drawRect(0, 0, 540, 960);
		this.fader.alpha = 0;
		this.fader.inputEnabled = false;
        this.container = this.game.add.group();
		this.panel = this.game.add.sprite(23, 147,
			ImageUtils.getAtlasClass('AtlasesPopupInvite').getName(),
			ImageUtils.getAtlasClass('AtlasesPopupInvite').Frames.Paper,
			this.container
		);
        this.txt = this.game.add.sprite(108, 173,
            ImageUtils.getAtlasClass('AtlasesPopupInvite').getName(),
            ImageUtils.getAtlasClass('AtlasesPopupInvite').Frames['Txt' + GameConfig.LOCALE],
            this.container
        );
        this.icon = this.game.add.sprite(393, 314,
            ImageUtils.getAtlasClass('AtlasesPopupInvite').getName(),
            ImageUtils.getAtlasClass('AtlasesPopupInvite').Frames.Icon,
            this.container
        );
		this.label = this.game.add.sprite(60, 355,
			ImageUtils.getAtlasClass('AtlasesPopupInvite').getName(),
			ImageUtils.getAtlasClass('AtlasesPopupInvite').Frames['Label' + GameConfig.LOCALE],
			this.container
		);
		this.inviteBtn = GuiUtils.makeButton(this, this.container, 170, 451, 1, '',
			ImageUtils.getAtlasClass('AtlasesPopups').getName(),
			ImageUtils.getAtlasClass('AtlasesPopups').Frames.InvBtn,
            false, false, true,
			this.onInvite,
			GameConfig.GADGET === GadgetMode.DESKTOP ? GuiUtils.addOverHandler : null,
			GameConfig.GADGET === GadgetMode.DESKTOP ? GuiUtils.addOutHandler : null
		);
		this.closeBtn = GuiUtils.makeButton(this, this.container, 415, 127, 1, '',
			ImageUtils.getAtlasClass('AtlasesGui').getName(),
			ImageUtils.getAtlasClass('AtlasesGui').Frames.CloseBtn,
            false, false, true,
			this.hide,
			GameConfig.GADGET === GadgetMode.DESKTOP ? GuiUtils.addOverHandler : null,
			GameConfig.GADGET === GadgetMode.DESKTOP ? GuiUtils.addOutHandler : null
		);
		this.container.x = -540;
		this.container.y = 0;
	}

	private onInvite() {
		TweenUtils.delayedCall(500, this.onInviteHandler, this.parent);
	}

	setListeners(inviteCallback: Function, context: any) {
		this.onInviteHandler = inviteCallback;
		this.parent = context;
	}

	show() {
        this.fader.inputEnabled = true;
	    TweenUtils.fadeIn(this.fader, 500, 0, () => {
            TweenUtils.slideIn(this.container, 0, 1000, 0, () => {
                this.inviteBtn.inputEnabled = true;
                this.closeBtn.inputEnabled = true;
            }, this);
        }, this);
	}

	hide() {
	    this.inviteBtn.inputEnabled = false;
	    this.closeBtn.inputEnabled = false;
		TweenUtils.slideOut(this.container, -540, 1000, 0, () => {
		    TweenUtils.fadeOut(this.fader, 500, 0, () => {
                this.fader.inputEnabled = false;
            }, this);
        }, this);
	}

	dispose() {
		if (this.inviteBtn) this.inviteBtn.destroy(true);
		if (this.closeBtn) this.closeBtn.destroy(true);
		if (this.label) this.label.destroy(true);
		if (this.txt) this.txt.destroy(true);
		if (this.icon) this.icon.destroy(true);
		if (this.panel) this.panel.destroy(true);
		if (this.fader) this.fader.destroy(true);
        this.container.removeAll(true, true, true);
        this.container.destroy(true);
	}
}

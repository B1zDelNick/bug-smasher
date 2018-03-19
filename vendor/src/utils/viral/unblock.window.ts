import {GadgetMode, GameConfig} from '../../config/game.config';
import {ImageUtils} from '../images/image.utils';
import {GuiUtils} from '../gui.utils';
import {TweenUtils} from '../tween.utils';

export class UnblockWindow {

	private game: Phaser.Game = null;
	private container: Phaser.Group = null;
	private fader: Phaser.Graphics = null;
	private panel: Phaser.Sprite = null;
	private label: Phaser.Sprite = null;
	private txt1: Phaser.Sprite = null;
	private txt2: Phaser.Sprite = null;
	private closeBtn: Phaser.Button = null;
	private inviteBtn: Phaser.Button = null;
	private buyBtn: Phaser.Button = null;
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
			ImageUtils.getAtlasClass('AtlasesPopupUnblock').getName(),
			ImageUtils.getAtlasClass('AtlasesPopupUnblock').Frames.Paper,
			this.container
		);
        this.txt1 = this.game.add.sprite(52, 382,
            ImageUtils.getAtlasClass('AtlasesPopupUnblock').getName(),
            ImageUtils.getAtlasClass('AtlasesPopupUnblock').Frames['Money' + GameConfig.LOCALE],
            this.container
        );
        this.txt2 = this.game.add.sprite(275, 396,
            ImageUtils.getAtlasClass('AtlasesPopupUnblock').getName(),
            ImageUtils.getAtlasClass('AtlasesPopupUnblock').Frames['Invite' + GameConfig.LOCALE],
            this.container
        );
		this.label = this.game.add.sprite(33, 177,
			ImageUtils.getAtlasClass('AtlasesPopupUnblock').getName(),
			ImageUtils.getAtlasClass('AtlasesPopupUnblock').Frames['Label' + GameConfig.LOCALE],
			this.container
		);
		this.inviteBtn = GuiUtils.makeButton(this, this.container, 289, 493, 1, '',
			ImageUtils.getAtlasClass('AtlasesPopups').getName(),
			ImageUtils.getAtlasClass('AtlasesPopups').Frames.InvBtn,
            false, false, true,
			this.onInvite,
			GameConfig.GADGET === GadgetMode.DESKTOP ? GuiUtils.addOverHandler : null,
			GameConfig.GADGET === GadgetMode.DESKTOP ? GuiUtils.addOutHandler : null
		);
        this.buyBtn = GuiUtils.makeButton(this, this.container, 57, 499, 1, '',
            ImageUtils.getAtlasClass('AtlasesPopups').getName(),
            ImageUtils.getAtlasClass('AtlasesPopups').Frames.CoinBtn,
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
                this.buyBtn.inputEnabled = true;
                this.closeBtn.inputEnabled = true;
            }, this);
        }, this);
	}

	hide() {
	    this.inviteBtn.inputEnabled = false;
	    this.buyBtn.inputEnabled = false;
	    this.closeBtn.inputEnabled = false;
		TweenUtils.slideOut(this.container, -540, 1000, 0, () => {
		    TweenUtils.fadeOut(this.fader, 500, 0, () => {
                this.fader.inputEnabled = false;
            }, this);
        }, this);
	}

	dispose() {
		if (this.buyBtn) this.buyBtn.destroy(true);
		if (this.inviteBtn) this.inviteBtn.destroy(true);
		if (this.closeBtn) this.closeBtn.destroy(true);
		if (this.label) this.label.destroy(true);
		if (this.txt1) this.txt1.destroy(true);
		if (this.txt2) this.txt2.destroy(true);
		if (this.panel) this.panel.destroy(true);
		if (this.fader) this.fader.destroy(true);
		if (this.container) this.container.destroy(true);
	}
}

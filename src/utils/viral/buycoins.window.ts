import {GadgetMode, GameConfig} from '../../config/game.config';
import {ImageUtils} from '../images/image.utils';
import {GuiUtils} from '../gui.utils';
import {TweenUtils} from '../tween.utils';

export class BuyCoinsWindow {

	private game: Phaser.Game = null;
	private container: Phaser.Group = null;
	private fader: Phaser.Graphics = null;
	private panel: Phaser.Sprite = null;
	private icon1: Phaser.Sprite = null;
	private icon2: Phaser.Sprite = null;
	private icon3: Phaser.Sprite = null;
	private icon4: Phaser.Sprite = null;
	private icon5: Phaser.Sprite = null;
	private icon6: Phaser.Sprite = null;
	private closeBtn: Phaser.Button = null;
	private inviteBtn: Phaser.Button = null;
	private buyBtn1: Phaser.Button = null;
	private buyBtn2: Phaser.Button = null;
	private buyBtn3: Phaser.Button = null;
	private buyBtn4: Phaser.Button = null;
	private buyBtn5: Phaser.Button = null;
    private cost1: Phaser.Text = null;
    private cost2: Phaser.Text = null;
    private cost3: Phaser.Text = null;
    private cost4: Phaser.Text = null;
    private cost5: Phaser.Text = null;
    private cost6: Phaser.Text = null;
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
		this.panel = this.game.add.sprite(17, 102,
			ImageUtils.getAtlasClass('AtlasesBuyCoins').getName(),
			ImageUtils.getAtlasClass('AtlasesBuyCoins').Frames.Paper,
			this.container
		);
        this.icon1 = this.game.add.sprite(74, 193,
            ImageUtils.getAtlasClass('AtlasesBuyCoins').getName(),
            ImageUtils.getAtlasClass('AtlasesBuyCoins').Frames.Icon1,
            this.container
        );
        this.icon2 = this.game.add.sprite(70, 287,
            ImageUtils.getAtlasClass('AtlasesBuyCoins').getName(),
            ImageUtils.getAtlasClass('AtlasesBuyCoins').Frames.Icon2,
            this.container
        );
        this.icon3 = this.game.add.sprite(61, 371,
            ImageUtils.getAtlasClass('AtlasesBuyCoins').getName(),
            ImageUtils.getAtlasClass('AtlasesBuyCoins').Frames.Icon3,
            this.container
        );
        this.icon4 = this.game.add.sprite(69, 461,
            ImageUtils.getAtlasClass('AtlasesBuyCoins').getName(),
            ImageUtils.getAtlasClass('AtlasesBuyCoins').Frames.Icon4,
            this.container
        );
        this.icon5 = this.game.add.sprite(57, 554,
            ImageUtils.getAtlasClass('AtlasesBuyCoins').getName(),
            ImageUtils.getAtlasClass('AtlasesBuyCoins').Frames.Icon5,
            this.container
        );
        this.icon6 = this.game.add.sprite(11, 623,
            ImageUtils.getAtlasClass('AtlasesBuyCoins').getName(),
            ImageUtils.getAtlasClass('AtlasesBuyCoins').Frames.Icon6,
            this.container
        );
        const style = {
            font: 'adigiana',
            align: 'center',
            fill: '#6B2911',
            fontSize: 65
        };
        this.cost1 = this.game.add.text(193, 192, '500', style, this.container);
        this.cost1.setShadow(5, 5, 'rgba(0,0,0,0.3)', 5);
        this.cost2 = this.game.add.text(193, 192 + 96, '1000', style, this.container);
        this.cost2.setShadow(5, 5, 'rgba(0,0,0,0.3)', 5);
        this.cost3 = this.game.add.text(193, 192 + 96 * 2, '2000', style, this.container);
        this.cost3.setShadow(5, 5, 'rgba(0,0,0,0.3)', 5);
        this.cost4 = this.game.add.text(193, 192 + 96 * 3, '3000', style, this.container);
        this.cost4.setShadow(5, 5, 'rgba(0,0,0,0.3)', 5);
        this.cost5 = this.game.add.text(193, 192 + 96 * 4, '5000', style, this.container);
        this.cost5.setShadow(5, 5, 'rgba(0,0,0,0.3)', 5);
        this.cost6 = this.game.add.text(193, 192 + 96 * 5, '10000', style, this.container);
        this.cost6.setShadow(5, 5, 'rgba(0,0,0,0.3)', 5);
		this.inviteBtn = GuiUtils.makeButton(this, this.container, 367, 179, 1, '',
			ImageUtils.getAtlasClass('AtlasesBuyCoins').getName(),
			ImageUtils.getAtlasClass('AtlasesBuyCoins').Frames.InvBtn,
            false, false, true,
			this.onInvite,
			GameConfig.GADGET === GadgetMode.DESKTOP ? GuiUtils.addOverHandler : null,
			GameConfig.GADGET === GadgetMode.DESKTOP ? GuiUtils.addOutHandler : null
		);
        this.buyBtn1 = GuiUtils.makeButton(this, this.container, 364, 279, 1, '',
            ImageUtils.getAtlasClass('AtlasesBuyCoins').getName(),
            ImageUtils.getAtlasClass('AtlasesBuyCoins').Frames.Btn1,
            false, false, true,
            this.btnHandler,
            GameConfig.GADGET === GadgetMode.DESKTOP ? GuiUtils.addOverHandler : null,
            GameConfig.GADGET === GadgetMode.DESKTOP ? GuiUtils.addOutHandler : null
        );
        this.buyBtn2 = GuiUtils.makeButton(this, this.container, 364, 372, 1, '',
            ImageUtils.getAtlasClass('AtlasesBuyCoins').getName(),
            ImageUtils.getAtlasClass('AtlasesBuyCoins').Frames.Btn2,
            false, false, true,
            this.btnHandler,
            GameConfig.GADGET === GadgetMode.DESKTOP ? GuiUtils.addOverHandler : null,
            GameConfig.GADGET === GadgetMode.DESKTOP ? GuiUtils.addOutHandler : null
        );
        this.buyBtn3 = GuiUtils.makeButton(this, this.container, 364, 466, 1, '',
            ImageUtils.getAtlasClass('AtlasesBuyCoins').getName(),
            ImageUtils.getAtlasClass('AtlasesBuyCoins').Frames.Btn3,
            false, false, true,
            this.btnHandler,
            GameConfig.GADGET === GadgetMode.DESKTOP ? GuiUtils.addOverHandler : null,
            GameConfig.GADGET === GadgetMode.DESKTOP ? GuiUtils.addOutHandler : null
        );
        this.buyBtn4 = GuiUtils.makeButton(this, this.container, 364, 562, 1, '',
            ImageUtils.getAtlasClass('AtlasesBuyCoins').getName(),
            ImageUtils.getAtlasClass('AtlasesBuyCoins').Frames.Btn4,
            false, false, true,
            this.btnHandler,
            GameConfig.GADGET === GadgetMode.DESKTOP ? GuiUtils.addOverHandler : null,
            GameConfig.GADGET === GadgetMode.DESKTOP ? GuiUtils.addOutHandler : null
        );
        this.buyBtn5 = GuiUtils.makeButton(this, this.container, 364, 664, 1, '',
            ImageUtils.getAtlasClass('AtlasesBuyCoins').getName(),
            ImageUtils.getAtlasClass('AtlasesBuyCoins').Frames.Btn5,
            false, false, true,
            this.btnHandler,
            GameConfig.GADGET === GadgetMode.DESKTOP ? GuiUtils.addOverHandler : null,
            GameConfig.GADGET === GadgetMode.DESKTOP ? GuiUtils.addOutHandler : null
        );
		this.closeBtn = GuiUtils.makeButton(this, this.container, 407, 51, 1, '',
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

	private btnHandler(sprite: Phaser.Button) {
	    this.hide();
	    if (sprite === this.buyBtn1) {
	        GameConfig.PLAYER_DATA.addCoins(1000);
        }
        else if (sprite === this.buyBtn2) {
            GameConfig.PLAYER_DATA.addCoins(2000);
        }
        else if (sprite === this.buyBtn3) {
            GameConfig.PLAYER_DATA.addCoins(3000);
        }
        else if (sprite === this.buyBtn4) {
            GameConfig.PLAYER_DATA.addCoins(5000);
        }
        else if (sprite === this.buyBtn5) {
            GameConfig.PLAYER_DATA.addCoins(10000);
        }
    }

	private onInvite() {
	    this.hide();
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
                this.buyBtn1.inputEnabled = true;
                this.buyBtn2.inputEnabled = true;
                this.buyBtn3.inputEnabled = true;
                this.buyBtn4.inputEnabled = true;
                this.buyBtn5.inputEnabled = true;
                this.closeBtn.inputEnabled = true;
            }, this);
        }, this);
	}

	hide() {
	    this.inviteBtn.inputEnabled = false;
	    this.closeBtn.inputEnabled = false;
	    this.buyBtn1.inputEnabled = false;
	    this.buyBtn2.inputEnabled = false;
	    this.buyBtn3.inputEnabled = false;
	    this.buyBtn4.inputEnabled = false;
	    this.buyBtn5.inputEnabled = false;
		TweenUtils.slideOut(this.container, -540, 1000, 0, () => {
		    TweenUtils.fadeOut(this.fader, 500, 0, () => {
                this.fader.inputEnabled = false;
            }, this);
        }, this);
	}

	dispose() {
		if (this.inviteBtn) this.inviteBtn.destroy(true);
		if (this.closeBtn) this.closeBtn.destroy(true);
		if (this.buyBtn1) this.buyBtn1.destroy(true);
		if (this.buyBtn2) this.buyBtn2.destroy(true);
		if (this.buyBtn3) this.buyBtn3.destroy(true);
		if (this.buyBtn4) this.buyBtn4.destroy(true);
		if (this.buyBtn5) this.buyBtn5.destroy(true);
		if (this.cost1) this.cost1.destroy(true);
		if (this.cost2) this.cost2.destroy(true);
		if (this.cost3) this.cost3.destroy(true);
		if (this.cost4) this.cost4.destroy(true);
		if (this.cost5) this.cost5.destroy(true);
		if (this.cost6) this.cost6.destroy(true);
		if (this.panel) this.panel.destroy(true);
		if (this.fader) this.fader.destroy(true);
		if (this.icon1) this.icon1.destroy(true);
		if (this.icon2) this.icon2.destroy(true);
		if (this.icon3) this.icon3.destroy(true);
		if (this.icon4) this.icon4.destroy(true);
		if (this.icon5) this.icon5.destroy(true);
		if (this.icon6) this.icon6.destroy(true);
        this.container.removeAll(true, true, true);
        this.container.destroy(true);
		if (this.onInviteHandler) this.onInviteHandler = null;
	}
}

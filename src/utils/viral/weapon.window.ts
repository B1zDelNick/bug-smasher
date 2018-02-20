import {GadgetMode, GameConfig, WeaponType} from '../../config/game.config';
import {ImageUtils} from '../images/image.utils';
import {GuiUtils} from '../gui.utils';
import {TweenUtils} from '../tween.utils';

export class WeaponWindow {

	private game: Phaser.Game = null;
	private container: Phaser.Group = null;
	private fader: Phaser.Graphics = null;
	private panel: Phaser.Sprite = null;
	private label: Phaser.Sprite = null;
	private txt: Phaser.Sprite = null;
	private icon1: Phaser.Sprite = null;
	private icon2: Phaser.Sprite = null;
	private icon3: Phaser.Sprite = null;
	private weapon: Phaser.Sprite = null;
	private closeBtn: Phaser.Button = null;
	private parent: any = null;

	constructor() {
		this.game = GameConfig.GAME;
		this.fader = this.game.add.graphics(0, 0);
		this.fader.beginFill(0x2b2b2b, .75);
		this.fader.drawRect(0, 0, 540, 960);
		this.fader.alpha = 0;
		this.fader.inputEnabled = false;
        this.container = this.game.add.group();
		this.panel = this.game.add.sprite(18, 143,
			ImageUtils.getAtlasClass('AtlasesPopupWeapon').getName(),
			ImageUtils.getAtlasClass('AtlasesPopupWeapon').Frames.Panel,
			this.container
		);
        this.txt = this.game.add.sprite(52, 736,
            ImageUtils.getAtlasClass('AtlasesPopupWeapon').getName(),
            ImageUtils.getAtlasClass('AtlasesPopupWeapon').Frames[WeaponType.SLIPPER + 'Name' + GameConfig.LOCALE],
            this.container
        );
        this.icon1 = this.game.add.sprite(31, 303,
            ImageUtils.getAtlasClass('AtlasesPopupWeapon').getName(),
            ImageUtils.getAtlasClass('AtlasesPopupWeapon').Frames.Boom1,
            this.container
        );
        this.icon2 = this.game.add.sprite(31, 303,
            ImageUtils.getAtlasClass('AtlasesPopupWeapon').getName(),
            ImageUtils.getAtlasClass('AtlasesPopupWeapon').Frames.Boom2,
            this.container
        );
        this.icon3 = this.game.add.sprite(52, 431,
            ImageUtils.getAtlasClass('AtlasesPopupWeapon').getName(),
            ImageUtils.getAtlasClass('AtlasesPopupWeapon').Frames.Bug,
            this.container
        );
        this.weapon = this.game.add.sprite(52, 391,
            ImageUtils.getAtlasClass('AtlasesPopupWeapon').getName(),
            ImageUtils.getAtlasClass('AtlasesPopupWeapon').Frames[WeaponType.SLIPPER + GameConfig.LOCALE],
            this.container
        );
        GuiUtils.centrize(this.weapon);
        this.weapon.position.setTo(395, 564);
		this.label = this.game.add.sprite(91, 162,
			ImageUtils.getAtlasClass('AtlasesPopupWeapon').getName(),
			ImageUtils.getAtlasClass('AtlasesPopupWeapon').Frames['Label' + GameConfig.LOCALE],
			this.container
		);
		this.closeBtn = GuiUtils.makeButton(this, this.container, 415, 77, 1, '',
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

	setWeapon(type: WeaponType) {
		switch (type) {
            case WeaponType.FINGER: {
                this.txt.loadTexture(
                    ImageUtils.getAtlasClass('AtlasesPopupWeapon').getName(),
                    ImageUtils.getAtlasClass('AtlasesPopupWeapon').Frames[WeaponType.FINGER + 'Name' + GameConfig.LOCALE]);
                this.weapon.loadTexture(
                    ImageUtils.getAtlasClass('AtlasesPopupWeapon').getName(),
                    ImageUtils.getAtlasClass('AtlasesPopupWeapon').Frames[WeaponType.FINGER]);
                break;
            }
            case WeaponType.SLIPPER: {
                this.txt.loadTexture(
                    ImageUtils.getAtlasClass('AtlasesPopupWeapon').getName(),
                    ImageUtils.getAtlasClass('AtlasesPopupWeapon').Frames[WeaponType.SLIPPER + 'Name' + GameConfig.LOCALE]);
                this.weapon.loadTexture(
                    ImageUtils.getAtlasClass('AtlasesPopupWeapon').getName(),
                    ImageUtils.getAtlasClass('AtlasesPopupWeapon').Frames[WeaponType.SLIPPER + GameConfig.LOCALE]);
                break;
            }
            case WeaponType.CHALK: {
                this.txt.loadTexture(
                    ImageUtils.getAtlasClass('AtlasesPopupWeapon').getName(),
                    ImageUtils.getAtlasClass('AtlasesPopupWeapon').Frames[WeaponType.CHALK + 'Name' + GameConfig.LOCALE]);
                this.weapon.loadTexture(
                    ImageUtils.getAtlasClass('AtlasesPopupWeapon').getName(),
                    ImageUtils.getAtlasClass('AtlasesPopupWeapon').Frames[WeaponType.CHALK + GameConfig.LOCALE]);
                break;
            }
            case WeaponType.POISON: {
                this.txt.loadTexture(
                    ImageUtils.getAtlasClass('AtlasesPopupWeapon').getName(),
                    ImageUtils.getAtlasClass('AtlasesPopupWeapon').Frames[WeaponType.POISON + 'Name' + GameConfig.LOCALE]);
                this.weapon.loadTexture(
                    ImageUtils.getAtlasClass('AtlasesPopupWeapon').getName(),
                    ImageUtils.getAtlasClass('AtlasesPopupWeapon').Frames[WeaponType.POISON]);
                break;
            }
            case WeaponType.GFINGER: {
                this.txt.loadTexture(
                    ImageUtils.getAtlasClass('AtlasesPopupWeapon').getName(),
                    ImageUtils.getAtlasClass('AtlasesPopupWeapon').Frames[WeaponType.GFINGER + 'Name' + GameConfig.LOCALE]);
                this.weapon.loadTexture(
                    ImageUtils.getAtlasClass('AtlasesPopupWeapon').getName(),
                    ImageUtils.getAtlasClass('AtlasesPopupWeapon').Frames[WeaponType.GFINGER]);
                break;
            }
            case WeaponType.SPRAY: {
                this.txt.loadTexture(
                    ImageUtils.getAtlasClass('AtlasesPopupWeapon').getName(),
                    ImageUtils.getAtlasClass('AtlasesPopupWeapon').Frames[WeaponType.SPRAY + 'Name' + GameConfig.LOCALE]);
                this.weapon.loadTexture(
                    ImageUtils.getAtlasClass('AtlasesPopupWeapon').getName(),
                    ImageUtils.getAtlasClass('AtlasesPopupWeapon').Frames[WeaponType.SPRAY]);
                break;
            }
        }
	}

	show() {
        this.fader.inputEnabled = true;
	    TweenUtils.fadeIn(this.fader, 500, 0, () => {
            TweenUtils.slideIn(this.container, 0, 1000, 0, () => {
                this.closeBtn.inputEnabled = true;
            }, this);
        }, this);
	}

	hide() {
	    this.closeBtn.inputEnabled = false;
		TweenUtils.slideOut(this.container, -540, 1000, 0, () => {
		    TweenUtils.fadeOut(this.fader, 500, 0, () => {
                this.fader.inputEnabled = false;
            }, this);
        }, this);
	}

	dispose() {
		if (this.closeBtn) this.closeBtn.destroy(true);
		if (this.label) this.label.destroy(true);
		if (this.txt) this.txt.destroy(true);
		if (this.icon1) this.icon1.destroy(true);
		if (this.icon2) this.icon2.destroy(true);
		if (this.icon3) this.icon3.destroy(true);
		if (this.weapon) this.weapon.destroy(true);
		if (this.panel) this.panel.destroy(true);
		if (this.fader) this.fader.destroy(true);
		if (this.container) this.container.destroy(true);
	}
}

import {GadgetMode, GameConfig} from '../../config/game.config';
import {GuiUtils} from '../../utils/gui.utils';

import {isNull, isString} from 'util';
import {ImageUtils} from '../../utils/images/image.utils';
import {SoundUtils} from '../../utils/sound/sound.utils';
import {TweenUtils} from '../../utils/tween.utils';
import {GuiButtons} from './enum.gui';

export class InstantGui {

    private game: Phaser.Game;
    private state: Phaser.State;

    private guiContainer: Phaser.Group = null;
    private playButton: Phaser.Button = null;
    private gearButton: Phaser.Button = null;
    private copyButton: Phaser.Button = null;
    /*private musonButton: Phaser.Button = null;
    private musoffButton: Phaser.Button = null;
    private sndonButton: Phaser.Button = null;
    private sndoffButton: Phaser.Button = null;
    private logoButton: Phaser.Button = null;
    private photoButton: Phaser.Button = null;
    private homeButton: Phaser.Button = null;
    private moreButton: Phaser.Button = null;
    private moreButton2: Phaser.Sprite = null;
    private copyButton: Phaser.Button = null;
    private hintButton: Phaser.Button = null;*/
    private gearButtons: Phaser.Button[] = [];
    private sndonButton: Phaser.Button = null;
    private sndoffButton: Phaser.Button = null;
    private musonButton: Phaser.Button = null;
    private musoffButton: Phaser.Button = null;

    private extras: Array<Phaser.Button> = [];
    private extras2: Array<Phaser.Sprite> = [];
    private settings: Array<Phaser.Button> = [];
    private gearOpened: boolean = false;

    constructor(state: Phaser.State) {
        this.game = GameConfig.GAME;
        this.state = state;
    }

    addGui(addGear: boolean = true): void {
        this.guiContainer = this.game.add.group();
        if (addGear)
            this.addGearBtn();
    }

    addGearBtn(): Phaser.Button {
        this.gearButton =
            GuiUtils.makeButton(
                this, this.guiContainer,
                433, 2, 1,
                '', ImageUtils.getAtlasClass('AtlasesGui').getName(),
                ImageUtils.getAtlasClass('AtlasesGui').Frames.GearBtn,
                true, false, true, this.onGearClick,
                GameConfig.GADGET === GadgetMode.DESKTOP ? GuiUtils.addOverHandlerMcg : null,
                GameConfig.GADGET === GadgetMode.DESKTOP ? GuiUtils.addOutHandlerMcg : null);
        this.addMusicBtns();
        this.addSoundBtns();
        return this.gearButton;
    }

    private onGearClick() {
        if (this.gearOpened) {
            let delay = 0;
            for (let i = this.gearButtons.length - 1; i >= 0; i--) {
                if (this.gearButtons[i].name === 'snd') {
                    TweenUtils.fadeAndScaleOut(this.sndonButton, Phaser.Timer.SECOND * .4, Phaser.Timer.SECOND * delay);
                    TweenUtils.fadeAndScaleOut(this.sndoffButton, Phaser.Timer.SECOND * .4, Phaser.Timer.SECOND * delay);
                }
                else if (this.gearButtons[i].name === 'mus') {
                    TweenUtils.fadeAndScaleOut(this.musonButton, Phaser.Timer.SECOND * .4, Phaser.Timer.SECOND * delay);
                    TweenUtils.fadeAndScaleOut(this.musoffButton, Phaser.Timer.SECOND * .4, Phaser.Timer.SECOND * delay);
                }
                else {
                    TweenUtils.fadeAndScaleOut(this.gearButtons[i], Phaser.Timer.SECOND * .4, Phaser.Timer.SECOND * delay);
                }
                delay += .2;
            }
        }
        else {
            let delay = 0;
            for (let i = 0; i < this.gearButtons.length; i++) {
                if (this.gearButtons[i].name === 'snd') {
                    TweenUtils.fadeAndScaleIn(this.sndonButton, Phaser.Timer.SECOND * .4, Phaser.Timer.SECOND * delay);
                    TweenUtils.fadeAndScaleIn(this.sndoffButton, Phaser.Timer.SECOND * .4, Phaser.Timer.SECOND * delay);
                }
                else if (this.gearButtons[i].name === 'mus') {
                    TweenUtils.fadeAndScaleIn(this.musonButton, Phaser.Timer.SECOND * .4, Phaser.Timer.SECOND * delay);
                    TweenUtils.fadeAndScaleIn(this.musoffButton, Phaser.Timer.SECOND * .4, Phaser.Timer.SECOND * delay);
                }
                else {
                    TweenUtils.fadeAndScaleIn(this.gearButtons[i], Phaser.Timer.SECOND * .4, Phaser.Timer.SECOND * delay);
                }
                delay += .2;
            }
        }
        this.gearOpened = !this.gearOpened;
    }

    /*addPhotoBtn(callback?: Function): Phaser.Button {
        this.photoButton =
            GuiUtils.makeButton(
                this.state, this.guiContainer,
                438, 246, 1,
                '', ImageUtils.getAtlasClass('AtlasesGui').getName(),
                ImageUtils.getAtlasClass('AtlasesGui').Frames.PhotoBtn,
                true, false, true, callback,
                GameConfig.GADGET === GadgetMode.DESKTOP ? GuiUtils.addOverHandlerMcg : null,
                GameConfig.GADGET === GadgetMode.DESKTOP ? GuiUtils.addOutHandlerMcg : null);
        this.photoButton.scale.setTo(0);
        this.photoButton.alpha = 0;
        return this.photoButton;
    }*/

	addHomeBtn(callback?: Function): Phaser.Button {
		const temp =
			GuiUtils.makeButton(
				this.state, this.guiContainer,
				452, 107 + 72 * this.gearButtons.length, 1,
				'', ImageUtils.getAtlasClass('AtlasesGui').getName(),
				ImageUtils.getAtlasClass('AtlasesGui').Frames.HomeBtn,
				true, false, true, () => {
				    callback.call(this);
                    this.onGearClick();
                },
				GameConfig.GADGET === GadgetMode.DESKTOP ? GuiUtils.addOverHandlerMcg : null,
				GameConfig.GADGET === GadgetMode.DESKTOP ? GuiUtils.addOutHandlerMcg : null);
        temp.scale.setTo(0);
        temp.alpha = 0;
        this.gearButtons.push(temp);
		return temp;
	}

    addShopBtn(callback?: Function): Phaser.Button {
        const temp =
            GuiUtils.makeButton(
                this.state, this.guiContainer,
                452, 107 + 72 * this.gearButtons.length, 1,
                '', ImageUtils.getAtlasClass('AtlasesGui').getName(),
                ImageUtils.getAtlasClass('AtlasesGui').Frames.ShopBtn,
                true, false, true, () => {
                    callback.call(this);
                    this.onGearClick();
                },
                GameConfig.GADGET === GadgetMode.DESKTOP ? GuiUtils.addOverHandlerMcg : null,
                GameConfig.GADGET === GadgetMode.DESKTOP ? GuiUtils.addOutHandlerMcg : null);
        temp.scale.setTo(0);
        temp.alpha = 0;
        this.gearButtons.push(temp);
        return temp;
    }

    addLeadersBtn(callback?: Function): Phaser.Button {
        const temp =
            GuiUtils.makeButton(
                this.state, this.guiContainer,
                452, 107 + 72 * this.gearButtons.length, 1,
                '', ImageUtils.getAtlasClass('AtlasesGui').getName(),
                ImageUtils.getAtlasClass('AtlasesGui').Frames.LeadersBtn,
                true, false, true, () => {
                    callback.call(this);
                    this.onGearClick();
                },
                GameConfig.GADGET === GadgetMode.DESKTOP ? GuiUtils.addOverHandlerMcg : null,
                GameConfig.GADGET === GadgetMode.DESKTOP ? GuiUtils.addOutHandlerMcg : null);
        temp.scale.setTo(0);
        temp.alpha = 0;
        this.gearButtons.push(temp);
        return temp;
    }

    addPauseBtn(callback?: Function): Phaser.Button {
        const temp =
            GuiUtils.makeButton(
                this.state, this.guiContainer,
                452, 107 + 72 * this.gearButtons.length, 1,
                '', ImageUtils.getAtlasClass('AtlasesGui').getName(),
                ImageUtils.getAtlasClass('AtlasesGui').Frames.PauseBtn,
                true, false, true, () => {
                    callback.call(this);
                    this.onGearClick();
                },
                GameConfig.GADGET === GadgetMode.DESKTOP ? GuiUtils.addOverHandlerMcg : null,
                GameConfig.GADGET === GadgetMode.DESKTOP ? GuiUtils.addOutHandlerMcg : null);
        temp.scale.setTo(0);
        temp.alpha = 0;
        this.gearButtons.push(temp);
        return temp;
    }

    addCopyrightBtn(callback?: Function): Phaser.Button {
        this.copyButton =
            GuiUtils.makeButton(
                this.state, this.guiContainer,
                246, 6, 1,
                '', ImageUtils.getAtlasClass('AtlasesGui').getName(),
                ImageUtils.getAtlasClass('AtlasesGui').Frames.TriBtn,
                true, false, true, callback,
                GameConfig.GADGET === GadgetMode.DESKTOP ? GuiUtils.addOverHandler : null,
                GameConfig.GADGET === GadgetMode.DESKTOP ? GuiUtils.addOutHandler : null);
        return this.copyButton;
    }

    /*addHintBtn(callback?: Function): Phaser.Button {
        this.hintButton =
            GuiUtils.makeButton(
                this.state, this.guiContainer,
                4, 2, 1,
                '', ImageUtils.getAtlasClass('AtlasesGui').getName(),
                ImageUtils.getAtlasClass('AtlasesGui').Frames.HintBtn,
                true, false, true, callback,
                GameConfig.GADGET === GadgetMode.DESKTOP ? GuiUtils.addOverHandlerMcg : null,
                GameConfig.GADGET === GadgetMode.DESKTOP ? GuiUtils.addOutHandlerMcg : null);
        return this.hintButton;
    }*/

    addPlayBtn(type: GuiButtons, callback?: Function, x?: number, y?: number): Phaser.Button {
        let asset: any;
        if (type === GuiButtons.START) {
            asset = ImageUtils.getAtlasClass('AtlasesGui').Frames.PlayBtn;
        }
        /*else if (type === GuiButtons.DONE) {
            asset = ImageUtils.getAtlasClass('AtlasesGui').Frames.DoneBtn;
        }
        else if (type === GuiButtons.GO) {
	        asset = ImageUtils.getAtlasClass('AtlasesGui').Frames.GoBtn;
        }
        else if (type === GuiButtons.RIGHT) {
	        asset = ImageUtils.getAtlasClass('AtlasesGui').Frames.RightBtn;
        }*/
        this.playButton =
            GuiUtils.makeButton(
                this.state, this.guiContainer,
                x, y, 1,
                '', ImageUtils.getAtlasClass('AtlasesGui').getName(), asset,
                true, false, true, callback,
                GameConfig.GADGET === GadgetMode.DESKTOP ? GuiUtils.addOverHandlerMcg : null,
                GameConfig.GADGET === GadgetMode.DESKTOP ? GuiUtils.addOutHandlerMcg : null);
        return this.playButton;
    }

    /*addExtraMore(x: number, y: number, asset: string, frames?: any|any[],
                 overHandler: Function = GuiUtils.addOverHandler,
                 outHandler: Function = GuiUtils.addOutHandler,
                 callback: Function = null): Phaser.Button {

        if (frames == null) {
            frames = [0, 0, 0];
        }
        else if (isString(frames)) {
            frames = [frames, frames, frames];
        }

        this.moreButton =
            GuiUtils.makeButton(
                this.state, this.guiContainer,
                x, y, 1,
                '', asset, frames,
                true, false, true, callback, overHandler, outHandler);

        return this.moreButton;
    }*/

    /*addExtraMoreAnimated(x: number, y: number, asset: string, frames: any[], frameRate: number = 10, loop: boolean = true,
                         overHandler: Function = GuiUtils.addOverHandler,
                         outHandler: Function = GuiUtils.addOutHandler,
                         callback: Function = null): Phaser.Sprite {

        this.moreButton2 =
            GuiUtils.makeSpritesheetButton(
                this.state, this.guiContainer,
                x, y, 1, frameRate, loop,
                '', asset, frames,
                true, false, true, callback, overHandler, outHandler);

        return this.moreButton2;
    }*/

    /*addMoreBtn(): Phaser.Button {
        this.moreButton =
            GuiUtils.makeButton(
                this, this.guiContainer,
                810, 590, 1,
                '', ImageUtils.getSpritesheetClass('SpritesheetsMoreMcg1651322').getName(), [0, 1, 0],
                true, false, true, GuiUtils.goLinkMainMoreGames, GuiUtils.addOverHandlerMcg, GuiUtils.addOutHandlerMcg);
        return this.moreButton;
    }*/

    /*addLogoBtn(): Phaser.Button {
        this.logoButton =
            GuiUtils.makeButton(
                this, this.guiContainer,
                -10, -10, 1,
                '', ImageUtils.getAtlasClass('AtlasesGuiMcg').getName(),
                ImageUtils.getAtlasClass('AtlasesGuiMcg').Frames.LogoMcg,
                true, false, true, GuiUtils.goLinkMainLogo, GuiUtils.addOverHandlerMcg, GuiUtils.addOutHandlerMcg);
        return this.logoButton;
    }*/

    addSoundBtns(): Array<Phaser.Button> {
        const on =
            GuiUtils.makeButton(
                this, this.guiContainer,
                452, 107 + 72 * this.gearButtons.length, 1,
                'snd', ImageUtils.getAtlasClass('AtlasesGui').getName(),
                ImageUtils.getAtlasClass('AtlasesGui').Frames.SndOnBtn,
                true, false, SoundUtils.isSoundEnabled(),
                () => {
                    SoundUtils.soundSwitch();
                    this.onGearClick();
                },
                GameConfig.GADGET === GadgetMode.DESKTOP ? GuiUtils.addOverHandlerMcg : null,
                GameConfig.GADGET === GadgetMode.DESKTOP ? GuiUtils.addOutHandlerMcg : null);
        const off =
            GuiUtils.makeButton(
                this, this.guiContainer,
                452, 107 + 72 * this.gearButtons.length, 1,
                '', ImageUtils.getAtlasClass('AtlasesGui').getName(),
                ImageUtils.getAtlasClass('AtlasesGui').Frames.SndOffBtn,
                true, false, !SoundUtils.isSoundEnabled(),
                () => {
                    SoundUtils.soundSwitch();
                    this.onGearClick();
                },
                GameConfig.GADGET === GadgetMode.DESKTOP ? GuiUtils.addOverHandlerMcg : null,
                GameConfig.GADGET === GadgetMode.DESKTOP ? GuiUtils.addOutHandlerMcg : null);
        this.gearButtons.push(on);
        this.sndonButton = on;
        this.sndoffButton = off;
        on.scale.setTo(0);
        on.alpha = 0;
        off.scale.setTo(0);
        off.alpha = 0;
        SoundUtils.onSwitchSound.add(() => {
            on.visible = !on.visible;
            off.visible = !off.visible;
        }, this);
        return [on, off];
    }

    addMusicBtns(): Array<Phaser.Button> {
        const on =
            GuiUtils.makeButton(
                this, this.guiContainer,
                452, 107 + 72 * this.gearButtons.length, 1,
                'mus', ImageUtils.getAtlasClass('AtlasesGui').getName(),
                ImageUtils.getAtlasClass('AtlasesGui').Frames.MusOnBtn,
                true, false, SoundUtils.isMusicEnabled(),
                () => {
                    SoundUtils.mainThemeSwitch();
                    this.onGearClick();
                },
                GameConfig.GADGET === GadgetMode.DESKTOP ? GuiUtils.addOverHandlerMcg : null,
                GameConfig.GADGET === GadgetMode.DESKTOP ? GuiUtils.addOutHandlerMcg : null);
        const off =
            GuiUtils.makeButton(
                this, this.guiContainer,
                452, 107 + 72 * this.gearButtons.length, 1,
                '', ImageUtils.getAtlasClass('AtlasesGui').getName(),
                ImageUtils.getAtlasClass('AtlasesGui').Frames.MusOffBtn,
                true, false, !SoundUtils.isMusicEnabled(),
                () => {
                    SoundUtils.mainThemeSwitch();
                    this.onGearClick();
                },
                GameConfig.GADGET === GadgetMode.DESKTOP ? GuiUtils.addOverHandlerMcg : null,
                GameConfig.GADGET === GadgetMode.DESKTOP ? GuiUtils.addOutHandlerMcg : null);
        this.gearButtons.push(on);
        this.musonButton = on;
        this.musoffButton = off;
        on.scale.setTo(0);
        on.alpha = 0;
        off.scale.setTo(0);
        off.alpha = 0;
        SoundUtils.onSwitchAudio.add(() => {
            on.visible = !on.visible;
            off.visible = !off.visible;
        }, this);
        return [on, off];
    }

    addExtraBtn(x: number, y: number, asset: string, frames?: any|any[],
                callback?: Function,
                overHandler: Function = GuiUtils.addOverHandler,
                outHandler: Function = GuiUtils.addOutHandler): Phaser.Button {

        if (frames == null) {
            frames = [0, 0, 0];
        }
        else if (isString(frames)) {
            frames = [frames, frames, frames];
        }

        const btn =
            GuiUtils.makeButton(
                this.state, this.guiContainer,
                x, y, 1,
                '', asset, frames,
                true, false, true, callback, overHandler, outHandler);

        this.guiContainer.add(btn);
        this.extras.push(btn);

        return btn;
    }

    addExtraBtnAnimated(x: number, y: number, asset: string, frames: any[], frameRate: number = 10, loop: boolean = true,
                        callback?: Function,
                        overHandler: Function = GuiUtils.addOverHandler,
                        outHandler: Function = GuiUtils.addOutHandler): Phaser.Sprite {

        const btn =
            GuiUtils.makeSpritesheetButton(
                this.state, this.guiContainer,
                x, y, 1, frameRate, loop,
                '', asset, frames,
                true, false, true, callback, overHandler, outHandler);

        this.extras2.push(btn);

        return btn;
    }

    hideStandart(): void {
        if (this.playButton) this.playButton.visible = false;
    }

    hideAll(): void {
    	this.guiContainer.visible = false;
    }

    disable(): void {
        for (let btn of this.extras) {
            btn.inputEnabled = false;
            btn.filters = null;
        }
        for (let btn of this.extras2) {
            btn.inputEnabled = false;
            btn.filters = null;
        }
        for (let btn of this.gearButtons) {
            btn.inputEnabled = false;
            btn.filters = null;
        }
        if (!isNull(this.playButton)) {
            this.playButton.inputEnabled = false;
            this.playButton.filters = null;
            TweenUtils.fadeAndScaleOut(this.playButton);
        }
    }

    dispose(): void {
        SoundUtils.onSwitchAudio.removeAll(this);
        SoundUtils.onSwitchSound.removeAll(this);
        for (let btn of this.gearButtons) {
            btn.destroy(true);
        }
        for (let btn of this.extras) {
            btn.destroy(true);
        }
        for (let btn of this.extras2) {
            btn.destroy(true);
        }
        this.guiContainer.destroy(true);
    }
}
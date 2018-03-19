import * as AssetUtils from '../utils/asset.utils';
import {AssetMode, GadgetMode, GameConfig, WeaponType} from '../config/game.config';
import {TweenUtils} from '../utils/tween.utils';
import {ImageUtils} from '../utils/images/image.utils';
import {InstantGui} from './gui/instant.gui';
import {GuiButtons} from './gui/enum.gui';
import {EffectUtils} from '../utils/effect.utils';
import {GuiUtils} from '../utils/gui.utils';
import {TopUi} from './template/top/top.ui';
import {FoodTable} from './template/game/table/food.table';
import {ViralUtils} from '../utils/viral/viral.utils';
import {InviteWindow} from '../utils/viral/invite.window';
import {UnblockWindow} from '../utils/viral/unblock.window';
import {PauseWindow} from '../utils/viral/pause.window';
import {QuitWindow} from '../utils/viral/quit.window';
import {WeaponWindow} from '../utils/viral/weapon.window';
import {LeaderItem} from './template/leaders/leader.item';
import {LeaderData} from '../data/leader.data';
import {SoundUtils} from '../utils/sound/sound.utils';

export default class Leaders extends Phaser.State {

    private NEXT = 'Level';
    private nextPrepared = false;

    private gui: InstantGui = null;

    private container: Phaser.Group = null;
    private containerItems: Phaser.Group = null;
    private bg: Phaser.Sprite = null;
    private board: Phaser.Sprite = null;
    private bug: Phaser.Sprite = null;
    private label: Phaser.Sprite = null;
    private allBtn: Phaser.Button = null;
    private friendBtn: Phaser.Button = null;
    private backBtn: Phaser.Button = null;

    private spinner: Phaser.Sprite = null;
    private blocker: Phaser.Graphics = null;

    private listOf: LeaderData[] = [];

    private selectedTab: number = 0;

    public init(...args: any[]): void {
        this.gui = new InstantGui(this);
        this.NEXT = args[0] as string;
        this.listOf = [];
        this.listOf.push(
            new LeaderData('4', false, 'Андрей', '', GameConfig.PLAYER_DATA.coins), // MEEE
            new LeaderData('5', false, 'Катя', '', 8456),
            new LeaderData('6', true, 'Аня', '', 7456),
            new LeaderData('1', true, 'Варя', '', 12456),
            new LeaderData('2', false, 'Денис', '', 11456),
            new LeaderData('3', false, 'Наташа', '', 10456)
        );
        this.listOf.sort(this.compare);
        SoundUtils.play('MainTheme');
    }

    private compare(a: LeaderData, b: LeaderData) {
        if (a.score > b.score)
            return -1;
        if (a.score < b.score)
            return 1;
        return 0;
    }

    public preload(): void {
    }

    public create(): void {

        this.bg = this.game.add.sprite(0, 0, ImageUtils.getImageClass('ImagesBgLeaders').getName());

        this.container = this.game.add.group();
        this.board = this.game.add.sprite(8, 138,
            ImageUtils.getAtlasClass('AtlasesStateLeaders').getName(),
            ImageUtils.getAtlasClass('AtlasesStateLeaders').Frames.Board,
            this.container
        );

        this.containerItems = this.game.add.group();
        this.container.add(this.containerItems);

        this.label = this.game.add.sprite(242, 7,
            ImageUtils.getAtlasClass('AtlasesStateLeaders').getName(),
            ImageUtils.getAtlasClass('AtlasesStateLeaders').Frames['Label' + GameConfig.LOCALE],
            this.container
        );
        this.bug = this.game.add.sprite(0, 0,
            ImageUtils.getAtlasClass('AtlasesStateLeaders').getName(),
            ImageUtils.getAtlasClass('AtlasesStateLeaders').Frames.Bug,
            this.container
        );

        this.friendBtn = GuiUtils.makeButton(this, this.container, 17, 134, 1, '',
            ImageUtils.getAtlasClass('AtlasesStateLeaders').getName(),
            ImageUtils.getAtlasClass('AtlasesStateLeaders').Frames['FrBtn' + GameConfig.LOCALE],
            true, false, true,
            this.selectTab,
            GameConfig.GADGET === GadgetMode.DESKTOP ? GuiUtils.addOverHandler : null,
            GameConfig.GADGET === GadgetMode.DESKTOP ? GuiUtils.addOutHandler : null
        );
        this.allBtn = GuiUtils.makeButton(this, this.container, 260, 134, 1, '',
            ImageUtils.getAtlasClass('AtlasesStateLeaders').getName(),
            ImageUtils.getAtlasClass('AtlasesStateLeaders').Frames['AllBtn' + GameConfig.LOCALE],
            true, false, true,
            this.selectTab,
            GameConfig.GADGET === GadgetMode.DESKTOP ? GuiUtils.addOverHandler : null,
            GameConfig.GADGET === GadgetMode.DESKTOP ? GuiUtils.addOutHandler : null
        );
        this.backBtn = GuiUtils.makeButton(this, this.container, 202, 822, 1, '',
            ImageUtils.getAtlasClass('AtlasesStateLeaders').getName(),
            ImageUtils.getAtlasClass('AtlasesStateLeaders').Frames.ReturnBtn,
            true, false, true,
            () => {
                if (GameConfig.SELECTED_STAGE === 8 && GameConfig.SELECTED_LVL === 8) {
                    this.NEXT = 'SelectLevel';
                }
                else if (GameConfig.SELECTED_STAGE === 8) {
                    GameConfig.SELECTED_STAGE = 1;
                    GameConfig.SELECTED_LVL++;
                }
                else {
                    GameConfig.SELECTED_STAGE++;
                }
                this.nextState();
            },
            GameConfig.GADGET === GadgetMode.DESKTOP ? GuiUtils.addOverHandler : null,
            GameConfig.GADGET === GadgetMode.DESKTOP ? GuiUtils.addOutHandler : null
        );

        this.selectTab(this.allBtn);

        // Animations goes here
	    this.game.camera.flash(0x000000, 1000);
	    TweenUtils.fadeAndScaleIn(this.backBtn, 750, 1000);

        // Assets Managment starts here
        if (GameConfig.IS_ASSETS_LOADED)
            this.waitForLoading();
        else if (GameConfig.ASSET_MODE === AssetMode.LOAD_BACKGROUND) {
            // Loads
            // PreloaderUtils.preloadComixState();
            AssetUtils.Loader.loadSelectedAssets(this.game, true, this.waitForLoading, this);
        }
    }

    selectTab(sprite: Phaser.Button) {
        if (sprite === this.friendBtn) this.selectedTab = 1;
        else this.selectedTab = 0;
        this.containerItems.removeAll(true);
        const filteredArr = this.listOf.filter((el: LeaderData) => {
            if (GameConfig.PLAYER_DATA.vid === el.vid) return true;
            return (this.selectedTab === 0 ? true : el.isFriend);
        });
        let i = 0;
        for (let l of filteredArr) {
            const temp = new LeaderItem(this.containerItems, i, 31, 205 + 106 * i, l);
            i++;
        }
        if (0 === this.selectedTab) {
            this.friendBtn.loadTexture(
                ImageUtils.getAtlasClass('AtlasesStateLeaders').getName(),
                ImageUtils.getAtlasClass('AtlasesStateLeaders').Frames['FrBtn' + GameConfig.LOCALE]
            );
            this.allBtn.loadTexture(
                ImageUtils.getAtlasClass('AtlasesStateLeaders').getName(),
                ImageUtils.getAtlasClass('AtlasesStateLeaders').Frames['AllBtnSel' + GameConfig.LOCALE]
            );
            this.friendBtn.inputEnabled = true;
            this.allBtn.inputEnabled = false;
        }
        else {
            this.friendBtn.loadTexture(
                ImageUtils.getAtlasClass('AtlasesStateLeaders').getName(),
                ImageUtils.getAtlasClass('AtlasesStateLeaders').Frames['FrBtnSel' + GameConfig.LOCALE]
            );
            this.allBtn.loadTexture(
                ImageUtils.getAtlasClass('AtlasesStateLeaders').getName(),
                ImageUtils.getAtlasClass('AtlasesStateLeaders').Frames['AllBtn' + GameConfig.LOCALE]
            );
            this.friendBtn.inputEnabled = false;
            this.allBtn.inputEnabled = true;
        }
    }

    public update(): void {
        super.update(this.game);
    }

    public shutdown(): void {
        this.game.time.events.removeAll();
        this.game.tweens.removeAll();
        if (this.bg) this.bg.destroy(true);
        if (this.board) this.board.destroy(true);
        if (this.bug) this.bug.destroy(true);
        if (this.label) this.label.destroy(true);
        if (this.allBtn) this.allBtn.destroy(true);
        if (this.friendBtn) this.friendBtn.destroy(true);
        if (this.backBtn) this.backBtn.destroy(true);
        if (this.containerItems) this.containerItems.destroy(true);
        if (this.container) this.container.destroy(true);
        if (this.spinner) this.spinner.destroy(true);
        if (this.blocker) this.blocker.destroy(true);
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


import * as AssetUtils from '../utils/asset.utils';
import {AssetMode, GameConfig, WeaponType} from '../config/game.config';
import {TweenUtils} from '../utils/tween.utils';
import {ImageUtils} from '../utils/images/image.utils';
import {InstantGui} from './gui/instant.gui';
import {GuiButtons} from './gui/enum.gui';
import {EffectUtils} from '../utils/effect.utils';
import {GuiUtils} from '../utils/gui.utils';
import {TopUi} from './template/top/top.ui';
import {FoodTable} from './template/game/table/food.table';
import {LevelData} from '../data/level.data';
import {Mob} from './template/game/mobs/mob';
import {Finger} from './template/game/weapon/finger';
import {RightUi} from './template/right/right.ui';
import {GFinger} from './template/game/weapon/gfinger';
import {Slipper} from './template/game/weapon/slipper';
import {Chalk} from './template/game/weapon/chalk';

export default class Level extends Phaser.State {

    private NEXT = 'Select';
    private nextPrepared = false;
    private levelData: LevelData = null;

    private container: Phaser.Group = null;
    private touch: Phaser.Graphics = null;
    private gui: InstantGui = null;
    private topUi: TopUi = null;
    private rightUi: RightUi = null;
    private table: FoodTable = null;
    private finger: Finger = null;
    private gfinger: GFinger = null;
    private slipper: Slipper = null;
    private chalk: Chalk = null;

    private mobContainer: Phaser.Group = null;
    private chalkContainer: Phaser.Group = null;
    private bg: Phaser.Sprite = null;

    private spinner: Phaser.Sprite = null;
    private blocker: Phaser.Graphics = null;

    private isPaused: boolean = true;
    private currentTime: number = 0;
    private nextSpawn: number = 0;
    private mobs: Mob[] = [];
    private lanes: number[] = [54, 125, 206, 286, 384, 486];
    private selectedWeapon: WeaponType = WeaponType.FINGER;

    private startPosition: Phaser.Point;
    private shakeTime: number;
    private maxShakeAmount: number;
    private animateShake: boolean = false;

    public init(...args: any[]): void {
        this.gui = new InstantGui(this);
        this.isPaused = true;
        this.currentTime = 0;
        this.mobs = [];
        this.selectedWeapon = WeaponType.FINGER;
        this.levelData = GameConfig.getLevelData(GameConfig.SELECTED_LVL, GameConfig.SELECTED_STAGE);
    }

    public preload(): void {
    }

    public create(): void {

        this.container = this.game.add.group();
        this.bg = this.game.add.sprite(0, 0, ImageUtils.getImageClass('ImagesBack' + GameConfig.SELECTED_LVL).getName(), null, this.container);

        this.table = new FoodTable();
        this.container.add(this.table.getBody());
        this.table.addRandomFood(this.levelData.foodCount);

        this.mobContainer = this.game.add.group();
        this.container.add(this.mobContainer);
        this.chalkContainer = this.game.add.group();
        this.container.add(this.chalkContainer);

        this.touch = GuiUtils.makeRectangle(0, 131, 540, 650, 0x00ff00);
        this.touch.alpha = .25;

        this.finger = new Finger();
        this.gfinger = new GFinger();
        this.slipper = new Slipper();
        this.chalk = new Chalk(this.chalkContainer);
        this.finger.toHoldPosition();
        this.gfinger.toOutPosition();
        this.slipper.toOutPosition();
        this.chalk.toOutPosition();

        this.touch.inputEnabled = true;
        this.touch.events.onInputDown.add(() => {
            this.chalk.activate();
            this.chalk.onEndDraw.addOnce(() => {
                // this.touch.inputEnabled = false;
                TweenUtils.delayedCall(2000, () => {
                    let delay: number = 0;
                    for (let c of this.chalkContainer.children) {
                        TweenUtils.fadeAndScaleOut(c, 200, delay, () => {
                            (c as Phaser.Sprite).destroy(true);
                        }, this);
                        delay += 30;
                    }
                }, this);
            }, this);
        }, this);
        this.touch.events.onInputUp.add(this.chalk.deactivate, this.chalk);
        this.touch.inputEnabled = false;

        this.topUi = new TopUi();
        this.rightUi = new RightUi();
        this.container.add(this.rightUi.getBody());
        this.rightUi.onChange.add((wt: WeaponType) => {
            // REMOVE PREVIOUS
            if (this.selectedWeapon === WeaponType.FINGER) {
                this.finger.toOutPosition();
            }
            else if (this.selectedWeapon === WeaponType.GFINGER) {
                this.gfinger.toOutPosition();
            }
            else if (this.selectedWeapon === WeaponType.SLIPPER) {
                this.slipper.toOutPosition();
            }
            else if (this.selectedWeapon === WeaponType.CHALK) {
                this.chalk.toOutPosition();
            }
            // SHOW SELECTED
            if (wt === WeaponType.GFINGER) {
                this.gfinger.toHoldPosition();
            }
            else if (wt === WeaponType.FINGER) {
                this.finger.toHoldPosition();
            }
            else if (wt === WeaponType.SLIPPER) {
                this.slipper.toHoldPosition();
            }
            else if (wt === WeaponType.CHALK) {
                this.chalk.toHoldPosition();
                this.touch.inputEnabled = true;
            }
            // ASSIGN
            this.selectedWeapon = wt;
        }, this);

        // GUI Buttons
        this.gui.addGui();
        this.gui.addHomeBtn(null);

        const playBtn = this.gui.addPlayBtn(GuiButtons.START, this.nextState, 130, 738);
        playBtn.alpha = 0;
        playBtn.scale.setTo(0);

        // Animations goes here
	    this.game.camera.flash(0x000000, 1000);
	    TweenUtils.delayedCall(1000, this.topUi.show, this.topUi);
	    TweenUtils.delayedCall(1000, this.table.show, this.table);
	    TweenUtils.delayedCall(1000, this.rightUi.show, this.rightUi);
	    TweenUtils.delayedCall(2000, () => {
	        this.isPaused = false;
	        // INITS
            this.nextSpawn = 30;
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

    private mobHitted(mob: Mob) {
        if (this.selectedWeapon === WeaponType.FINGER) {
            this.finger.smash(mob, () => {
                TweenUtils.delayedCall(50, () => {
                    this.shake(25, 2);
                }, this);
                const isDead = mob.makeDamage(this.selectedWeapon);
                if (isDead) {
                    TweenUtils.delayedCall(2000, () => {
                        mob.fadeOut();
                        TweenUtils.delayedCall(500, () => {
                            mob.dispose();
                            mob = null;
                        }, this);
                    }, this);
                }
            }, this);
        }
        else if (this.selectedWeapon === WeaponType.GFINGER) {
            this.gfinger.smash(mob, () => {
                TweenUtils.delayedCall(50, () => {
                    this.shake(25, 2);
                }, this);
                const isDead = mob.makeDamage(this.selectedWeapon);
                if (isDead) {
                    TweenUtils.delayedCall(2000, () => {
                        mob.fadeOut();
                        TweenUtils.delayedCall(500, () => {
                            mob.dispose();
                            mob = null;
                        }, this);
                    }, this);
                }
            }, this);
        }
        else if (this.selectedWeapon === WeaponType.SLIPPER) {
            // find 2 more bugs to slap with slipper!
            this.slipper.smash(mob, () => {
                TweenUtils.delayedCall(50, () => {
                    this.shake(30, 20);
                }, this);
                const isDead = mob.makeDamage(this.selectedWeapon);
                if (isDead) {
                    TweenUtils.delayedCall(2000, () => {
                        mob.fadeOut();
                        TweenUtils.delayedCall(500, () => {
                            mob.dispose();
                            mob = null;
                        }, this);
                    }, this);
                }
            }, this);
        }
    }

    public render(): void {
        this.game.debug.cameraInfo(this.game.camera, 32, 32);
    }

    public update(): void {
        super.update(this.game);
        if (this.isPaused) return;
        this.currentTime++;
        if (this.animateShake) {
            let sa = Math.min(this.maxShakeAmount, this.shakeTime);
            this.container.position.setTo(
                this.startPosition.x + (-sa / 2 + Math.random() * sa),
                this.startPosition.y + (-sa / 2 + Math.random() * sa)
            );
            this.shakeTime--;
            if (this.shakeTime <= 0) {
                this.shakeTime = 0;
                this.animateShake = false;
            }
        }
        this.finger.update();
        this.gfinger.update();
        this.slipper.update();
        this.chalk.update();
        if (this.currentTime === this.nextSpawn) {
            const mb = new Mob(
                this.mobContainer,
                this.levelData.mobs[this.game.rnd.between(0, this.levelData.mobs.length - 1)],
                this.lanes[this.game.rnd.between(0, this.lanes.length - 1)], -100);
            this.mobs.push(mb);
            mb.onClick.add(this.mobHitted, this);
            this.nextSpawn = this.currentTime + this.game.rnd.between(this.levelData.minSpawn, this.levelData.maxSpawn);
        }
        for (let m of this.mobs) {
            if (m === null)
                continue;
            m.update();
            if (m.getY() > 855) {
                m.dispose();
                m = null;
            }
        }
        // clear
        for (let i = this.mobs.length - 1; i >= 0; i--) {
            if (this.mobs[i] === null) {
                this.mobs.splice(i, 1);
            }
        }
    }

    private shake(frames: number, amount: number) {
        if (!this.shakeTime || this.shakeTime <= 0) {
            this.startPosition = new Phaser.Point(this.container.x, this.container.y);
            this.shakeTime = frames;
            this.maxShakeAmount = amount;
            this.animateShake = true;
        }
        else {
            this.startPosition = new Phaser.Point(this.container.x, this.container.y);
            this.shakeTime += frames;
            this.maxShakeAmount = amount;
        }
    }

    public shutdown(): void {
        this.game.time.events.removeAll();
        this.game.tweens.removeAll();
        if (this.bg) this.bg.destroy(true);
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


import * as AssetUtils from '../utils/asset.utils';
import {AssetMode, GameConfig, MonsterType, WeaponType} from '../config/game.config';
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
import {Poison} from './template/game/weapon/poison';
import {FoodItem} from './template/game/table/food.item';
import {Spray} from './template/game/weapon/spray';
import {PauseWindow} from '../utils/viral/pause.window';
import {QuitWindow} from '../utils/viral/quit.window';
import {isUndefined} from 'util';
import {Boss} from './template/game/mobs/boss';
import {MobData} from '../data/mob.data';
import {SoundUtils} from '../utils/sound/sound.utils';
import {Present} from './template/game/events/present';

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
    private poison: Poison = null;
    private spray: Spray = null;

    private pauseWin: PauseWindow = null;
    private quitWin: QuitWindow = null;

    private presentContainer: Phaser.Group = null;
    private mobContainer: Phaser.Group = null;
    private chalkContainer: Phaser.Group = null;
    private bossContainer: Phaser.Group = null;
    private bg: Phaser.Sprite = null;

    private spinner: Phaser.Sprite = null;
    private blocker: Phaser.Graphics = null;

    private isPaused: boolean = true;
    private currentTime: number = 0;
    private nextSpawn: number = 0;
    private presents: number = 0;
    private presentDelay: number = 0;
    private boss: Boss = null;
    private mobs: Mob[] = [];
    private presentArr: Present[] = [];
    private poisonedFood: FoodItem[] = [];
    private lanes: number[] = [54, 125, 206, 286, 384, 486];
    private selectedEObject: any;
    private selectedWeapon: WeaponType = WeaponType.FINGER;

    private startPosition: Phaser.Point;
    private shakeTime: number;
    private maxShakeAmount: number;
    private animateShake: boolean = false;
    private gameEnded: boolean = false;
    private engagingBoss: boolean = false;

    public init(...args: any[]): void {
        this.gui = new InstantGui(this);
        this.isPaused = true;
        this.gameEnded = false;
        this.engagingBoss = false;
        this.shakeTime = 0;
        this.currentTime = 0;
        this.maxShakeAmount = 0;
        this.presentDelay = 100;
        this.presents = 0;
        this.boss = null;
        this.mobs = [];
        this.presentArr = [];
        this.poisonedFood = [];
        this.selectedWeapon = WeaponType.FINGER;
        this.selectedEObject = this.finger;
        this.levelData = GameConfig.getLevelData(GameConfig.SELECTED_LVL, GameConfig.SELECTED_STAGE);
        this.game.onBlur.add(() => {
            // console.log('On Blur');
            this.isPaused = true;
            this.pauseWin.show(true);
        });
        this.game.onFocus.add(() => {
            // console.log('On Focus');
        });
        this.game.onPause.add(() => {
            // console.log('On Pause');
            /*this.isPaused = true;
            this.pauseWin.show(true);*/
        });
        this.game.onResume.add(() => {
            // console.log('On Resume');
            TweenUtils.delayedCall(1550, () => {
                this.pauseWin.enforceInput();
            }, this);
        });
        if (GameConfig.SELECTED_LVL === 1 || GameConfig.SELECTED_LVL === 2 || GameConfig.SELECTED_LVL === 3) {
            SoundUtils.play('Level13Theme');
        }
        else if (GameConfig.SELECTED_LVL === 4 || GameConfig.SELECTED_LVL === 5 || GameConfig.SELECTED_LVL === 6) {
            SoundUtils.play('Level46Theme');
        }
        else if (GameConfig.SELECTED_LVL === 7 || GameConfig.SELECTED_LVL === 8) {
            SoundUtils.play('Level78Theme');
        }
    }

    public preload(): void {
    }

    public create(): void {

        this.container = this.game.add.group();
        this.container.position.setTo(0, 0);
        this.bg = this.game.add.sprite(0, 0, ImageUtils.getImageClass('ImagesBack' + GameConfig.SELECTED_LVL).getName(), null, this.container);

        this.table = new FoodTable();
        this.container.add(this.table.getBody());
        this.table.addRandomFood(this.levelData.foodCount);

        this.touch = GuiUtils.makeRectangle(0, 131, 540, 650, 0x00ff00);
        this.touch.alpha = 0;

        this.presentContainer = this.game.add.group();
        this.container.add(this.presentContainer);
        this.chalkContainer = this.game.add.group();
        this.container.add(this.chalkContainer);
        this.mobContainer = this.game.add.group();
        this.container.add(this.mobContainer);
        this.bossContainer = this.game.add.group();
        this.container.add(this.bossContainer);

        this.finger = new Finger();
        this.gfinger = new GFinger();
        this.slipper = new Slipper();
        this.chalk = new Chalk(this.chalkContainer);
        this.poison = new Poison();
        this.spray = new Spray();
        this.finger.toHoldPosition();
        this.gfinger.toOutPosition();
        this.slipper.toOutPosition();
        this.chalk.toOutPosition();
        this.spray.toOutPosition();
        this.selectedEObject = this.finger;

        this.touch.inputEnabled = true;
        this.touch.events.onInputDown.add(this.onTouch, this);
        this.touch.events.onInputUp.add(this.chalk.deactivate, this.chalk);
        // this.touch.inputEnabled = false;

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
            else if (this.selectedWeapon === WeaponType.POISON) {
                this.poison.toOutPosition();
            }
            else if (this.selectedWeapon === WeaponType.SPRAY) {
                this.spray.toOutPosition();
            }
            // SHOW SELECTED
            if (wt === WeaponType.GFINGER) {
                this.gfinger.toHoldPosition();
                this.selectedEObject = this.gfinger;
            }
            else if (wt === WeaponType.FINGER) {
                this.finger.toHoldPosition();
                this.selectedEObject = this.finger;
            }
            else if (wt === WeaponType.SLIPPER) {
                this.slipper.toHoldPosition();
                this.selectedEObject = this.slipper;
            }
            else if (wt === WeaponType.CHALK) {
                this.chalk.toHoldPosition();
                this.selectedEObject = this.chalk;
            }
            else if (wt === WeaponType.POISON) {
                this.poison.toHoldPosition();
                this.selectedEObject = this.poison;
            }
            else if (wt === WeaponType.SPRAY) {
                this.spray.toHoldPosition();
                this.selectedEObject = this.spray;
            }
            // ASSIGN
            this.selectedWeapon = wt;
        }, this);

        //
        this.table.onFoodEnded.addOnce(this.looseGame, this);
        this.topUi.setTime(this.levelData.duration);

        // GUI Buttons
        this.gui.addGui();
        this.gui.addHomeBtn(() => {
            this.isPaused = true;
            this.quitWin.show();
        });
        this.gui.addPauseBtn(() => {
            this.isPaused = true;
            this.pauseWin.show();
        });

        const playBtn = this.gui.addPlayBtn(GuiButtons.START, this.nextState, 130, 738);
        playBtn.alpha = 0;
        playBtn.scale.setTo(0);

        this.quitWin = new QuitWindow();
        this.quitWin.setListeners(() => {
            this.gameEnded = true;
            this.NEXT = 'SelectStage';
            this.nextState();
        }, () => {
            this.isPaused = false;
        }, this);
        this.pauseWin = new PauseWindow();
        this.pauseWin.setListeners(() => {
            this.game.tweens.resumeAll();
            this.game.time.events.resume();
            this.isPaused = false;
            TweenUtils.delayedCall(50, () => {
                this.pauseWin.enforceInput();
            }, this);
        }, this);

        // Animations goes here
	    this.game.camera.flash(0x000000, 1000);
	    TweenUtils.delayedCall(1000, this.topUi.show, this.topUi);
	    TweenUtils.delayedCall(1000, this.table.show, this.table);
	    TweenUtils.delayedCall(1000, this.rightUi.show, this.rightUi);
	    TweenUtils.delayedCall(2000, () => {
	        this.isPaused = false;
	        // INITS
            this.nextSpawn = 2;
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

    private onTouch() {
        if (this.gameEnded) return;
        if (this.isPaused) return;
        let pres = this.findPresentInRadius(90);
        if (pres !== null) {
            pres.find();
            TweenUtils.delayedCall(1100, this.rightUi.update, this.rightUi);
            for (let i = 0; i < this.presentArr.length; i++) {
                if (this.presentArr[i] === pres) {
                    this.presentArr.splice(i, 1);
                    return;
                }
            }
            return;
        }
        if (this.selectedWeapon === WeaponType.FINGER) {
            this.rightUi.disable();
            this.finger.smash(new Phaser.Point(this.game.input.x, this.game.input.y), () => {
                this.rightUi.enable();
                if (SoundUtils.isSoundEnabled())
                    SoundUtils.playFX('Fing');
                TweenUtils.delayedCall(50, () => {
                    this.shake(25, 2);
                }, this);
                let boss = this.findBossInRadius(90);
                if (boss === null) {
                    let mob = this.findMobInRadius(70);
                    if (mob === null) {
                        this.finger.processMob(mob);
                    }
                    else {
                        const isDead = mob.makeDamage(this.selectedWeapon);
                        if (isDead) {
                            TweenUtils.delayedCall(2000, () => {
                                this.addPoints(mob.getReward());
                                mob.fadeOut();
                                TweenUtils.delayedCall(500, () => {
                                    mob.dispose();
                                    mob = null;
                                }, this);
                            }, this);
                        }
                        this.finger.processMob(mob);
                    }
                } else {
                    const isDead = boss.makeDamage(this.selectedWeapon);
                    if (isDead) {
                        TweenUtils.delayedCall(2000, () => {
                            this.addPoints(boss.getReward());
                            boss.fadeOut();
                            TweenUtils.delayedCall(500, () => {
                                boss.dispose();
                                boss = null;
                            }, this);
                        }, this);
                    }
                    this.finger.processMob(boss);
                }
            }, this);
        }
        else if (this.selectedWeapon === WeaponType.GFINGER) {
            GameConfig.PLAYER_DATA.reduceWeapon(WeaponType.GFINGER);
            this.rightUi.disable();
            this.gfinger.smash(new Phaser.Point(this.game.input.x, this.game.input.y), () => {
                this.rightUi.enable();
                if (SoundUtils.isSoundEnabled())
                    SoundUtils.playFX('Gfing');
                TweenUtils.delayedCall(50, () => {
                    this.shake(25, 2);
                }, this);
                let boss = this.findBossInRadius(90);
                if (boss === null) {
                    let mob = this.findMobInRadius(70);
                    if (mob === null) {
                        this.gfinger.processMob(mob);
                    }
                    else {
                        const isDead = mob.makeDamage(this.selectedWeapon);
                        if (isDead) {
                            this.addPoints(mob.getReward());
                            TweenUtils.delayedCall(2000, () => {
                                mob.fadeOut();
                                TweenUtils.delayedCall(500, () => {
                                    mob.dispose();
                                    mob = null;
                                }, this);
                            }, this);
                        }
                        this.gfinger.processMob(mob);
                    }
                } else {
                    const isDead = boss.makeDamage(this.selectedWeapon);
                    if (isDead) {
                        this.addPoints(boss.getReward());
                        TweenUtils.delayedCall(2000, () => {
                            boss.fadeOut();
                            TweenUtils.delayedCall(500, () => {
                                boss.dispose();
                                boss = null;
                            }, this);
                        }, this);
                    }
                    this.gfinger.processMob(boss);
                }
            }, this);
        }
        else if (this.selectedWeapon === WeaponType.SLIPPER) {
            GameConfig.PLAYER_DATA.reduceWeapon(WeaponType.SLIPPER);
            this.rightUi.disable();
            this.slipper.smash(new Phaser.Point(this.game.input.x, this.game.input.y), () => {
                this.rightUi.enable();
                if (SoundUtils.isSoundEnabled())
                    SoundUtils.playFX('Slipper');
                TweenUtils.delayedCall(50, () => {
                    this.shake(25, 2);
                }, this);
                let boss = this.findBossInRadius(90);
                if (boss === null) {
                    //
                } else {
                    const isDead = boss.makeDamage(this.selectedWeapon);
                    if (isDead) {
                        this.addPoints(boss.getReward());
                        TweenUtils.delayedCall(2000, () => {
                            boss.fadeOut();
                            TweenUtils.delayedCall(500, () => {
                                boss.dispose();
                                boss = null;
                            }, this);
                        }, this);
                    }
                    this.finger.processMob(boss);
                }
                let mobs = this.findMobsInRadius(150, 3);
                if (0 === mobs.length) {
                    this.slipper.processMob(mobs);
                }
                else {
                    for (let m of mobs) {
                        const isDead = m.makeDamage(this.selectedWeapon);
                        if (isDead) {
                            this.addPoints(m.getReward());
                            TweenUtils.delayedCall(2000, () => {
                                m.fadeOut();
                                TweenUtils.delayedCall(500, () => {
                                    m.dispose();
                                    m = null;
                                }, this);
                            }, this);
                        }
                    }
                    this.slipper.processMob(mobs);
                }
            }, this);
        }
        else if (this.selectedWeapon === WeaponType.CHALK && !this.chalk.activated) {
            GameConfig.PLAYER_DATA.reduceWeapon(WeaponType.CHALK);
            this.rightUi.disable();
            this.chalk.activate();
            this.chalk.onEndDraw.addOnce(() => {
                this.rightUi.enable();
                /*TweenUtils.delayedCall(2000, () => {
                    let delay: number = 0;
                    for (let c of this.chalkContainer.children) {
                        TweenUtils.fadeAndScaleOut(c, 200, delay, () => {
                            (c as Phaser.Sprite).destroy(true);
                            this.chalkContainer.remove((c as Phaser.Sprite));
                            c = null;
                        }, this);
                        delay += 30;
                    }
                }, this);*/
            }, this);
        }
        else if (this.selectedWeapon === WeaponType.POISON && !this.poison.activated) {
            GameConfig.PLAYER_DATA.reduceWeapon(WeaponType.POISON);
            this.rightUi.disable();
            this.poison.activate();
            this.poison.onEndDrop.addOnce((point: Phaser.Point) => {
                this.rightUi.enable();
                const item = this.table.addPoisonToRandomItem(point);
                this.poisonedFood.push(item);
            }, this);
        }
        else if (this.selectedWeapon === WeaponType.SPRAY && !this.spray.activated) {
            GameConfig.PLAYER_DATA.reduceWeapon(WeaponType.SPRAY);
            this.rightUi.disable();
            this.spray.activate();
            this.spray.onEnd.addOnce(() => {
                this.rightUi.enable();
            }, this);
            this.spray.onKill.add(() => {
                if (this.boss !== null) {
                    if (this.isBossInRadius(this.boss, 180)) {
                        const isDead = this.boss.makeDamage(this.selectedWeapon);
                        if (isDead) {
                            this.addPoints(this.boss.getReward());
                            TweenUtils.delayedCall(2000, () => {
                                this.boss.fadeOut();
                                TweenUtils.delayedCall(500, () => {
                                    this.boss.dispose();
                                    this.boss = null;
                                }, this);
                            }, this);
                        }
                    }
                }
                for (let m of this.mobs) {
                    if (m === null || m.isDead())
                        continue;
                    if (this.isInRadius(m, 180)) {
                        const isDead = m.makeDamage(this.selectedWeapon);
                        if (isDead) {
                            this.addPoints(m.getReward());
                            TweenUtils.delayedCall(2000, () => {
                                m.fadeOut();
                                TweenUtils.delayedCall(500, () => {
                                    m.dispose();
                                    m = null;
                                }, this);
                            }, this);
                        }
                    }
                }
            }, this);
        }
        this.rightUi.update();
    }

    private addPoints(val: number) {
        this.topUi.addPoints(val);
    }

    public render(): void {
        // this.game.debug.cameraInfo(this.game.camera, 32, 32);
    }

    public update(): void {
        super.update(this.game);
        if (this.isPaused) return;
        if (this.gameEnded) return;
        this.currentTime++;
        if (!this.engagingBoss)
            this.topUi.setTime(parseInt((this.levelData.duration - this.currentTime / 60).toString()));
        else {
            this.topUi.setTime(0);
        }
        if (this.currentTime >= this.levelData.duration * 60 && !this.engagingBoss) {
            if (this.levelData.boss !== null) {
                this.engagingBoss = true;
                this.addBoss();
                SoundUtils.play('BossTheme');
            }
            else {
                this.winGame();
                return;
            }
        }
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
        this.chalk.update(); // for more smooth lines
        // DELAYER to IMPROVE PERFORMANCE
        if (this.currentTime % 2 !== 0) return;
        // END
        this.finger.update();
        this.gfinger.update();
        this.slipper.update();
        this.spray.update();
        this.presentDelay--;
        if (GameConfig.PLAYER_DATA.dropIsPossible() && this.levelData.presentMax > this.presents && this.presentDelay < 0) {
            if (this.levelData.presentChance >= this.game.rnd.between(1, 1000)) {
                this.presentDelay = 100;
                this.presents++;
                const pres = new Present(this.presentContainer, this.game.rnd.between(80, 460), this.game.rnd.between(230, 210 + 650 - 140));
                pres.onClick.addOnce(() => {
                    console.log('GET');
                }, this);
                this.presentArr.push(pres);
            }
        }
        if (this.currentTime >= this.nextSpawn) {
            const triple = this.game.rnd.between(0, 100) < this.levelData.tripleSpawn;
            const double = this.game.rnd.between(0, 100) < this.levelData.doubleSpawn;
            if (triple) {
                this.addMob();
                this.addMob();
                this.addMob();
            }
            else if (double) {
                this.addMob();
                this.addMob();
            }
            else {
                this.addMob();
            }
            this.nextSpawn = this.currentTime + this.game.rnd.between(this.levelData.minSpawn, this.levelData.maxSpawn) * 2;
        }
        if (this.engagingBoss && this.boss !== null) {
            if (this.boss !== null && !this.boss.isDead()) {
                this.boss.update();
                if (this.boss.getY() > 705) {
                    this.table.eatAllFood();
                }
            }
        }
        for (let m of this.mobs) {
            if (m === null || m.isDead())
                continue;
            m.update();
            if (m.getY() > 805) {
                if (m.getType() === MonsterType.LARVA) {
                    m.kill();
                }
                else {
                    m.dispose();
                    this.table.eatFood();
                }
            }
        }
        if (this.currentTime % 10 === 0 && this.chalkContainer.children.length > 0) {
            let qqq = 0;
            for (let c of this.chalkContainer.children) {
                qqq++;
                if (3 === qqq) {
                    qqq = 0;
                    continue;
                }
                if (this.boss !== null && !this.boss.isDead() && !this.boss.isChalked()) {
                    if (this.isInRadiusFromChalk(this.boss, c as Phaser.Sprite, 50)) {
                        const isDead = this.boss.makeDamage(this.selectedWeapon);
                        if (isDead) {
                            TweenUtils.delayedCall(2000, () => {
                                this.addPoints(this.boss.getReward());
                                this.boss.fadeOut();
                                TweenUtils.delayedCall(500, () => {
                                    this.boss.dispose();
                                    this.boss = null;
                                }, this);
                            }, this);
                        }
                    }
                }
                for (let m of this.mobs) {
                    if (m === null || m.isDead() || m.isChalked())
                        continue;
                    if (this.isInRadiusFromChalk(m, c as Phaser.Sprite, 50)) {
                        const isDead = m.makeDamage(this.selectedWeapon);
                        if (isDead) {
                            this.addPoints(m.getReward());
                            TweenUtils.delayedCall(2000, () => {
                                m.fadeOut();
                                TweenUtils.delayedCall(500, () => {
                                    m.dispose();
                                    m = null;
                                }, this);
                            }, this);
                        }
                    }
                }
            }
        }
        for (let f of this.poisonedFood) {
            if (f === null || isUndefined(f))
                continue;
            if (f.isPoisoned()) {
                f.update();
                if (this.boss && !this.boss.isDead() && !this.boss.isPoisoned()) {
                    if (this.isInRadiusFromPoison(this.boss, f, 100)) {
                        const isDead = this.boss.makeDamage(this.selectedWeapon);
                        if (isDead) {
                            TweenUtils.delayedCall(2000, () => {
                                this.addPoints(this.boss.getReward());
                                this.boss.fadeOut();
                                TweenUtils.delayedCall(500, () => {
                                    this.boss.dispose();
                                    this.boss = null;
                                }, this);
                            }, this);
                        }
                    }
                }
                for (let m of this.mobs) {
                    if (m === null || m.isDead() || m.isPoisoned())
                        continue;
                    if (this.isInRadiusFromPoison(m, f, 100)) {
                        const isDead = m.makeDamage(this.selectedWeapon);
                        if (isDead) {
                            this.addPoints(m.getReward());
                            TweenUtils.delayedCall(2000, () => {
                                m.fadeOut();
                                TweenUtils.delayedCall(500, () => {
                                    m.dispose();
                                    m = null;
                                }, this);
                            }, this);
                        }
                    }
                }
            }
            else {
                f = null;
            }
        }
        // clear
        for (let i = this.mobs.length - 1; i >= 0; i--) {
            if (isUndefined(this.mobs[i]) || this.mobs[i] === null || this.mobs[i].container === null || this.mobs[i].isDead()) {
                this.mobs.splice(i, 1);
            }
        }
        for (let i = this.poisonedFood.length - 1; i >= 0; i--) {
            if (isUndefined(this.poisonedFood[i]) || this.poisonedFood[i] === null || this.poisonedFood[i].container === null || !this.poisonedFood[i].isPoisoned()) {
                this.poisonedFood.splice(i, 1);
            }
        }
        for (let i = this.chalkContainer.children.length - 1; i >= 0; i--) {
            if (isUndefined(this.chalkContainer.children[i]) || this.chalkContainer.children[i] === null) {
                this.chalkContainer.children.splice(i, 1);
            }
        }
    }

    private addMob() {
        const mb = new Mob(
            this.mobContainer,
            this.levelData.mobs[this.game.rnd.between(0, this.levelData.mobs.length - 1)],
            this.lanes[this.game.rnd.between(0, this.lanes.length - 1)], -100);
        if (mb.getType() === MonsterType.LARVA) {
            mb.onDead.addOnce(this.larvaBlowed, this);
        }
        this.mobs.push(mb);
    }

    private addBoss() {
        this.boss = new Boss(
            this.bossContainer,
            this.levelData.boss,
            this.lanes[this.game.rnd.between(0, this.lanes.length - 1)], -100);
        this.boss.onDead.addOnce(this.bossWins, this);
    }

    private bossWins(point: Phaser.Point) {
        this.winGame();
    }

    private larvaBlowed(point: Phaser.Point) {
        if (point.y > 635) {
            this.table.eatFood();
            this.table.eatFood();
            this.table.eatFood();
        }
    }

    private findMobInRadius(raduis: number): Mob {
        /*if ((this.distanceFromMob(this.boss) <= raduis) && !this.boss.isDead() && this.boss.container !== null) {
            return this.boss;
        }*/
        for (let m of this.mobs) {
            if ((this.distanceFromMob(m) <= raduis) && !m.isDead() && m.container !== null) {
                return m;
            }
        }
        return null;
    }

    private findBossInRadius(raduis: number): Boss {
        if (this.boss === null) return null;
        if ((this.distanceFromBoss(this.boss) <= raduis) && !this.boss.isDead() && this.boss.container !== null) {
            return this.boss;
        }
        return null;
    }

    private findPresentInRadius(raduis: number): Present {
        for (let m of this.presentArr) {
            if ((this.distanceFromPresent(m) <= raduis) && !m.founded && m.container !== null) {
                return m;
            }
        }
        return null;
    }

    private findMobsInRadius(raduis: number, count: number): Mob[] {
        let mobs: Mob[] = [];
        for (let m of this.mobs) {
            if ((this.distanceFromMob(m) <= raduis) && !m.isDead() && m.container !== null) {
                mobs.push(m);
            }
            if (mobs.length === count) break;
        }
        return mobs;
    }

    private isInRadius(m: Mob, raduis: number): boolean {
        return this.distanceFromSpray(m) <= raduis;
    }

    private isBossInRadius(m: Boss, raduis: number): boolean {
        return this.distanceFromSpray(m) <= raduis;
    }

    private isInRadiusFromPoison(m: Mob|Boss, f: FoodItem, raduis: number): boolean {
        return this.distanceFromPoison(m, f) <= raduis;
    }

    private isInRadiusFromChalk(m: Mob|Boss, f: Phaser.Sprite, raduis: number): boolean {
        return this.distanceFromSprite(m, f) <= raduis;
    }

    private distanceFromMob(mob: Mob): number {
        let xs = mob.getX() - this.selectedEObject.getSmashPosition().x;
        let ys = mob.getY() - this.selectedEObject.getSmashPosition().y - 5;
        xs *= xs;
        ys *= ys;
        return Math.sqrt( xs + ys );
    }

    private distanceFromPresent(mob: Present): number {
        let xs = mob.container.x - this.game.input.x;
        let ys = mob.container.y - this.game.input.y;
        xs *= xs;
        ys *= ys;
        return Math.sqrt( xs + ys );
    }

    private distanceFromBoss(mob: Boss): number {
        let xs = mob.getX() - this.selectedEObject.getSmashPosition().x;
        let ys = mob.getY() - this.selectedEObject.getSmashPosition().y - 5;
        xs *= xs;
        ys *= ys;
        return Math.sqrt( xs + ys );
    }

    private distanceFromSpray(mob: Mob|Boss): number {
        let xs = mob.getX() - this.spray.getSprayCenter().x;
        let ys = mob.getY() - this.spray.getSprayCenter().y;
        xs *= xs;
        ys *= ys;
        return Math.sqrt( xs + ys );
    }

    private distanceFromPoison(mob: Mob|Boss, f: FoodItem): number {
        let xs = mob.getX() - f.getPoisonPosition().x;
        let ys = mob.getY() - f.getPoisonPosition().y;
        xs *= xs;
        ys *= ys;
        return Math.sqrt( xs + ys );
    }

    private distanceFromSprite(mob: Mob|Boss, f: Phaser.Sprite): number {
        let xs = mob.getX() - f.x;
        let ys = mob.getY() - f.y;
        xs *= xs;
        ys *= ys;
        return Math.sqrt( xs + ys );
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

    private looseGame() {
        this.gameEnded = true;
        this.NEXT = 'Fail';
        TweenUtils.delayedCall(500, this.nextState, this);
    }

    private winGame() {
        this.gameEnded = true;
        this.NEXT = 'Win';
        const foods = this.table.getRecentFood();
        let delay: number = 0;
        for (let f of foods) {
            TweenUtils.delayedCall(delay, () => {
                f.hide();
                if (SoundUtils.isSoundEnabled())
                    SoundUtils.playFX('Coins');
                this.addPoints(30 + ((GameConfig.SELECTED_LVL - 1) * 7) + ((GameConfig.SELECTED_STAGE - 1) * 3));
            }, this);
            delay += 250;
        }
        TweenUtils.delayedCall(delay, this.nextState, this);
    }

    public shutdown(): void {
        this.game.time.events.removeAll();
        this.game.tweens.removeAll();
        if (this.bg) this.bg.destroy(true);
        if (this.touch) this.touch.destroy(true);
        if (this.rightUi) this.rightUi.dispose();
        if (this.topUi) this.topUi.dispose();
        if (this.table) this.table.dispose();
        for (let m of this.mobs) {
            m.dispose();
        }
        this.finger.dispose();
        this.gfinger.dispose();
        this.slipper.dispose();
        this.chalk.dispose();
        this.poison.dispose();
        this.spray.dispose();
        this.pauseWin.dispose();
        this.quitWin.dispose();
        this.presentContainer.removeAll(true);
        this.mobContainer.removeAll(true);
        this.chalkContainer.removeAll(true);
        this.bossContainer.removeAll(true);
        if (this.presentContainer) this.presentContainer.destroy(true);
        if (this.mobContainer) this.mobContainer.destroy(true);
        if (this.chalkContainer) this.chalkContainer.destroy(true);
        if (this.bossContainer) this.bossContainer.destroy(true);
        this.container.removeAll(true);
        if (this.container) this.container.destroy(true);
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
            if ('Win' === this.NEXT)
                GameConfig.PLAYER_DATA.unlockNext();
            this.game.state.start(this.NEXT, false, false, this.topUi.getPoints());
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


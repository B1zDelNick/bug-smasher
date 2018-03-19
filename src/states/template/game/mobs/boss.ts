import {GameConfig, MonsterType, WeaponType} from '../../../../config/game.config';
import {MobData} from '../../../../data/mob.data';
import {GuiUtils} from '../../../../utils/gui.utils';
import {ImageUtils} from '../../../../utils/images/image.utils';
import {TweenUtils} from '../../../../utils/tween.utils';
import {EffectUtils} from '../../../../utils/effect.utils';
import {Mob} from './mob';
import {SoundUtils} from '../../../../utils/sound/sound.utils';

export class Boss {

    private lanes: number[] = [54, 125, 206, 286, 384, 486];
    private data: MobData;
    private game: Phaser.Game = null;
    public container: Phaser.Group = null;
    private bug: Phaser.Sprite = null;
    private truba: Phaser.Sprite = null;
    private glass: Phaser.Sprite = null;
    private claws: Phaser.Sprite = null;
    private lhand: Phaser.Sprite = null;
    private rhand: Phaser.Sprite = null;
    private lus: Phaser.Sprite = null;
    private rus: Phaser.Sprite = null;
    private splash: Phaser.Sprite = null;
    private bound: Phaser.Graphics = null;
    private isJumping: boolean = true;
    private isBerserk: boolean = false;
    private jumpingAv: number = 0;
    private hp: number = 0;
    private slower: number = 0;
    private poisoned: number = 0;
    private chalked: number = 0;
    private jumpDelation: number = 85;
    public onClick: Phaser.Signal = new Phaser.Signal();
    public onDead: Phaser.Signal = new Phaser.Signal();

    constructor(parent: Phaser.Group, data: MobData, x: number, y: number) {
        this.game = GameConfig.GAME;
        this.data = data;
        this.hp = data.hp;
        this.container = this.game.add.group();
        //
        this.truba = this.game.add.sprite(-55, 110,
            ImageUtils.getAtlasClass('AtlasesBoss').getName(),
            ImageUtils.getAtlasClass('AtlasesBoss').Frames.Truba,
            this.container
        );
        GuiUtils.centrizeCustom(this.truba, .05, .05);
        this.truba.position.setTo(-3, 169);
        this.truba.angle = -2;
        EffectUtils.makeLightRotateAnimation(this.truba, 550, 2);
        //
        this.lhand = this.game.add.sprite(-55, 110,
            ImageUtils.getAtlasClass('AtlasesBoss').getName(),
            ImageUtils.getAtlasClass('AtlasesBoss').Frames.LHand,
            this.container
        );
        GuiUtils.centrizeCustom(this.lhand, .95, .15);
        this.lhand.position.setTo(-55, 110);
        EffectUtils.makeLightRotateAnimation(this.lhand, 400, 3);
        this.rhand = this.game.add.sprite(-55, 110,
            ImageUtils.getAtlasClass('AtlasesBoss').getName(),
            ImageUtils.getAtlasClass('AtlasesBoss').Frames.RHand,
            this.container
        );
        GuiUtils.centrizeCustom(this.rhand, .05, .15);
        this.rhand.position.setTo(55, 110);
        EffectUtils.makeLightRotateAnimation(this.rhand, 500, -3);
        //
        this.claws = this.game.add.sprite(-55, 110,
            ImageUtils.getAtlasClass('AtlasesBoss').getName(),
            ImageUtils.getAtlasClass('AtlasesBoss').Frames.Claws,
            this.container
        );
        GuiUtils.centrizeCustom(this.claws, .5, .4);
        this.claws.position.setTo(1, 172);
        this.claws.angle = -3;
        EffectUtils.makeLightRotateAnimation(this.claws, 150, 3);
        //
        this.bug = this.game.add.sprite(0, 0,
            ImageUtils.getAtlasClass('AtlasesBoss').getName(),
            ImageUtils.getAtlasClass('AtlasesBoss').Frames.Body,
            this.container
        );
        GuiUtils.centrize(this.bug);
        this.bug.position.setTo(0, 0);
        ////
        this.lus = this.game.add.sprite(-55, 110,
            ImageUtils.getAtlasClass('AtlasesBoss').getName(),
            ImageUtils.getAtlasClass('AtlasesBoss').Frames.LUs,
            this.container
        );
        GuiUtils.centrizeCustom(this.lus, .99, .96);
        this.lus.position.setTo(-7, 167);
        EffectUtils.makeLightRotateAnimation(this.lus, 700, 2);
        this.rus = this.game.add.sprite(-55, 110,
            ImageUtils.getAtlasClass('AtlasesBoss').getName(),
            ImageUtils.getAtlasClass('AtlasesBoss').Frames.RUs,
            this.container
        );
        GuiUtils.centrizeCustom(this.rus, .01, .96);
        this.rus.position.setTo(7, 167);
        EffectUtils.makeLightRotateAnimation(this.rus, 650, -2.2);
        //
        this.glass = this.game.add.sprite(-44, 108,
            ImageUtils.getAtlasClass('AtlasesBoss').getName(),
            ImageUtils.getAtlasClass('AtlasesBoss').Frames.Glass,
            this.container
        );
        /*this.splash = this.game.add.sprite(0, 0,
            ImageUtils.getAtlasClass('AtlasesMobs').getName(),
            ImageUtils.getAtlasClass('AtlasesMobs').Frames[data.type + data.level + 'Inner'],
            this.container
        );
        this.splash.angle = this.game.rnd.between(0, 360);
        GuiUtils.centrize(this.splash);
        this.splash.position.setTo(0, 0);
        this.splash.alpha = 0;*/
        this.bound = GuiUtils.makeRectangle(0, 0, 90, 110, 0);
        this.container.add(this.bound);
        this.bound.alpha = 0;
        this.bound.inputEnabled = true;
        this.bound.events.onInputDown.add(() => {
            this.onClick.dispatch(this);
        }, this);
        GuiUtils.centrize(this.bound);
        this.bound.position.setTo(-this.bound.width / 2, -this.bound.height / 2);
        this.container.position.setTo(x, y);
        parent.add(this.container);
    }

    public makeDamage(weapon: WeaponType): boolean {
        this.slower = 30;
        if (weapon === WeaponType.POISON) {
            this.poisoned = 40;
            this.hp--;
            this.hp--;
            this.hp--;
            this.hp--;
            this.hp--;
        }
        if (weapon === WeaponType.CHALK) {
            this.chalked = 40;
            this.hp--;
            this.hp--;
            this.hp--;
        }
        if (weapon === WeaponType.SLIPPER) {
            this.chalked = 90;
            this.hp--;
            this.hp--;
            this.hp--;
        }
        if (weapon === WeaponType.GFINGER) {
            this.chalked = 40;
            this.hp--;
            this.hp--;
            this.hp--;
            this.hp--;
        }
        if (weapon === WeaponType.FINGER) {
            this.chalked = 40;
            this.hp--;
        }
        if (weapon === WeaponType.SPRAY) {
            this.chalked = 40;
            this.hp--;
            this.hp--;
            this.hp--;
        }
        if (0 >= this.hp) {
            if (SoundUtils.isSoundEnabled())
                SoundUtils.playFX('BossKilled');
            this.onDead.dispatch(new Phaser.Point(this.container.x, this.container.y));
            this.bound.inputEnabled = false;
            TweenUtils.kill(this.container);
            TweenUtils.kill(this.container.scale);
            /*TweenUtils.fadeAndScaleOut(this.bug, 200);
            TweenUtils.fadeAndScaleIn(this.splash, 300);*/
            return true;
        }
        else {
            TweenUtils.damageBoss(this.container);
        }
        return false;
    }

    public isDead(): boolean {
        return 0 >= this.hp;
    }

    public getY(): number {
        if (this.container !== null)
            return this.container.y;
    }

    public getX(): number {
        if (this.container !== null)
            return this.container.x;
    }

    public getType(): MonsterType {
        return this.data.type;
    }

    public fadeOut() {
        if (this.container !== null)
            TweenUtils.fadeAndScaleOut(this.container, 200);
    }

    public getReward(): number {
        return this.data.reward;
    }

    public kill() {
        this.hp = -1;
        this.bound.inputEnabled = false;
        TweenUtils.kill(this.container);
        TweenUtils.kill(this.container.scale);
        TweenUtils.fadeAndScaleOut(this.bug, 200);
        TweenUtils.fadeAndScaleIn(this.splash, 300, 0, () => {
            if (this.getType() === MonsterType.LARVA) {
                this.onDead.dispatch(new Phaser.Point(this.container.x, this.container.y));
            }
        }, this);
        TweenUtils.delayedCall(1000, () => {
            this.fadeOut();
            TweenUtils.delayedCall(300, this.dispose, this);
        }, this);
    }

    public update() {
        if (this.hp === 0) {
            return;
        }
        this.jumpingAv++;
        if (this.jumpingAv === this.jumpDelation) {
            this.isJumping = false;
        }
        this.poisoned--;
        this.chalked--;
        this.slower -= 3;
        if (1 > this.slower) this.slower = 1;
        this.container.y += this.data.speed / this.slower * (this.isBerserk ? 1.7 : 1);
        if (!this.isJumping) {
            const jump = this.game.rnd.between(1, 100);
            if (this.data.jump >= jump) {
                this.isJumping = true;
                if (this.data.type === MonsterType.FLY || this.data.type === MonsterType.WASP) {
                    let newX: number = -1;
                    for (let i = 0; i < this.lanes.length; i++) {
                        if (this.lanes[i] === this.container.x) {
                            if (i === 0) {
                                newX = this.lanes[i + 1];
                            }
                            else if (i === this.lanes.length - 1) {
                                newX = this.lanes[i - 1];
                            }
                            else {
                                if (this.game.rnd.between(0, 100) > 50) {
                                    newX = this.lanes[i + 1];
                                }
                                else {
                                    newX = this.lanes[i - 1];
                                }
                            }
                        }
                    }
                    TweenUtils.moveXAndScaleInOut(this.container, newX, 1.25, 500, 0, () => {
                        this.jumpingAv = 0;
                    }, this);
                }
                else if (this.data.type === MonsterType.COC) {
                    let newX: number = -1;
                    for (let i = 0; i < this.lanes.length; i++) {
                        if (this.lanes[i] === this.container.x) {
                            if (i === 0) {
                                newX = this.lanes[i + 1];
                            }
                            else if (i === this.lanes.length - 1) {
                                newX = this.lanes[i - 1];
                            }
                            else {
                                if (this.game.rnd.between(0, 100) > 50) {
                                    newX = this.lanes[i + 1];
                                }
                                else {
                                    newX = this.lanes[i - 1];
                                }
                            }
                        }
                    }
                    if (newX > this.container.x) {
                        TweenUtils.moveXAndRotateScaleInOut(this.container, newX, 1, -25, 3, 750, 0, () => {
                            this.jumpingAv = 0;
                        }, this);
                    }
                    else {
                        TweenUtils.moveXAndRotateScaleInOut(this.container, newX, 1, 25, 3, 750, 0, () => {
                            this.jumpingAv = 0;
                        }, this);
                    }
                }
            }
        }
    }

    public isPoisoned(): boolean {
        return this.poisoned > 0;
    }

    public isChalked(): boolean {
        return this.chalked > 0;
    }

    public dispose() {
        if (this.container !== null) {
            this.container.removeAll(true, true, true);
            this.container.destroy(true);
            this.onClick.dispose();
            this.container = null;
        }
    }
}
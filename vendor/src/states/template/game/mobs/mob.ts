import {GameConfig, MonsterType, WeaponType} from '../../../../config/game.config';
import {MobData} from '../../../../data/mob.data';
import {GuiUtils} from '../../../../utils/gui.utils';
import {ImageUtils} from '../../../../utils/images/image.utils';
import {TweenUtils} from '../../../../utils/tween.utils';

export class Mob {

    private lanes: number[] = [54, 125, 206, 286, 384, 486];
    private data: MobData;
    private game: Phaser.Game = null;
    private container: Phaser.Group = null;
    private bug: Phaser.Sprite = null;
    private splash: Phaser.Sprite = null;
    private bound: Phaser.Graphics = null;
    private isJumping: boolean = true;
    private jumpingAv: number = 0;
    private hp: number = 0;
    private slower: number = 0;
    public onClick: Phaser.Signal = new Phaser.Signal();

    constructor(parent: Phaser.Group, data: MobData, x: number, y: number) {
        this.game = GameConfig.GAME;
        this.data = data;
        this.hp = data.hp;
        this.container = this.game.add.group();
        this.bug = this.game.add.sprite(0, 0,
            ImageUtils.getAtlasClass('AtlasesMobs').getName(),
            ImageUtils.getAtlasClass('AtlasesMobs').Frames[data.type + data.level],
            this.container
        );
        GuiUtils.centrize(this.bug);
        this.bug.position.setTo(0, 0);
        this.splash = this.game.add.sprite(0, 0,
            ImageUtils.getAtlasClass('AtlasesMobs').getName(),
            ImageUtils.getAtlasClass('AtlasesMobs').Frames[data.type + data.level + 'Inner'],
            this.container
        );
        this.splash.angle = this.game.rnd.between(0, 360);
        GuiUtils.centrize(this.splash);
        this.splash.position.setTo(0, 0);
        this.splash.alpha = 0;
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
        this.slower = 100;
        this.hp--;
        if (0 >= this.hp) {
            this.bound.inputEnabled = false;
            TweenUtils.kill(this.container);
            TweenUtils.kill(this.container.scale);
            TweenUtils.fadeAndScaleOut(this.bug, 200);
            TweenUtils.fadeAndScaleIn(this.splash, 300);
            return true;
        }
        return false;
    }
    
    public isDead(): boolean {
        return 0 >= this.hp;
    }

    public getY(): number {
        return this.container.y;
    }

    public getX(): number {
        return this.container.x;
    }

    public getType(): MonsterType {
        return this.data.type;
    }

    public fadeOut() {
        TweenUtils.fadeAndScaleOut(this.container, 200);
    }

    public update() {
        if (this.hp === 0) {
            return;
        }
        this.jumpingAv++;
        if (this.jumpingAv === 300) {
            this.isJumping = false;
        }
        this.slower -= 3;
        if (1 > this.slower) this.slower = 1
        this.container.y += this.data.speed / this.slower;
        if (!this.isJumping) {
            const jump = this.game.rnd.between(1, 100);
            if (jump < this.data.jump) {
                this.isJumping = true;
                if (this.data.type === MonsterType.FLY) {
                    let newX: number = -1;
                    /*while (newX === this.container.x) {
                        newX = this.lanes[this.game.rnd.between(0, this.lanes.length - 1)];
                    }*/
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
            }
        }
    }

    public dispose() {
        this.container.destroy(true);
        this.onClick.dispose();
    }
}
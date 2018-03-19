import {GameConfig, WeaponType} from '../../../../config/game.config';
import {GuiUtils} from '../../../../utils/gui.utils';
import {ImageUtils} from '../../../../utils/images/image.utils';
import {TweenUtils} from '../../../../../vendor/src/utils/tween.utils';

export class Present {

    private game: Phaser.Game = null;
    public container: Phaser.Group = null;
    private base: Phaser.Sprite = null;
    private weap: Phaser.Sprite[] = [];
    private bound: Phaser.Graphics = null;
    public founded: boolean = false;
    public dropType: WeaponType = null;

    public onClick: Phaser.Signal = new Phaser.Signal();

    constructor(parent: Phaser.Group, x: number, y: number) {
        this.game = GameConfig.GAME;
        this.container = this.game.add.group();
        this.base = this.game.add.sprite(0, 0,
            ImageUtils.getAtlasClass('AtlasesStateLevel').getName(),
            ImageUtils.getAtlasClass('AtlasesStateLevel').Frames.Gift,
            this.container
        );
        GuiUtils.centrize(this.base);
        this.base.position.setTo(0, 0);
        this.base.scale.setTo(0);
        this.base.alpha = 0;
        this.bound = GuiUtils.makeRectangle(0, 0, 90, 90, 0);
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
        this.game.add.tween(this.base).to({ alpha: 1 }, 400, Phaser.Easing.Linear.None, true, 0);
        this.game.add.tween(this.base.scale).to({ x: 1, y: 1 }, 400 * 2, Phaser.Easing.Elastic.Out, true, 0);
    }

    find() {
        if (this.founded) return;
        this.founded = true;
        this.game.add.tween(this.base).to({ alpha: 0 }, 250, Phaser.Easing.Circular.In, true, 0);
        this.game.add.tween(this.base.scale).to({ x: 0, y: 0 }, 250, Phaser.Easing.Circular.In, true, 0);
        const poss = GameConfig.PLAYER_DATA.getPossibleDrop();
        for (let i = 0; i < 1; i++) {
            this.dropType = poss[this.game.rnd.between(0, poss.length - 1)];
            switch (this.dropType) {
                case WeaponType.SLIPPER: {
                    const w = this.game.add.sprite(0, 0,
                        ImageUtils.getAtlasClass('AtlasesWeaponSlipper').getName(),
                        ImageUtils.getAtlasClass('AtlasesWeaponSlipper').Frames.Base,
                        this.container
                    );
                    w.scale.setTo(.2);
                    GuiUtils.centrize(w);
                    w.position.setTo(0, 0);
                    this.game.add.tween(w).to({ x: 540, y: 960, alpha: 0 }, 2000, Phaser.Easing.Linear.None, true, 0);
                    this.game.add.tween(w.scale).to({ x: 1, y: 1 }, 2000, Phaser.Easing.Linear.None, true, 0)
                        .onComplete.addOnce(this.dispose, this);
                    break;
                }
                case WeaponType.CHALK: {
                    const w = this.game.add.sprite(0, 0,
                        ImageUtils.getAtlasClass('AtlasesWeaponChalk').getName(),
                        ImageUtils.getAtlasClass('AtlasesWeaponChalk').Frames.Base,
                        this.container
                    );
                    w.scale.setTo(.2);
                    GuiUtils.centrize(w);
                    w.position.setTo(0, 0);
                    this.game.add.tween(w).to({ x: 540, y: 960, alpha: 0 }, 2000, Phaser.Easing.Linear.None, true, 0);
                    this.game.add.tween(w.scale).to({ x: 1, y: 1 }, 2000, Phaser.Easing.Linear.None, true, 0)
                        .onComplete.addOnce(this.dispose, this);
                    break;
                }
                case WeaponType.POISON: {
                    const w = this.game.add.sprite(0, 0,
                        ImageUtils.getAtlasClass('AtlasesWeaponPoison').getName(),
                        ImageUtils.getAtlasClass('AtlasesWeaponPoison').Frames.Base,
                        this.container
                    );
                    w.scale.setTo(.2);
                    GuiUtils.centrize(w);
                    w.position.setTo(0, 0);
                    this.game.add.tween(w).to({ x: 540, y: 960, alpha: 0 }, 2000, Phaser.Easing.Linear.None, true, 0);
                    this.game.add.tween(w.scale).to({ x: 1, y: 1 }, 2000, Phaser.Easing.Linear.None, true, 0)
                        .onComplete.addOnce(this.dispose, this);
                    break;
                }
                case WeaponType.GFINGER: {
                    const w = this.game.add.sprite(0, 0,
                        ImageUtils.getAtlasClass('AtlasesWeaponGFinger').getName(),
                        ImageUtils.getAtlasClass('AtlasesWeaponGFinger').Frames.Base,
                        this.container
                    );
                    w.scale.setTo(.2);
                    GuiUtils.centrize(w);
                    w.position.setTo(0, 0);
                    this.game.add.tween(w).to({ x: 540, y: 960, alpha: 0 }, 2000, Phaser.Easing.Linear.None, true, 0);
                    this.game.add.tween(w.scale).to({ x: 1, y: 1 }, 2000, Phaser.Easing.Linear.None, true, 0)
                        .onComplete.addOnce(this.dispose, this);
                    break;
                }
                case WeaponType.SPRAY: {
                    const w = this.game.add.sprite(0, 0,
                        ImageUtils.getAtlasClass('AtlasesWeaponSpray').getName(),
                        ImageUtils.getAtlasClass('AtlasesWeaponSpray').Frames.Base,
                        this.container
                    );
                    w.scale.setTo(.2);
                    GuiUtils.centrize(w);
                    w.position.setTo(0, 0);
                    this.game.add.tween(w).to({ x: 740, y: 960, alpha: 0 }, 2000, Phaser.Easing.Linear.None, true, 0);
                    this.game.add.tween(w.scale).to({ x: 1, y: 1 }, 2000, Phaser.Easing.Linear.None, true, 0)
                        .onComplete.addOnce(this.dispose, this);
                    break;
                }
            }
        }
    }

    public dispose() {
        if (this.dropType !== null) {
            GameConfig.PLAYER_DATA.arsenal[this.dropType] = GameConfig.PLAYER_DATA.arsenal[this.dropType] + 3;
        }
        if (this.container !== null) {
            this.container.parent.removeChild(this.container);
            this.container.removeAll(true, true, true);
            this.container.destroy(true);
            this.onClick.dispose();
            this.container = null;
        }
    }
}
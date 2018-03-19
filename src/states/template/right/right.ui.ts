import {GameConfig, LOCALE, WeaponType} from '../../../config/game.config';
import {ImageUtils} from '../../../utils/images/image.utils';
import {GuiUtils} from '../../../utils/gui.utils';
import {TweenUtils} from '../../../utils/tween.utils';
import {isUndefined} from 'util';

export class RightUi {

    private game: Phaser.Game = null;
    private container: Phaser.Group = null;
    private panel: Phaser.Sprite = null;
    private icon: Phaser.Sprite = null;
    private count: Phaser.Sprite = null;
    private plus: Phaser.Sprite = null;
    private btn: Phaser.Graphics = null;

    public onChange: Phaser.Signal = new Phaser.Signal();
    private current = 0;

    constructor() {
        this.game = GameConfig.GAME;
        this.container = this.game.add.group();
        this.panel = this.game.add.sprite(379, 411,
            ImageUtils.getAtlasClass('AtlasesWeaponGui').getName(),
            ImageUtils.getAtlasClass('AtlasesWeaponGui').Frames.Panel,
            this.container
        );
        this.btn = GuiUtils.makeRectangle(400, 455, 200, 200, 0xffff00);
        this.container.add(this.btn);
        this.icon = this.game.add.sprite(414, 451,
            ImageUtils.getAtlasClass('AtlasesWeaponGui').getName(),
            ImageUtils.getAtlasClass('AtlasesWeaponGui').Frames[WeaponType.FINGER],
            this.container
        );
        this.btn.inputEnabled = true;
        /*this.btn.input.pixelPerfectAlpha = 10;
        this.btn.input.pixelPerfectClick = true;*/
        this.btn.events.onInputDown.add(this.change, this);
        this.count = this.game.add.sprite(435, 541,
            ImageUtils.getAtlasClass('AtlasesWeaponGui').getName(),
            ImageUtils.getAtlasClass('AtlasesWeaponGui').Frames['N' + GameConfig.PLAYER_DATA.arsenal[WeaponType.FINGER]],
            this.container
        );
        this.plus = this.game.add.sprite(485, 555,
            ImageUtils.getAtlasClass('AtlasesWeaponGui').getName(),
            ImageUtils.getAtlasClass('AtlasesWeaponGui').Frames.Plus,
            this.container
        );
        this.plus.alpha = 0;
        this.count.alpha = 0;
        this.btn.alpha = 0;
        this.container.x = 200;
        this.container.y = 600;
    }

    private change(): void {
        this.current++;
        if (this.current > 5) this.current = 0;
        //
        /*if (this.current === 0) {
            this.icon.loadTexture(
                ImageUtils.getAtlasClass('AtlasesWeaponGui').getName(),
                ImageUtils.getAtlasClass('AtlasesWeaponGui').Frames[WeaponType.FINGER],
            );
            TweenUtils.fadeOut(this.count, 250);
            this.onChange.dispatch(WeaponType.FINGER);
        }*/
        if (this.current === 1) {
            if (isUndefined(GameConfig.PLAYER_DATA.arsenal[WeaponType.SLIPPER]) || 0 >= GameConfig.PLAYER_DATA.arsenal[WeaponType.SLIPPER]) {
                this.current++;
            }
            else {
                this.icon.loadTexture(
                    ImageUtils.getAtlasClass('AtlasesWeaponGui').getName(),
                    ImageUtils.getAtlasClass('AtlasesWeaponGui').Frames[WeaponType.SLIPPER + GameConfig.LOCALE],
                );
                this.count.loadTexture(
                    ImageUtils.getAtlasClass('AtlasesWeaponGui').getName(),
                    ImageUtils.getAtlasClass('AtlasesWeaponGui').Frames['N' +
                    (GameConfig.PLAYER_DATA.arsenal[WeaponType.SLIPPER] > 6 ? 6 : GameConfig.PLAYER_DATA.arsenal[WeaponType.SLIPPER])],
                );
                if (GameConfig.PLAYER_DATA.arsenal[WeaponType.SLIPPER] > 6) {
                    TweenUtils.fadeIn(this.plus, 250);
                } else {
                    TweenUtils.fadeOut(this.plus, 250);
                }
                TweenUtils.fadeIn(this.count, 250);
                this.onChange.dispatch(WeaponType.SLIPPER);
            }
        }
        if (this.current === 2) {
            if (isUndefined(GameConfig.PLAYER_DATA.arsenal[WeaponType.CHALK]) || 0 >= GameConfig.PLAYER_DATA.arsenal[WeaponType.CHALK]) {
                this.current++;
            }
            else {
                this.icon.loadTexture(
                    ImageUtils.getAtlasClass('AtlasesWeaponGui').getName(),
                    ImageUtils.getAtlasClass('AtlasesWeaponGui').Frames[WeaponType.CHALK + GameConfig.LOCALE],
                );
                this.count.loadTexture(
                    ImageUtils.getAtlasClass('AtlasesWeaponGui').getName(),
                    ImageUtils.getAtlasClass('AtlasesWeaponGui').Frames['N' +
                    (GameConfig.PLAYER_DATA.arsenal[WeaponType.CHALK] > 6 ? 6 : GameConfig.PLAYER_DATA.arsenal[WeaponType.CHALK])],
                );
                if (GameConfig.PLAYER_DATA.arsenal[WeaponType.CHALK] > 6) {
                    TweenUtils.fadeIn(this.plus, 250);
                } else {
                    TweenUtils.fadeOut(this.plus, 250);
                }
                TweenUtils.fadeIn(this.count, 250);
                this.onChange.dispatch(WeaponType.CHALK);
            }
        }
        if (this.current === 3) {
            if (isUndefined(GameConfig.PLAYER_DATA.arsenal[WeaponType.POISON]) || 0 >= GameConfig.PLAYER_DATA.arsenal[WeaponType.POISON]) {
                this.current++;
            }
            else {
                this.icon.loadTexture(
                    ImageUtils.getAtlasClass('AtlasesWeaponGui').getName(),
                    ImageUtils.getAtlasClass('AtlasesWeaponGui').Frames[WeaponType.POISON],
                );
                this.count.loadTexture(
                    ImageUtils.getAtlasClass('AtlasesWeaponGui').getName(),
                    ImageUtils.getAtlasClass('AtlasesWeaponGui').Frames['N' +
                    (GameConfig.PLAYER_DATA.arsenal[WeaponType.POISON] > 6 ? 6 : GameConfig.PLAYER_DATA.arsenal[WeaponType.POISON])],
                );
                if (GameConfig.PLAYER_DATA.arsenal[WeaponType.POISON] > 6) {
                    TweenUtils.fadeIn(this.plus, 250);
                } else {
                    TweenUtils.fadeOut(this.plus, 250);
                }
                TweenUtils.fadeIn(this.count, 250);
                this.onChange.dispatch(WeaponType.POISON);
            }
        }
        if (this.current === 4) {
            if (isUndefined(GameConfig.PLAYER_DATA.arsenal[WeaponType.GFINGER]) || 0 >= GameConfig.PLAYER_DATA.arsenal[WeaponType.GFINGER]) {
                this.current++;
            }
            else {
                this.icon.loadTexture(
                    ImageUtils.getAtlasClass('AtlasesWeaponGui').getName(),
                    ImageUtils.getAtlasClass('AtlasesWeaponGui').Frames[WeaponType.GFINGER],
                );
                this.count.loadTexture(
                    ImageUtils.getAtlasClass('AtlasesWeaponGui').getName(),
                    ImageUtils.getAtlasClass('AtlasesWeaponGui').Frames['N' +
                    (GameConfig.PLAYER_DATA.arsenal[WeaponType.GFINGER] > 6 ? 6 : GameConfig.PLAYER_DATA.arsenal[WeaponType.GFINGER])],
                );
                if (GameConfig.PLAYER_DATA.arsenal[WeaponType.GFINGER] > 6) {
                    TweenUtils.fadeIn(this.plus, 250);
                } else {
                    TweenUtils.fadeOut(this.plus, 250);
                }
                TweenUtils.fadeIn(this.count, 250);
                this.onChange.dispatch(WeaponType.GFINGER);
            }
        }
        if (this.current === 5) {
            if (isUndefined(GameConfig.PLAYER_DATA.arsenal[WeaponType.SPRAY]) || 0 >= GameConfig.PLAYER_DATA.arsenal[WeaponType.SPRAY]) {
                this.current = 0;
            }
            else {
                this.icon.loadTexture(
                    ImageUtils.getAtlasClass('AtlasesWeaponGui').getName(),
                    ImageUtils.getAtlasClass('AtlasesWeaponGui').Frames[WeaponType.SPRAY],
                );
                this.count.loadTexture(
                    ImageUtils.getAtlasClass('AtlasesWeaponGui').getName(),
                    ImageUtils.getAtlasClass('AtlasesWeaponGui').Frames['N' +
                    (GameConfig.PLAYER_DATA.arsenal[WeaponType.SPRAY] > 6 ? 6 : GameConfig.PLAYER_DATA.arsenal[WeaponType.SPRAY])],
                );
                if (GameConfig.PLAYER_DATA.arsenal[WeaponType.SPRAY] > 6) {
                    TweenUtils.fadeIn(this.plus, 250);
                } else {
                    TweenUtils.fadeOut(this.plus, 250);
                }
                TweenUtils.fadeIn(this.count, 250);
                this.onChange.dispatch(WeaponType.SPRAY);
            }
        }
        if (this.current === 0) {
            this.icon.loadTexture(
                ImageUtils.getAtlasClass('AtlasesWeaponGui').getName(),
                ImageUtils.getAtlasClass('AtlasesWeaponGui').Frames[WeaponType.FINGER],
            );
            TweenUtils.fadeOut(this.count, 250);
            TweenUtils.fadeOut(this.plus, 250);
            this.onChange.dispatch(WeaponType.FINGER);
        }
    }

    public update(): void {
        if (this.current === 0) {
            this.icon.loadTexture(
                ImageUtils.getAtlasClass('AtlasesWeaponGui').getName(),
                ImageUtils.getAtlasClass('AtlasesWeaponGui').Frames[WeaponType.FINGER],
            );
        }
        else if (this.current === 1) {
            this.count.loadTexture(
                ImageUtils.getAtlasClass('AtlasesWeaponGui').getName(),
                ImageUtils.getAtlasClass('AtlasesWeaponGui').Frames['N' +
                (GameConfig.PLAYER_DATA.arsenal[WeaponType.SLIPPER] > 6 ? 6 : GameConfig.PLAYER_DATA.arsenal[WeaponType.SLIPPER])],
            );
            if (GameConfig.PLAYER_DATA.arsenal[WeaponType.SLIPPER] > 6) {
                TweenUtils.fadeIn(this.plus, 250);
            } else {
                TweenUtils.fadeOut(this.plus, 250);
            }
            if (0 >= GameConfig.PLAYER_DATA.arsenal[WeaponType.SLIPPER]) {
                this.count.alpha = 0;
                TweenUtils.delayedCall(250, this.change, this);
            }
        }
        else if (this.current === 2) {
            this.count.loadTexture(
                ImageUtils.getAtlasClass('AtlasesWeaponGui').getName(),
                ImageUtils.getAtlasClass('AtlasesWeaponGui').Frames['N' +
                (GameConfig.PLAYER_DATA.arsenal[WeaponType.CHALK] > 6 ? 6 : GameConfig.PLAYER_DATA.arsenal[WeaponType.CHALK])],
            );
            if (GameConfig.PLAYER_DATA.arsenal[WeaponType.CHALK] > 6) {
                TweenUtils.fadeIn(this.plus, 250);
            } else {
                TweenUtils.fadeOut(this.plus, 250);
            }
            if (0 >= GameConfig.PLAYER_DATA.arsenal[WeaponType.CHALK]) {
                this.count.alpha = 0;
                TweenUtils.delayedCall(250, this.change, this);
            }
        }
        else if (this.current === 3) {
            this.count.loadTexture(
                ImageUtils.getAtlasClass('AtlasesWeaponGui').getName(),
                ImageUtils.getAtlasClass('AtlasesWeaponGui').Frames['N' +
                (GameConfig.PLAYER_DATA.arsenal[WeaponType.POISON] > 6 ? 6 : GameConfig.PLAYER_DATA.arsenal[WeaponType.POISON])],
            );
            if (GameConfig.PLAYER_DATA.arsenal[WeaponType.POISON] > 6) {
                TweenUtils.fadeIn(this.plus, 250);
            } else {
                TweenUtils.fadeOut(this.plus, 250);
            }
            if (0 >= GameConfig.PLAYER_DATA.arsenal[WeaponType.POISON]) {
                this.count.alpha = 0;
                TweenUtils.delayedCall(250, this.change, this);
            }
        }
        else if (this.current === 4) {
            this.count.loadTexture(
                ImageUtils.getAtlasClass('AtlasesWeaponGui').getName(),
                ImageUtils.getAtlasClass('AtlasesWeaponGui').Frames['N' +
                (GameConfig.PLAYER_DATA.arsenal[WeaponType.GFINGER] > 6 ? 6 : GameConfig.PLAYER_DATA.arsenal[WeaponType.GFINGER])],
            );
            if (GameConfig.PLAYER_DATA.arsenal[WeaponType.GFINGER] > 6) {
                TweenUtils.fadeIn(this.plus, 250);
            } else {
                TweenUtils.fadeOut(this.plus, 250);
            }
            if (0 >= GameConfig.PLAYER_DATA.arsenal[WeaponType.GFINGER]) {
                this.count.alpha = 0;
                TweenUtils.delayedCall(250, this.change, this);
            }
        }
        else if (this.current === 5) {
            this.count.loadTexture(
                ImageUtils.getAtlasClass('AtlasesWeaponGui').getName(),
                ImageUtils.getAtlasClass('AtlasesWeaponGui').Frames['N' +
                (GameConfig.PLAYER_DATA.arsenal[WeaponType.SPRAY] > 6 ? 6 : GameConfig.PLAYER_DATA.arsenal[WeaponType.SPRAY])],
            );
            if (GameConfig.PLAYER_DATA.arsenal[WeaponType.SPRAY] > 6) {
                TweenUtils.fadeIn(this.plus, 250);
            } else {
                TweenUtils.fadeOut(this.plus, 250);
            }
            if (0 >= GameConfig.PLAYER_DATA.arsenal[WeaponType.SPRAY]) {
                this.count.alpha = 0;
                TweenUtils.delayedCall(250, this.change, this);
            }
        }
    }

    public show() {
        TweenUtils.moveIn(this.container, 0, 320, 1000);
    }

    public hide() {
        TweenUtils.moveOut(this.container, 200, 320, 1000);
    }

    public disable() {
        this.btn.inputEnabled = false;
    }

    public enable() {
        this.btn.inputEnabled = true;
    }

    public getBody(): Phaser.Group {
        return this.container;
    }

    public dispose() {
        this.container.removeAll(true, true, true);
        this.container.destroy(true);
    }
}
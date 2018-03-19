import {GameConfig, LOCALE, WeaponType} from '../../../config/game.config';
import {ImageUtils} from '../../../utils/images/image.utils';
import {GuiUtils} from '../../../utils/gui.utils';
import {TweenUtils} from '../../../utils/tween.utils';

export class RightUi {

    private game: Phaser.Game = null;
    private container: Phaser.Group = null;
    private panel: Phaser.Sprite = null;
    private icon: Phaser.Sprite = null;
    private count: Phaser.Sprite = null;

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
        this.icon = this.game.add.sprite(414, 451,
            ImageUtils.getAtlasClass('AtlasesWeaponGui').getName(),
            ImageUtils.getAtlasClass('AtlasesWeaponGui').Frames[WeaponType.FINGER],
            this.container
        );
        this.icon.inputEnabled = true;
        this.icon.input.pixelPerfectAlpha = 10;
        this.icon.input.pixelPerfectClick = true;
        this.icon.events.onInputDown.add(this.change, this);
        this.count = this.game.add.sprite(435, 541,
            ImageUtils.getAtlasClass('AtlasesWeaponGui').getName(),
            ImageUtils.getAtlasClass('AtlasesWeaponGui').Frames['N' + GameConfig.PLAYER_DATA.arsenal[WeaponType.FINGER]],
            this.container
        );
        this.count.alpha = 0;
        this.container.x = 200;
        this.container.y = 600;
    }

    private change(): void {
        this.current++;
        if (this.current > 5) this.current = 0;
        if (this.current === 0) {
            this.icon.loadTexture(
                ImageUtils.getAtlasClass('AtlasesWeaponGui').getName(),
                ImageUtils.getAtlasClass('AtlasesWeaponGui').Frames[WeaponType.FINGER],
            );
            TweenUtils.fadeOut(this.count, 250);
            this.onChange.dispatch(WeaponType.FINGER);
        }
        else if (this.current === 1) {
            this.icon.loadTexture(
                ImageUtils.getAtlasClass('AtlasesWeaponGui').getName(),
                ImageUtils.getAtlasClass('AtlasesWeaponGui').Frames[WeaponType.SLIPPER + GameConfig.LOCALE],
            );
            this.count.loadTexture(
                ImageUtils.getAtlasClass('AtlasesWeaponGui').getName(),
                ImageUtils.getAtlasClass('AtlasesWeaponGui').Frames['N' + GameConfig.PLAYER_DATA.arsenal[WeaponType.SLIPPER]],
            );
            TweenUtils.fadeIn(this.count, 250);
            this.onChange.dispatch(WeaponType.SLIPPER);
        }
        else if (this.current === 2) {
            this.icon.loadTexture(
                ImageUtils.getAtlasClass('AtlasesWeaponGui').getName(),
                ImageUtils.getAtlasClass('AtlasesWeaponGui').Frames[WeaponType.CHALK + GameConfig.LOCALE],
            );
            this.count.loadTexture(
                ImageUtils.getAtlasClass('AtlasesWeaponGui').getName(),
                ImageUtils.getAtlasClass('AtlasesWeaponGui').Frames['N' + GameConfig.PLAYER_DATA.arsenal[WeaponType.CHALK]],
            );
            TweenUtils.fadeIn(this.count, 250);
            this.onChange.dispatch(WeaponType.CHALK);
        }
        else if (this.current === 3) {
            this.icon.loadTexture(
                ImageUtils.getAtlasClass('AtlasesWeaponGui').getName(),
                ImageUtils.getAtlasClass('AtlasesWeaponGui').Frames[WeaponType.POISON],
            );
            this.count.loadTexture(
                ImageUtils.getAtlasClass('AtlasesWeaponGui').getName(),
                ImageUtils.getAtlasClass('AtlasesWeaponGui').Frames['N' + GameConfig.PLAYER_DATA.arsenal[WeaponType.POISON]],
            );
            TweenUtils.fadeIn(this.count, 250);
            this.onChange.dispatch(WeaponType.POISON);
        }
        else if (this.current === 4) {
            this.icon.loadTexture(
                ImageUtils.getAtlasClass('AtlasesWeaponGui').getName(),
                ImageUtils.getAtlasClass('AtlasesWeaponGui').Frames[WeaponType.GFINGER],
            );
            this.count.loadTexture(
                ImageUtils.getAtlasClass('AtlasesWeaponGui').getName(),
                ImageUtils.getAtlasClass('AtlasesWeaponGui').Frames['N' + GameConfig.PLAYER_DATA.arsenal[WeaponType.GFINGER]],
            );
            TweenUtils.fadeIn(this.count, 250);
            this.onChange.dispatch(WeaponType.GFINGER);
        }
        else if (this.current === 5) {
            this.icon.loadTexture(
                ImageUtils.getAtlasClass('AtlasesWeaponGui').getName(),
                ImageUtils.getAtlasClass('AtlasesWeaponGui').Frames[WeaponType.SPRAY],
            );
            this.count.loadTexture(
                ImageUtils.getAtlasClass('AtlasesWeaponGui').getName(),
                ImageUtils.getAtlasClass('AtlasesWeaponGui').Frames['N' + GameConfig.PLAYER_DATA.arsenal[WeaponType.SPRAY]],
            );
            TweenUtils.fadeIn(this.count, 250);
            this.onChange.dispatch(WeaponType.SPRAY);
        }
    }

    public show() {
        TweenUtils.moveIn(this.container, 0, 320, 1000);
    }

    public hide() {
        TweenUtils.moveOut(this.container, 200, 320, 1000);
    }

    public getBody(): Phaser.Group {
        return this.container;
    }

    public dispose() {
        this.container.destroy(true);
    }
}
import * as WebFontLoader from 'webfontloader';
import Boot from './states/boot';
import Preloader from './states/preloader';
import * as Utils from './utils/utils';
import * as Assets from './assets';
import Start from './states/start';
import {AssetMode, GadgetMode, GameConfig, PublishMode} from './config/game.config';
import Level from './states/level';
import SelectLevel from './states/select.level';
import SelectStage from './states/select.stage';
import Win from './states/win';
import Fail from './states/fail';
import Leaders from './states/leaders';
import Shop from './states/shop';

class App extends Phaser.Game {
    constructor(config: Phaser.IGameConfig) {
        super (config);

        this.state.add('Boot', Boot);
        this.state.add('Preloader', Preloader);
        this.state.add('Start', Start);
        this.state.add('Level', Level);
        this.state.add('SelectLevel', SelectLevel);
        this.state.add('SelectStage', SelectStage);
        this.state.add('Win', Win);
        this.state.add('Fail', Fail);
        this.state.add('Leaders', Leaders);
        this.state.add('Shop', Shop);

        this.state.start('Boot');
    }
}

function startApp(): void {
    let gameWidth: number = DEFAULT_GAME_WIDTH;
    let gameHeight: number = DEFAULT_GAME_HEIGHT;

    if (SCALE_MODE === 'USER_SCALE') {
        let screenMetrics: Utils.ScreenMetrics = Utils.ScreenUtils.calculateScreenMetrics(gameWidth, gameHeight);
        gameWidth = screenMetrics.gameWidth;
        gameHeight = screenMetrics.gameHeight;
    }

    // There are a few more options you can set if needed, just take a look at Phaser.IGameConfig
    let gameConfig: Phaser.IGameConfig = {
        width: gameWidth,
        height: gameHeight,
        renderer: Phaser.CANVAS,
        parent: 'game-container',
        resolution: 1,
        transparent: true
    };

    let app = new App(gameConfig);
    GameConfig.init(
        app.device.desktop ? GadgetMode.DESKTOP : GadgetMode.MOBILE,
        PublishMode.VK,
        AssetMode.LOAD_ALL,
        'Next Supermodel Stars');

    GameConfig.GAME = app;
    // app.stage.disableVisibilityChange = true;
}

window.onload = () => {
    let webFontLoaderOptions: any = null;
    let webFontsToLoad: string[] = GOOGLE_WEB_FONTS;

    if (webFontsToLoad.length > 0) {
        webFontLoaderOptions = (webFontLoaderOptions || {});

        webFontLoaderOptions.google = {
            families: webFontsToLoad
        };
    }

    if (Object.keys(Assets.CustomWebFonts).length > 0) {
        webFontLoaderOptions = (webFontLoaderOptions || {});

        webFontLoaderOptions.custom = {
            families: [],
            urls: []
        };

        for (let font in Assets.CustomWebFonts) {
            webFontLoaderOptions.custom.families.push(Assets.CustomWebFonts[font].getFamily());
            webFontLoaderOptions.custom.urls.push(Assets.CustomWebFonts[font].getCSS());
        }
    }

    if (webFontLoaderOptions === null) {
        // Just start the game, we don't need any additional fonts
        startApp();
    } else {
        // Load the fonts defined in webFontsToLoad from Google Web Fonts, and/or any Local Fonts then start the game knowing the fonts are available
        webFontLoaderOptions.active = startApp;

        WebFontLoader.load(webFontLoaderOptions);
    }
};

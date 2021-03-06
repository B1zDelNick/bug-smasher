import {GameConfig} from '../../../../config/game.config';
import {ImageUtils} from '../../../../utils/images/image.utils';
import {TweenUtils} from '../../../../utils/tween.utils';
import {FoodItem} from './food.item';

export class FoodTable {
    private game: Phaser.Game = null;
    private container: Phaser.Group = null;
    private panel: Phaser.Sprite = null;
    private foods: FoodItem[] = [];
    public onFoodEnded: Phaser.Signal = new Phaser.Signal();

    constructor() {
        this.game = GameConfig.GAME;
        this.container = this.game.add.group();
        this.panel = this.game.add.sprite(0, 784,
            ImageUtils.getAtlasClass('AtlasesStateLevel').getName(),
            ImageUtils.getAtlasClass('AtlasesStateLevel').Frames.Table,
            this.container
        );
        this.container.y = 200;
    }

    public eatAllFood() {
        if (this.foods.length === 0) {
            this.onFoodEnded.dispatch();
        }
        else {
            for (let i = this.foods.length - 1; i >= 0; i--) {
                this.foods[i].eat();
                this.foods.splice(i, 1);
            }
            this.onFoodEnded.dispatch();
        }
    }

    public eatFood() {
        if (this.foods.length === 0) {
            return;
        }
        const tempFoods: FoodItem[] = [];
        for (let f of this.foods) {
            if (f !== null && !f.isPoisoned() && !f.isEated())
                tempFoods.push(f);
        }
        if (tempFoods.length === 0) {
            return;
        }
        const toEat = tempFoods[this.game.rnd.between(0, tempFoods.length - 1)];
        toEat.eat();
        for (let i = this.foods.length - 1; i >= 0; i--) {
            if (this.foods[i].isEated()) {
                this.foods.splice(i, 1);
            }
        }
        if (this.foods.length === 0) {
            this.onFoodEnded.dispatch();
        }
    }

    public getRecentFood(): FoodItem[] {
        return this.foods;
    }

    public addPoisonToRandomItem(pointTo: Phaser.Point): FoodItem {
        const tempFoods: FoodItem[] = [];
        for (let f of this.foods) {
            if (f !== null && !f.isPoisoned() && !f.isEated())
                tempFoods.push(f);
        }
        if (tempFoods.length === 0) {
            console.log('NO FOOD AVAILABLE');
            return;
        }
        const toPoison = tempFoods[this.game.rnd.between(0, tempFoods.length - 1)];
        return toPoison.addPoison(pointTo);
    }

    public addRandomFood(count: number) {
        if (count === 11) {
            for (let i = 0; i < 6; i++) {
                const tp = new FoodItem(this.container, this.getRandomFoodType(), 36 + 60 * i, 833);
                this.foods.push(tp);
            }
            for (let i = 0; i < 5; i++) {
                const tp = new FoodItem(this.container, this.getRandomFoodType(), 50 + 60 * i, 918);
                this.foods.push(tp);
            }
        }
    }

    private getRandomFoodType(): FoodType {
        const rnd = this.game.rnd.between(1, 600);
        if (rnd > 500) {
            return FoodType.BURGER;
        }
        else if (rnd > 400) {
            return FoodType.CAP;
        }
        else if (rnd > 300) {
            return FoodType.CHEESE;
        }
        else if (rnd > 200) {
            return FoodType.FREE;
        }
        else if (rnd > 100) {
            return FoodType.SALAD;
        }
        return FoodType.APPLE;
    }

    public getBody(): Phaser.Group {
        return this.container;
    }

    public show() {
        TweenUtils.moveIn(this.container, 0, 0, 1000);
    }

    public hide() {
        TweenUtils.moveOut(this.container, 0, 200, 1000);
    }

    public dispose() {
        this.container.removeAll(true, true, true);
        this.container.destroy(true);
    }
}

export enum FoodType {
    APPLE = 'Apple',
    BURGER = 'Burger',
    CAP = 'Cap',
    CHEESE = 'Cheese',
    FREE = 'Free',
    SALAD = 'Salad'
}
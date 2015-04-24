var GameLayer = cc.Layer.extend({
    spriteSheet: null,
    monster: null,
    ctor: function() {
        this._super();
        this.init();
        GameLayer.some = this;
    },
    init: function() {
        this._super();
        //create sprite sheet
        cc.spriteFrameCache.addSpriteFrames(res.GameSprites_plist);
        this.spriteSheet = new cc.SpriteBatchNode(res.GameSprites_png);
        this.addChild(this.spriteSheet);

        /*var size = cc.director.getWinSize();
        var tenthOfWidth = GameSettings.tenthOfWidth();
        var tenthOfHeight = GameSettings.tenthOfHeight();*/
        //game interface
        //init actions
        Monster.initActions();
        Rabbit.initActions();
        Bomb.initActions();
        FatRabbit.initActions();
        //create objects
        this.monster = new Monster();
        //load level
        var drawer = new cc.DrawNode();
        Level.load(this.monster, drawer);



        var first = true;
        var that = this;
        var eventListener = cc.EventListener.create({
            event: cc.EventListener.MOUSE,
            onMouseDown: function(event) {
                if (event.getButton() === cc.EventMouse.BUTTON_LEFT) {
                    cc.log("go length:" + GameLayer.gameObjects.length);
                    cc.log("curr object: " + GameLayer.currObject);
                    if (GameLayer.currObject < GameLayer.gameObjects.length) {
                        GameLayer.gameObjects[GameLayer.currObject++].activity();
                    }
                }
            }
        });
        //add listeners
        cc.eventManager.addListener(eventListener, this);
        //add items to layer
        this.addChild(this.monster, 2);
        this.addChild(drawer, 2);
        this.schedule(this.update, 1 / 10, cc.REPEAT_FOREVER, 0, "updateGameLayer");
        this.schedule(this.start, 1, 0, 1, "startGameLayer");
    },
    update: function(dt) {
        //check collision
        var monsterRect = this.monster.getCollideRect();
        var i = 0;
        while (i < GameLayer.gameObjects.length) {
            var gameObjectRect = GameLayer.gameObjects[i].getCollideRect();
            if (cc.rectIntersectsRect(monsterRect, gameObjectRect)) {
                this.monster.eat(GameLayer.gameObjects[i].name);
                this.removeChild(GameLayer.gameObjects[i]);
                cc.log("before| i: " + i + " len: " + GameLayer.gameObjects.length);
                GameLayer.gameObjects.splice(i, 1);
                cc.log("after| i: " + i + " len: " + GameLayer.gameObjects.length);
                //update index
                if (GameLayer.currObject > i) {
                    GameLayer.currObject--;
                }
            }
            i++;
        }
    },
    start: function(dt){
        this.monster.move();
    },
    removeGameObject: function(object) {
        this.removeChild(object);
    }
});

GameLayer.gameObjects = [];
GameLayer.currObject = 0;
var GameLayer = cc.Layer.extend({
    spriteSheet: null,
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

        var size = cc.director.getWinSize();
        var tenthOfWidth = size.width / 10;
        var tenthOfHeight = size.height / 10;
        //game interface
            //init actions
        Monster.initActions();
        Rabbit.initActions();
            //create objects
        var monster = new Monster();
        var rabbitSome = new Rabbit(true);
        rabbitSome.setPosition(cc.p(size.width/2,size.height/2));


        var drawer = new cc.DrawNode();
        Level.load(monster, drawer);

        var eventListener = cc.EventListener.create({
            event: cc.EventListener.MOUSE,
            onMouseDown: function(event) {
                if (event.getButton() === cc.EventMouse.BUTTON_LEFT) {
                    monster.move();
                }
                if (event.getButton() === cc.EventMouse.BUTTON_RIGHT) {
                    monster.eat();
                    rabbitSome.runAction(cc.sequence(Rabbit.turnleftAction,
                        Rabbit.turnleftAction,Rabbit.turnrightAction,Rabbit.turnrightAction));
                    
                }
            }
        });

        //TODO: TEMP
        //hi.runAction(cc.moveTo(1,myLevel(size)[0]));
        /*var eventListener = cc.EventListener.create({
         event: cc.EventListener.MOUSE,
         onMouseDown: function(event)
         {
         cc.log(currRab.isJumpDone);
         if( currRab.isJumpDone === true ) {
         var jumpAction = jumpToDir(0.7, currRab.direction, 50, currRab);
         currRab.runAction(jumpAction);
         hi.runAction(hi.eatAnimation);
         }
         if( currRab === rab0 ){
         currRab = rab1;
         } else {
         if( currRab === rab1 ){
         currRab = rab2;
         } else if( currRab === rab2 ){
         currRab = rab3;
         } else{
         currRab = rab0;
         }
         }
         }

         });*/
        //cc.eventManager.addListener(eventListener, this);
        //draw.drawQuadBezier(cc.p(160,10), cc.p(310,0), cc.p(310,160),50,3);
        //draw.drawQuadBezier(cc.p(310,160), cc.p(310,310), cc.p(160,310),50,3);
        //draw.drawQuadBezier(cc.p(160,310), cc.p(10,310), cc.p(10,160),50,3);
        //draw.drawQuadBezier(cc.p(10,160), cc.p(10,10), cc.p(160,10),50,3);

        //add listeners
        cc.eventManager.addListener(eventListener, this);
        //add items to layer
        this.addChild(monster, 2);
        this.addChild(drawer, 2);
        this.addChild(rabbitSome,2);
        this.scheduleUpdate();
    },
    update: function(dt) {
        //check collision
    }
});

GameLayer.gameObjects = [];

GameLayer.some;
var GameLayer = cc.Layer.extend({
    ctor:function() {
		this._super();
        this.init();
	},
    init : function() {
        var size = cc.director.getWinSize();
        var tenthOfWidth = size.width / 10;
        var tenthOfHeight = size.height / 10;
        //background
        var background = cc.LayerGradient.create(cc.color(0,0,0,255),
            cc.color(0x46,0x82,0xB4,255));
        //game interface
        //user interface
        var back_btn = new cc.MenuItemFont("Back", this.backToMenu, this);
        back_btn.setFontSize(12);
        back_btn.setPosition(new cc.Point(0,0));
        var menu = new cc.Menu(back_btn);
        menu.setPosition(tenthOfWidth, tenthOfHeight*9);
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
        //add items to layer
        this.addChild(background,0);
        this.addChild(menu,2);
        this.scheduleUpdate();
        //draw.drawQuadBezier(cc.p(160,10), cc.p(310,0), cc.p(310,160),50,3);
        //draw.drawQuadBezier(cc.p(310,160), cc.p(310,310), cc.p(160,310),50,3);
        //draw.drawQuadBezier(cc.p(160,310), cc.p(10,310), cc.p(10,160),50,3);
        //draw.drawQuadBezier(cc.p(10,160), cc.p(10,10), cc.p(160,10),50,3);
        return true;
    },
	update: function(dt) {
		//check collision
	},
    backToMenu: function() {
        //TODO : finish game scene
        //cc.director.pushScene(new cc.TransitionFade(1.2,scene));
        cc.director.popScene();
    }
});

GameLayer.scene = function() {
    var scene = new cc.Scene();
	var layer = new GameLayer();
	scene.addChild(layer);
	return scene;
};

var MenuLayer = cc.Layer.extend({
    sprite:null,
    ctor:function () {
        //////////////////////////////
        // 1. super init first
        this._super();

        var size = cc.winSize;

	    /////////////////////////////
	    //my code
	    var menu_play_btn = new cc.Sprite(res.MenuPlay_png);
	    menu_play_btn.attr({
		    x : size.width / 2,
		    y : size.height / 2,
		    scale : 0.5
	    });
	    this.addChild(menu_play_btn,0);

        var eventListener = cc.EventListener.create({
            event: cc.EventListener.MOUSE,

            onMouseDown: function(event) {
                cc.log("menu_play_btn_click");
                //load GameLayer
                cc.director.pushScene(cc.TransitionSlideInT.create(1, GameLayer.scene()));
            }
        });

        cc.eventManager.addListener(eventListener, menu_play_btn);

        return true;
    }

});


MenuLayer.scene = function(){
    var scene = new cc.Scene();
    var layer = new MenuLayer();
    scene.addChild(layer);
    return scene;
};


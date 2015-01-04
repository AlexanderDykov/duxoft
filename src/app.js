
var HelloWorldLayer = cc.Layer.extend({
    sprite:null,
    ctor:function () {
        //////////////////////////////
        // 1. super init first
        this._super();

        var size = cc.winSize;
        var sprite = new cc.Sprite(res.CloseNormal_png);//creating sprite from resource.js
        sprite.attr({
        	anchorX: 0,
        	anchorY: -1,
        	x: size.width / 2,
        	y: size.height / 2,
        });
        this.addChild(sprite, 0);//adding sprite to our game

        //var action = cc.JumpBy.create(2, cc.p(100,100),50,3); 
        // var bezie = [cc.p(0, 0),cc.p(100, 10),cc.p(100,100)];
        var action = cc.RepeatForever.create(cc.RotateBy.create(2, 360 ,360));//rotate around point
        sprite.runAction(action);

        if(cc.sys.capabilities.hasOwnProperty('touches'))//get touch on mobile devices
        {
        	cc.eventManager.addListener(
        			{
        				event: cc.EventListener.TOUCH_ONE_BY_ONE,
        				onTouchBegan:function(touch,event)
        				{
        					cc.log("dsdf");
        					return true;
        				}
        			},this);
        }
        return true;
    }
});

var HelloWorldScene = cc.Scene.extend({
    onEnter:function () {
        this._super();
        var layer = new HelloWorldLayer();
        this.addChild(layer);
    }
});


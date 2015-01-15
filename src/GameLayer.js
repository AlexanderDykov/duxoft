var GameLayer = cc.Layer.extend({
	sprite:null,
	ctor:function () {
		//////////////////////////////
		// 1. super init first
		this._super();

		var size = cc.winSize;

		/////////////////////////////
		//my code
		var Rabbit = new cc.Sprite(res.Rabbit);

		this.scheduleUpdate();

		return true;
	},

	update: function(dt){
		cc.log("hello");
	}
});



GameLayer.scene = function () {
	var scene = new cc.Scene();
	var layer = new GameLayer();
	scene.addChild(layer, 1);
	return scene;
};
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
		menu_play_btn.attr({
			x : size.width / 2,
			y : size.height / 2,
			scale : 0.5
		});
		this.addChild(menu_play_btn,0);
		return true;
	}
});



GameLayer.scene = function () {
	var scene = new cc.Scene();
	var layer = new GameLayer();
	scene.addChild(layer, 1);
	return scene;
};
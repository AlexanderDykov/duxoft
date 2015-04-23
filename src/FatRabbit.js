var FatRabbit = cc.Sprite.extend({
	jumpAction: null,
	ctor: function() {
		this._super("#fatrabbit.png");
		//scale relative to aspect ratio
		this.scale = GameSettings.getScaleFactor();
		//anchor point
		this.setAnchorPoint(cc.p(0.5, 0));
		//set fun action
		this.eatCarrot();
	},
	onEnter: function() {
		this._super();
	},
	jump : function() {

	},
	eatCarrot: function() {
		this.runAction(FatRabbit.eatCarrotAction);
	},
	activity: function() {
		// v      this.eatCarrot();
	},
	getCollideRect: function() {
		var w = this.width * GameSettings.getScaleFactor();
		var h = this.height * GameSettings.getScaleFactor();
		return cc.rect(this.x - w / 2, this.y, w, h);
	}
});

FatRabbit.initActions = function() {
	//eat carrot
	var EATCARROT_FRAME_COUNT = 2;
	FatRabbit.eatCarrotAction = Helper.createAnimation(
		"fatrabbit_eat",
		EATCARROT_FRAME_COUNT,
		0.25,
		"fatrabbit.png"
	).repeatForever();
}
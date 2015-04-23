var FatRabbit = cc.Sprite.extend({
	jumpAction: null,
	ctor: function() {
		this._super("#fatrabbit.png");
		//scale relative to aspect ratio
		this.scale = GameSettings.getScaleFactor();
		//anchor point
		this.setAnchorPoint(cc.p(0.5, 0));
		//eating from creation
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
		this.eatCarrot();
	},
	setPositionFromTwoPoints: function(firstPoint, secondPoint, offset) {
		var liam = ( offset / 100 )
		var x = (firstPoint.x + liam * secondPoint.x) / ( 1 + liam );
		var y = (firstPoint.y + liam * secondPoint.y) / ( 1 + liam );
		this.setPosition(x, y);
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
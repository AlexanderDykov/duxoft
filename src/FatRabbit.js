var FatRabbit = cc.Sprite.extend({
	jumpAction: null,
	jumpHeight: 1.2,
	isJump: false,
	name: "fatrabbit",
	ctor: function() {
		this._super("#fatrabbit.png");
		//scale relative to aspect ratio
		this.scale = GameSettings.getScaleFactor();
		this.jumpHeight *= GameSettings.tenthOfHeight();
		//anchor point
		this.setAnchorPoint(cc.p(0.5, 0));
		//set fun action
		this.eatCarrot();
	},
	onEnter: function() {
		this._super();
	},
	setJumpAction: function(jump) {
		this.jumpAction = jump;
	},
	jump: function() {
		this.stopAllActions();
		var that = this;
		this.runAction(cc.sequence(
			this.jumpAction,
			new cc.CallFunc(function(){that.eatCarrot()},null)));
	},
	eatCarrot: function() {
		this.runAction(FatRabbit.eatCarrotAction.clone());
	},
	setActivity: function(dir) {
		var angle = Helper.getAngle(cc.p(0, 1), dir);
		if (dir.x < 0.0) {
			angle = -angle;
		}
		this.setRotation(angle);
		//create jump action
		this.jumpAction = Helper.jumpToDir(
			this,
			1.0,
			dir,
			FatRabbit.jump.clone()
		);
	},
	activity: function() {
		this.jump();
	},
	setPositionFromTwoPoints: function(firstPoint, secondPoint, offset) {
		var liam = (offset / 100);
		var x = firstPoint.x + (secondPoint.x - firstPoint.x) * liam;
		var y = firstPoint.y + (secondPoint.y - firstPoint.y) * liam;
		this.setPosition(x, y);
	},
	getCollideRect: function() {
		var w = this.width * GameSettings.getScaleFactor();
		var h = this.height * GameSettings.getScaleFactor();
		return cc.rect(this.x - w / 4, this.y + w / 4, w / 1.5, h / 1.5);
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
	//jump
	var JUMP_FRAME_COUNT = 5;
	FatRabbit.jump = Helper.createAnimation(
		"fatrabbit_jump",
		JUMP_FRAME_COUNT,
		0.3,
		"fatrabbit.png"
	);
}
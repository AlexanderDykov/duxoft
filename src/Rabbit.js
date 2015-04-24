/**
 * Created by andron94 on 13.03.15.
 */
var Rabbit = cc.Sprite.extend({
	jumpAction: null,
	jumpHeight: 1.5,
	isJump: false,
	name: "rabbit",
	ctor: function(isFatRabbit) {
		this._super("#rabbit.png");
		//scale relative to aspect ratio
		this.scale = GameSettings.getScaleFactor();
		this.jumpHeight *= GameSettings.tenthOfHeight();
		//anchor point
		this.setAnchorPoint(cc.p(0.5, 0));
	},
	onEnter: function() {
		this._super();
		this.schedule(this.update, 2, cc.REPEAT_FOREVER, 0, "update");
	},
	setJumpAction: function(jump) {
		this.jumpAction = jump;
	},
	jump: function() {
		this.stopAllActions();
		this.runAction(this.jumpAction);
	},
	turnLeft: function() {
		this.runAction(Rabbit.turnleftAction.clone());
	},
	turnRight: function() {
		this.runAction(Rabbit.turnrightAction.clone());
	},
	/*eatCarrot: function() {
		this.runAction(Rabbit.eatCarrotAction);
	},*/
	setActivity: function(dir) {
		var angle = Helper.getAngle(cc.p(0, 1), dir);
		if (dir.x < 0.0) {
			angle = -angle;
		}
		this.setRotation(angle);
		//create jump action
		this.jumpAction = Helper.jumpToDir(
			this,
			1.2,
			dir,
			Rabbit.jump.clone()
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
	update: function() {
		//set fun action
		if (this.isJump === false) {
			if (Helper.getRandomInt(0, 1) === 0) {
				this.turnLeft();
			} else {
				this.turnRight();
			}
		}
	},
	getCollideRect: function() {
		var w = this.width * GameSettings.getScaleFactor();
		var h = this.height * GameSettings.getScaleFactor();
		return cc.rect(this.x - w / 4, this.y + w / 4, w / 1.5, h / 1.5);
	}
});

Rabbit.initActions = function() {
	//eat carrot
	/*var EATCARROT_FRAME_COUNT = 2;
	Rabbit.eatCarrotAction = Helper.createAnimation(
		"rabbit_eat",
		EATCARROT_FRAME_COUNT,
		0.5,
		"rabbit.png"
	);*/
	//turn left
	var TURNLEFT_FRAME_COUNT = 3;
	Rabbit.turnleftAction = Helper.createDualAnimation(
		"rabbit_turnleft",
		TURNLEFT_FRAME_COUNT,
		0.15,
		"rabbit.png"
	);
	//turn right
	var TURNRIGHT_FRAME_COUNT = 3;
	Rabbit.turnrightAction = Helper.createDualAnimation(
		"rabbit_turnright",
		TURNLEFT_FRAME_COUNT,
		0.15,
		"rabbit.png"
	);
	//jump
	var JUMP_FRAME_COUNT = 5;
	Rabbit.jump = Helper.createAnimation(
		"rabbit_jump",
		JUMP_FRAME_COUNT,
		0.3,
		"rabbit.png"
	);
};
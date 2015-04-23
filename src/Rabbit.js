/**
 * Created by andron94 on 13.03.15.
 */
var Rabbit = cc.Sprite.extend({
	jumpAction: null,
	ctor: function(isFatRabbit) {
		this._super("#rabbit.png");
		//scale relative to aspect ratio
		this.scale = GameSettings.getScaleFactor();
		//anchor point
		this.setAnchorPoint(cc.p(0.5, 0));
	},
	onEnter: function() {
		this._super();
		this.schedule(this.update, 1, cc.REPEAT_FOREVER, 0, "update");
	},
	jump: function() {

	},
	turnLeft: function() {
		this.runAction(Rabbit.turnleftAction);
	},
	turnRight: function() {
		this.runAction(Rabbit.turnrightAction);
	},
	/*eatCarrot: function() {
		this.runAction(Rabbit.eatCarrotAction);
	},*/
	activity: function() {
		//this.turnLeft();
	},
	update: function() {
		//set fun action
		if (Helper.getRandomInt(0, 1) === 0) {
			this.turnLeft();
		} else {
			this.turnRight();
		}
	},
	getCollideRect: function() {
		var w = this.width * GameSettings.getScaleFactor();
		var h = this.height * GameSettings.getScaleFactor();
		return cc.rect(this.x - w / 2, this.y, w, h);
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
		0.1,
		"rabbit.png"
	);
	//turn right
	var TURNRIGHT_FRAME_COUNT = 3;
	Rabbit.turnrightAction = Helper.createDualAnimation(
		"rabbit_turnright",
		TURNLEFT_FRAME_COUNT,
		0.1,
		"rabbit.png"
	);
};
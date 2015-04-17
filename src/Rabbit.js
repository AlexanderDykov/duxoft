/**
 * Created by andron94 on 13.03.15.
 */
var Rabbit = cc.Sprite.extend({
	isFat: false,
	jumpAction: null,
	ctor: function(isFatRabbit) {
		this._super("#rabbit.png");
		//scale relative to aspect ratio
		var size = cc.director.getWinSize();
		this.scale = size.height / size.width;
		//anchor point
		this.setAnchorPoint(cc.p(0.5, 0));
		
		this.isFat = isFatRabbit;
	},
	onEnter: function() {
		this._super();
	},
	jump: function() {

	},
	turnLeft: function() {
		this.runAction(Rabbit.turnleftAction);
	},
	turnRight: function() {
		this.runAction(Rabbit.turnrightAction);
	},
	eatCarrot: function() {

	}
});

Rabbit.initActions = function() {
	//eat carrot
	var EATCARROT_FRAME_COUNT = 2;
	Rabbit.eatCarrotAction = Helper.createAnimation(
		"rabbit_eat",
		TURNLEFT_FRAME_COUNT,
		0.1,
		"rabbit.png"
	);
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
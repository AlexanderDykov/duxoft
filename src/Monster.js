/**
 * Created by andron94 on 13.03.15.
 */

var Monster = cc.Sprite.extend({
	moveAction: null,
	//eatAction: null,
	speed: 5,
	rotate_speed: 3.0,
	ctor: function() {
		this._super("#monster_eat2.png");
		//scale relative to aspect ratio
		this.scale = GameSettings.getScaleFactor();
		//anchor point
		this.setAnchorPoint(cc.p(0.5, 0));
	},
	onEnter: function() {
		this._super();
	},
	setMoveAction: function(move) {
		this.moveAction = move;
	},
	move: function() {
		this.runAction(this.moveAction);
	},
	eat: function() {
		this.runAction(Monster.eatAction);
	},
	getCollideRect: function() {
		var w = this.width * GameSettings.getScaleFactor();
		var h = this.height * GameSettings.getScaleFactor();
		return cc.rect(this.x - w / 2, this.y, w, h);
	}
});

Monster.initActions = function() {
	//eat action
	var EAT_FRAME_COUNT = 4;
	Monster.eatAction = Helper.createAnimation(
		"monster_eat",
		EAT_FRAME_COUNT,
		0.1,
		"monster_eat2.png"
	);
};
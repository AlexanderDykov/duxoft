/**
 * Created by andron94 on 13.03.15.
 */

var Bomb = cc.Sprite.extend({
	ctor: function() {
		this._super("#bomb0.png");
		//scale relative to aspect ratio
		this.scale = GameSettings.getScaleFactor() * 1.4;
		//anchor point
		this.setAnchorPoint(cc.p(0.5, 0));
	},
	onEnter: function() {
		this._super();
	},
	fire: function() {
		this.runAction(Bomb.fireAction);
	},
	boom: function() {
		this.stopAllActions();
		this.runAction(
			cc.sequence(
				Bomb.boomAction,
				new cc.CallFunc(
					function() {
						PlayScene.gameLayer.removeGameObject(this)
					}, this
				)
			)
		);
	},

	setPositionFromTwoPoints: function(firstPoint, secondPoint, offset) {
		var liam = ( offset / 100 )
		var x = (firstPoint.x + liam * secondPoint.x) / ( 1 + liam );
		var y = (firstPoint.y + liam * secondPoint.y) / ( 1 + liam );
		this.setPosition(x, y);
	},

	activity: function() {
		this.boom();
	}
});

Bomb.initActions = function() {
	//fire action
	var FIRE_FRAME_COUNT = 2;
	Bomb.fireAction = Helper.createAnimation(
		"bomb",
		FIRE_FRAME_COUNT,
		0.1,
		"bomb0.png"
	).repeatForever();
	//boom action
	var BOOM_FRAME_COUNT = 3;
	Bomb.boomAction = Helper.createAnimation(
		"boom",
		BOOM_FRAME_COUNT,
		0.1,
		"boom2.png"
	);

};
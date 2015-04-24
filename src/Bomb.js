/**
 * Created by andron94 on 13.03.15.
 */

var Bomb = cc.Sprite.extend({
	activity: null,
	name: "bomb",
	ctor: function() {
		this._super("#bomb0.png");
		//scale relative to aspect ratio
		this.scale = GameSettings.getScaleFactor() * 1.4;
		//anchor point
		this.setAnchorPoint(cc.p(0.5, 0));
	},
	onEnter: function() {
		this._super();
		//set fun action
		this.fire();
	},
	fire: function() {
		this.runAction(Bomb.fireAction.clone());
	},
	boom: function() {
		this.stopAllActions();
		this.runAction(
			cc.sequence(
				new cc.CallFunc(
					function() {
						PlayScene.gameLayer.pause();
						cc.director.runScene(PlayScene.scene());
					}, null
				),
				Bomb.boomAction
			)
		);
	},
	setPositionFromTwoPoints: function(firstPoint, secondPoint, offset) {
		var liam = (offset / 100);
		var x = firstPoint.x + (secondPoint.x - firstPoint.x) * liam;
		var y = firstPoint.y + (secondPoint.y - firstPoint.y) * liam;
		this.setPosition(x, y);
	},
	setActivity: function(dir) {
		var angle = Helper.getAngle(cc.p(0, 1), dir);
		if (dir.x < 0.0) {
			angle = -angle;
		}
		this.setRotation(angle);
	},
	activity: function() {
		this.boom();

	},
	getCollideRect: function() {
		var w = this.width * GameSettings.getScaleFactor() * 1.4;
		var h = this.height * GameSettings.getScaleFactor() * 1.4;
		return cc.rect(this.x - w / 4, this.y + w / 4, w / 1.5, h / 1.5);
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
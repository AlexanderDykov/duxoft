/**
 * Created by andron94 on 13.03.15.
 */

var Monster = cc.Sprite.extend({
	moveAction: null,
	//eatAction: null,
	speed: 3,
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
	eat: function(objectName) {
		if (objectName === "bomb") {
			this.runAction(Monster.eatAction);
		} else {
			this.runAction(
				cc.sequence(
					new cc.CallFunc(
						function() {
							PlayScene.gameLayer.pause();
							cc.director.runScene(PlayScene.scene());
						}, null
					),
					Monster.eatAction
				)
			);
		}
	},
	getCollideRect: function() {
		var w = this.width * GameSettings.getScaleFactor();
		var h = this.height * GameSettings.getScaleFactor();
		return cc.rect(this.x + w / 4, this.y, w / 100, h / 2);
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
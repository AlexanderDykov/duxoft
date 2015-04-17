/**
 * Created by andron94 on 06.04.15.
 */

var PlayScene = cc.Scene.extend({
	onEnter: function() {
		this._super();

		this.addChild(new BackgroundLayer());
		this.addChild(new GameLayer());
		this.addChild(new StatusLayer());
	}
});
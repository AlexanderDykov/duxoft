/**
 * Created by andron94 on 06.04.15.
 */

var RestartLayer = cc.Layer.extend({
    ctor: function() {
        this._super();
        this.init();
    },
    init: function() {
        this._super();

        var tenthOfWidth = GameSettings.tenthOfWidth();
        var tenthOfHeight = GameSettings.tenthOfHeight();
        //user interface
        var back_btn = new cc.MenuItemImage(
            "#back_unpressed.png",
            "#back_pressed.png",
            null,
            this.backToMenu,
            this
        );
        back_btn.setPosition(cc.p(0,0));
        back_btn.setScale(GameSettings.getScaleFactor());
        var menu = new cc.Menu(back_btn);
        menu.setPosition(tenthOfWidth, tenthOfHeight * 9);
        //add items to layer
        this.addChild(menu, 1);
    },
    backToMenu: function() {
        cc.director.popScene();
    }
});

RestartLayer.scene = function() {
    var scene = new cc.Scene();
    var layer = new RestartLayer();
    scene.addChild(layer);
    return new cc.TransitionFade(0.5, scene);
};


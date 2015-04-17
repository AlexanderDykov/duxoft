/**
 * Created by andron94 on 06.04.15.
 */

var StatusLayer = cc.Layer.extend({
    ctor: function() {
        this._super();
        this.init();
    },
    init: function() {
        this._super();

        var size = cc.director.getWinSize();
        var tenthOfWidth = size.width / 10;
        var tenthOfHeight = size.height / 10;
        //user interface
        var back_btn = new cc.MenuItemImage(
            "#back_unpressed.png",
            "#back_pressed.png",
            null,
            this.backToMenu,
            this
        );
        back_btn.setPosition(cc.p(0,0));
        var menu = new cc.Menu(back_btn);
        menu.setPosition(tenthOfWidth, tenthOfHeight * 9);
        //add items to layer
        this.addChild(menu, 1);
    },
    backToMenu: function() {
        cc.director.popScene();
    }
});
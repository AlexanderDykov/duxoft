/**
 * Created by andron94 on 06.04.15.
 */

var BackgroundLayer = cc.Layer.extend({
    ctor:function() {
        this._super();
        this.init();
    },
    init : function() {
        this._super();

        var size = cc.director.getWinSize();
        var tenthOfWidth = size.width / 10;
        var tenthOfHeight = size.height / 10;
        //background
        var background = cc.LayerGradient.create(cc.color(0,0,0,255),
            cc.color(0x46,0x82,0xB4,255));
        //add items to layer
        this.addChild(background,0);
    }
});
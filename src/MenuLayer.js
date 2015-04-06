
var MenuLayer = cc.Layer.extend({
    ctor: function () {
        this._super();
        this.init();
    },
    init: function() {
        var size = cc.director.getWinSize();
        var tenthOfWidth = size.width / 10;
        var tenthOfHeight = size.height / 10;
        //create menu items
        var level_lbl = new cc.LabelTTF("Level", "Helvetica", 28, 32, cc.size(320,32), cc.TEXT_ALIGNMENT_CENTER);
        level_lbl.setPosition( new cc.Point(5*tenthOfWidth, 9*tenthOfHeight) );

        var levelNumber_lbl_tmp = new cc.LabelTTF("42", "Helvetica", 24, 32, cc.size(320,32), cc.TEXT_ALIGNMENT_CENTER);
        levelNumber_lbl_tmp.setPosition( new cc.Point(5*tenthOfWidth, 8*tenthOfHeight) );

        var levelNext_btn = new cc.MenuItemFont(">", this.setNextLevel, this);
        levelNext_btn.setPosition(new cc.Point(tenthOfWidth*3,tenthOfHeight*3));

        var levelPrev_btn = new cc.MenuItemFont("<", this.setPrevLevel, this);
        levelPrev_btn.setPosition(new cc.Point(-tenthOfWidth*3,tenthOfHeight*3));

        var play_btn = new cc.MenuItemFont("Play", this.play, this);
        play_btn.setPosition(new cc.Point(0,tenthOfHeight*2));

        var musicSwitch_btn = new cc.MenuItemFont("Music", this.switchMusic, this);
        musicSwitch_btn.setPosition(new cc.Point(-tenthOfWidth,-tenthOfHeight*3));

        var soundSwitch_btn = new cc.MenuItemFont("Sound", this.switchSound, this);
        soundSwitch_btn.setPosition(new cc.Point(-tenthOfWidth,-tenthOfHeight*4));
        //create menu
        var menu = new cc.Menu(levelNext_btn, levelPrev_btn,
            play_btn, musicSwitch_btn, soundSwitch_btn);
        menu.setPosition(size.width/2,size.height/2);
        //add items to layer
        this.addChild(level_lbl);
        this.addChild(levelNumber_lbl_tmp);
        this.addChild(menu);
        cc.log("menu was added");
        return true;
    },
    play : function() {
        var scene = GameLayer.scene();
        cc.director.pushScene(new cc.TransitionFade(1.2,scene));
    },
    switchMusic : function() {
        cc.log("music");
    },
    switchSound : function() {
        cc.log("sound");
    },
    setNextLevel : function() {
        cc.log("next level");
    },
    setPrevLevel : function() {
        cc.log("prev level");
    }

});


MenuLayer.scene = function() {
    var scene = new cc.Scene();
    var layer = new MenuLayer();
    scene.addChild(layer);
    return scene;
};


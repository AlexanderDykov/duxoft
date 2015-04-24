var MenuLayer = cc.Layer.extend({
    levelNumber_lbl_tmp: null,
    musicValue: null,
    soundValue: null,
    ctor: function() {
        this._super();
        this.init();
    },
    init: function() {
        this._super();
        //create sprite sheet
        cc.spriteFrameCache.addSpriteFrames(res.TextSprites_plist);
        this.spriteSheet = new cc.SpriteBatchNode(res.TextSprites_png);
        this.addChild(this.spriteSheet);
        //background
        //var background = cc.LayerGradient.create(cc.color(0x00, 0x00, 0x00, 255),
        //    cc.color(0xCF, 0x4A, 0xFF, 255));
        var background = cc.LayerGradient.create(cc.color(0xEE, 0xEE, 0xEE, 255),
            cc.color(0xEE, 0xEE, 0xEE, 255));
        //add items to layer
        this.addChild(background);
        //set layout of screen
        var size = cc.director.getWinSize();
        GameSettings.init(size);
        Level.init(size);
        var tenthOfWidth = GameSettings.tenthOfWidth();
        var tenthOfHeight = GameSettings.tenthOfHeight();
        //create menu items
        var level_lbl = new cc.Sprite("#level.png");
        level_lbl.setPosition(cc.p(5 * tenthOfWidth, 9 * tenthOfHeight));
        level_lbl.setScale(GameSettings.getScaleFactor());

        this.levelNumber_lbl_tmp = new LevelNumber(this, cc.p(5 * tenthOfWidth, 8 * tenthOfHeight));
        this.levelNumber_lbl_tmp.setNumber(Level.getCurrentLevel());
        this.levelNumber_lbl_tmp.setScale(GameSettings.getScaleFactor());

        var levelNext_btn = new cc.MenuItemImage(
            "#right_unpressed.png",
            "#right_pressed.png",
            "#right_neutral.png",
            this.setNextLevel,
            this
        );
        levelNext_btn.setPosition(cc.p(tenthOfWidth * 3, tenthOfHeight * 3));
        levelNext_btn.setScale(GameSettings.getScaleFactor());

        var levelPrev_btn = new cc.MenuItemImage(
            "#left_unpressed.png",
            "#left_pressed.png",
            "#left_neutral.png",
            this.setPrevLevel,
            this
        );
        levelPrev_btn.setPosition(cc.p(-tenthOfWidth * 3, tenthOfHeight * 3));
        levelPrev_btn.setScale(GameSettings.getScaleFactor());

        var play_btn = new cc.MenuItemImage(
            "#play_unpressed.png",
            "#play_pressed.png",
            "#play_neutral.png",
            this.play,
            this
        );
        play_btn.setPosition(cc.p(0, tenthOfHeight * 2));
        play_btn.setScale(GameSettings.getScaleFactor());

        var musicSwitch_btn = new cc.MenuItemImage(
            "#music.png",
            "#music.png",
            "#music.png",
            this.switchMusic,
            this
        );
        musicSwitch_btn.setPosition(cc.p(-tenthOfWidth, -tenthOfHeight * 3));
        musicSwitch_btn.setScale(GameSettings.getScaleFactor());

        this.musicValue = new cc.Sprite("#on.png");
        this.musicValue.setPosition(cc.p(tenthOfWidth * 6, tenthOfHeight * 2));
        this.musicValue.setScale(GameSettings.getScaleFactor());

        var soundSwitch_btn = new cc.MenuItemImage(
            "#sound.png",
            "#sound.png",
            "#sound.png",
            this.switchSound,
            this
        );
        soundSwitch_btn.setPosition(cc.p(-tenthOfWidth, -tenthOfHeight * 4));
        soundSwitch_btn.setScale(GameSettings.getScaleFactor());

        this.soundValue = new cc.Sprite("#on.png");
        this.soundValue.setPosition(cc.p(tenthOfWidth * 6, tenthOfHeight * 1));
        this.soundValue.setScale(GameSettings.getScaleFactor());
        //create menu
        var menu = new cc.Menu(levelNext_btn, levelPrev_btn,
            play_btn, musicSwitch_btn, soundSwitch_btn);
        menu.setPosition(size.width / 2, size.height / 2);
        //add items to layer
        this.addChild(level_lbl);
        this.addChild(this.musicValue);
        this.addChild(this.soundValue);
        this.addChild(menu);
        this.schedule(this.update, 1/5, cc.REPEAT_FOREVER, 0, "updateMenuLayer");
        cc.log("menu was added");
    },
    update: function() {
        this.levelNumber_lbl_tmp.setNumber(Level.getCurrentLevel());
    },
    play: function() {
        var scene = new PlayScene();
        cc.director.pushScene(new cc.TransitionFade(0.5, scene));
    },
    switchMusic: function() {
        var pos = cc.p(GameSettings.tenthOfWidth() * 6,
            GameSettings.tenthOfHeight() * 2);
        GameSettings.switchMusic();
        if (GameSettings.isMusicOn()) {
            this.musicValue = Helper.replaceSprite(this, this.musicValue, "#on.png", pos);
        } else {
            this.musicValue = Helper.replaceSprite(this, this.musicValue, "#off.png", pos);
        }
        cc.log("music");
    },
    switchSound: function() {
        var pos = cc.p(GameSettings.tenthOfWidth() * 6,
            GameSettings.tenthOfHeight() * 1);
        GameSettings.switchSound();
        if (GameSettings.isSoundOn()) {
            this.soundValue = Helper.replaceSprite(this, this.soundValue, "#on.png", pos);
        } else {
            this.soundValue = Helper.replaceSprite(this, this.soundValue, "#off.png", pos);

        }
        cc.log("sound");
    },
    setNextLevel: function() {
        Level.nextOpenLevel();
        this.levelNumber_lbl_tmp.setNumber(Level.getCurrentLevel());
        cc.log("next level");
    },
    setPrevLevel: function() {
        Level.prevOpenLevel();

        this.levelNumber_lbl_tmp.setNumber(Level.getCurrentLevel());
        cc.log("prev level");
    }

});


MenuLayer.scene = function() {
    var scene = new cc.Scene();
    var layer = new MenuLayer();
    scene.addChild(layer);
    return new cc.TransitionSlideInT(1.2, scene);
};
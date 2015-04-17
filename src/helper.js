/**
 * Created by andron94 on 14.03.15.
 */

var Helper = function() {
    //PRIVATE
    //INTERFACE
    return {
        getRandomInt: function(min, max) {
            return Math.floor(Math.random() * (max - min + 1)) + min;
        },
        getAngle: function(v1, v2) {
            return cc.pAngle(v1, v2) * 180 / Math.PI;
        },
        createAnimation: function(name, frameCount, frameRate, origName) {
            var frames = [];
            for (var i = 0; i < frameCount; i++) {
                var str = name + i + ".png";
                var frame = cc.spriteFrameCache.getSpriteFrame(str);
                frames.push(frame);
            };
            frames.push(cc.spriteFrameCache.getSpriteFrame(origName));
            var animAction = new cc.Animate(new cc.Animation(frames, frameRate));
            return animAction;
        },
        createDualAnimation: function(name, frameCount, frameRate, origName) {
            var frames = [];
            for (var i = 0; i < frameCount; i++) {
                var str = name + i + ".png";
                var frame = cc.spriteFrameCache.getSpriteFrame(str);
                frames.push(frame);
            };
            for (var i = frameCount - 2; i >= 0; i--) {
                var str = name + i + ".png";
                var frame = cc.spriteFrameCache.getSpriteFrame(str);
                frames.push(frame);
            };
            frames.push(cc.spriteFrameCache.getSpriteFrame(origName));
            var animAction = new cc.Animate(new cc.Animation(frames, frameRate));
            return animAction;
        },
        replaceSprite: function(parent, sprite, textureName, pos) {
            parent.removeChild(sprite);
            sprite = new cc.Sprite(textureName);
            sprite.setPosition(pos);
            parent.addChild(sprite);
            return sprite;
        }
    };
}();

var jumpToDir = function(duration, dir, height, rabbit) {
    var moveUp = cc.moveBy(duration / 2, cc.p(dir.x * height, dir.y * height))
        .easing(cc.easeOut(duration));
    var moveDown = cc.moveBy(duration / 2, cc.p(-dir.x * height, -dir.y * height))
        .easing(cc.easeIn(duration * 2));
    var init = function() {
        rabbit.isJumpDone = false;
    }
    var finish = function() {
        rabbit.isJumpDone = true;
    }
    var spaw = cc.spawn(cc.sequence(moveUp, moveDown), rabbit.jumpAnimation);
    var seq = cc.sequence(new cc.CallFunc(init, null), spaw, new cc.CallFunc(finish, null));


    return seq;
}
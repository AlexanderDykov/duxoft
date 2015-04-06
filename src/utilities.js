/**
 * Created by andron94 on 14.03.15.
 */

var jumpToDir = function( duration, dir, height, rabbit ){
    var moveUp = cc.moveBy(duration/2, cc.p(dir.x*height,dir.y*height))
        .easing(cc.easeOut(duration));
    var moveDown = cc.moveBy(duration/2,cc.p(-dir.x*height,-dir.y*height))
        .easing(cc.easeIn(duration*2));
    var init = function(){
        rabbit.isJumpDone = false;
    }
    var finish = function(){
        rabbit.isJumpDone = true;
    }
    var spaw = cc.spawn(cc.sequence(moveUp,moveDown),rabbit.jumpAnimation);
    var seq = cc.sequence(new cc.CallFunc(init,null), spaw,new cc.CallFunc(finish,null));


    return seq;
}

var getRandomInt = function( min, max ){
    return Math.floor(Math.random()*(max-min+1))+min;
}

var getAngle = function( v1, v2 ){
    return cc.getAngle()*180/Math.PI;
}

var generateLinearPath = function(){
//TODO: make template, generate from template
}

var drawLinearPath = function( painter, path ){
    var i =0;
    for(; i < path.length-1; i+=1){
        painter.drawSegment( path[i], path[i+1] );
    }
}


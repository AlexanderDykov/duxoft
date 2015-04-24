/**
 * Created by andron94 on 14.03.15.
 */

var Level = function() {
    //PRIVATE
    var isInit = false;
    var currLevel = -1;
    var opennedLevels = -1;
    var unitX = 0;
    var unitY = 0;
    var monster_ = null;
    var drawer_ = null;
    var NUM_BY_POINT = 2; //two numbers for one point
    var MAX_COUNT_LVL = 5;
    var UNIT_LENGTH = 20;

    var isNotControlChar = function(character) {
        return character !== ' ' && character !== '\n' && character !== '\r' && character !== '\t' && character !== '\0' && typeof character !== 'undefined';
    };

    var getPath = function(data) {
        var path = [];
        var len = data.points.length;
        for (var i = 0; i < data.points.length; i++) {
            path.push(cc.p(data.points[i].x, data.points[i].y));
        }
        return path;
    };

    var pointUpdate = function(data) {
        for (var i = 0; i < data.points.length; i++) {
            data.points[i].x *= unitX;
            data.points[i].y *= unitY;
        }
    }

    var drawLinearPath = function(path) {
        var len = path.length;
        for (var i = 0; i < len - NUM_BY_POINT; i += NUM_BY_POINT) {
            var from = cc.p(path[i], path[i + 1]);
            var to = cc.p(path[i + 2], path[i + 3]);
            drawer_.drawSegment(from, to, 1, new cc.Color(255, 0, 255, 255));
        };
    };

    var drawCurvePath = function(path) {
        drawer_.drawCardinalSpline(path, 0.6, 100, 5, new cc.Color(255, 255, 255, 255));
    };


    var genGameObjects = function(data) {
        //clear prev level data
        GameLayer.gameObjects = [];
        GameLayer.currObject = 0;
        for (var i = 0; i < data.map.length; i++) {
            var object = data.map[i];
            var unit;
            cc.log(data.map.length);
            switch (object.type) {
                case "rabbit":
                    unit = new Rabbit();
                    break
                case "fat rabbit":
                    unit = new FatRabbit();
                    break
                case "bomb":
                    unit = new Bomb();
                    break
            }
            var firstPoint = data.points[object.section - 1];
            var secondPoint = data.points[object.section];
            cc.log(firstPoint, secondPoint, object.offset);
            var direction = cc.pSub(secondPoint, firstPoint);
            var normal = cc.pNormalize(cc.p(-direction.y, direction.x));
            unit.setActivity(normal);
            unit.setPositionFromTwoPoints(firstPoint, secondPoint, object.offset);
            PlayScene.gameLayer.addChild(unit, 2);
            GameLayer.gameObjects.push(unit);
        }
        //var rect = monster_.getCollideRect();
        //var orig = cc.p(rect.x, rect.y);
        //var dest = cc.p(rect.x + rect.width, rect.y + rect.height);
        //drawer_.drawRect(orig, dest, cc.color(255, 255, 255, 0), 1, cc.color(255, 255, 255, 255));
    };

    var setMonsterMoveAction = function(path) {
        cc.log(path);
        var moveMonster = [];
        var len = path.length;
        var initPos = null;
        var initAngle = 0;
        var initNormal = null;
        for (var i = 0; i < len - 1; i++) {
            var from = path[i];
            var to = path[i + 1];
            //create move action
            var direction = cc.pSub(to, from);
            var normal = cc.pNormalize(cc.p(-direction.y, direction.x));
            var angle = Helper.getAngle(normal, cc.p(0, 1));
            cc.log("angle: " + angle + " normal: " + normal.x + " " + normal.y);
            if (normal.x < 0.0) {
                angle = -angle;
            }
            var fromNormalized = cc.p(from.x / unitX, from.y / unitY);
            var toNormalized = cc.p(to.x / unitX, to.y / unitY);
            var segmentLength = cc.pDistance(fromNormalized, toNormalized);
            var spawn = cc.spawn(
                cc.rotateTo(1.0 / monster_.rotate_speed, angle, 0).easing(cc.easeIn(0.5)),
                cc.moveTo(segmentLength / monster_.speed, to)
            );
            moveMonster.push(spawn);
            if (i === 0) {
                initPos = from;
                initAngle = angle;
                initNormal = normal;
            }
        };
        //set action
        monster_.setPosition(initPos);
        monster_.setRotation(initAngle);
        var initMonster = new cc.CallFunc(
            function() {
                monster_.setPosition(initPos);
                monster_.setRotation(initAngle);
            },
            null
        );
        var finishLevel = new cc.CallFunc(
            function() {
                openLevel();
                Level.nextLevel();
                monster_.setPosition(0, 0);
                cc.director.runScene(PlayScene.scene());
            },
            null
        );
        moveMonster.unshift(initMonster);
        moveMonster.push(finishLevel);
        monster_.setMoveAction(cc.sequence(moveMonster));
    };

    var openLevel = function() {
        if ((currLevel + 1) === opennedLevels && opennedLevels < MAX_COUNT_LVL) {
            opennedLevels++;
        }
    };
    //INTERFACE
    return {
        init: function(winSize) {
            unitX = winSize.width / UNIT_LENGTH;
            unitY = winSize.height / UNIT_LENGTH;
            currLevel = 0;
            opennedLevels = 1;
            //set as initialized
            isInit = true;
        },
        load: function(monster, drawer) {
            if (isInit !== true) {
                throw "Level class was not initialized =(";
            }
            monster_ = monster;
            drawer_ = drawer;
            var name = "res/" + (currLevel + 1) + ".json";
            cc.loader.loadJson(name, function(error, data) {
                if (error) {
                    return cc.log("Level loading '" + name + "' failed");
                }
                pointUpdate(data);
                var path = getPath(data);
                drawCurvePath(path);
                setMonsterMoveAction(path);
                genGameObjects(data);
            });
        },
        nextOpenLevel: function() {
            currLevel = (currLevel + 1) % opennedLevels;
        },
        prevOpenLevel: function() {
            currLevel = (currLevel - 1 + opennedLevels) % opennedLevels;
        },
        nextLevel: function() {
            currLevel = (currLevel + 1) % MAX_COUNT_LVL;
        },
        prevLevel: function() {
            currLevel = (currLevel - 1 + MAX_COUNT_LVL) % MAX_COUNT_LVL;
        },
        getCurrentLevel: function() {
            return currLevel + 1;
        }
    };
}();
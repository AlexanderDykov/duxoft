/**
 * Created by andron94 on 14.03.15.
 */

var Level = function() {
    //PRIVATE
    var isInit = false;
    var currLevel = -1;
    var unitX = 0;
    var unitY = 0;
    var monster_ = null;
    var drawer_ = null;
    var NUM_BY_POINT = 2; //two numbers for one point
    var MAX_COUNT_LVL = 30;
    var UNIT_LENGTH = 20;

    var isNotControlChar = function(character) {
        return character !== ' ' && character !== '\n' && character !== '\r' && character !== '\t' && character !== '\0' && typeof character !== 'undefined';
    };

    var getArray = function(txtData) {
        var arr = [];
        var len = txtData.length + 1;
        var num = '';
        for (var i = 0; i < len; i++) {
            if (isNotControlChar(txtData[i])) {
                num = num.concat(txtData[i]); //add new numbers to <num>
            } else {
                if (num !== '') { //check whether <num> has some numbers
                    arr.push(parseInt(num));
                    num = '';
                }
            }
        };
        return arr;
    };

    var getPath = function(arr) {
        var path = [];
        var len = arr.length;
        for (var i = 0; i < len; i += 2) {
            path[i] = arr[i] * unitX;
            path[i + 1] = arr[i + 1] * unitY;
        }
        return path;
    };

    var drawLinearPath = function(path) {
        var len = path.length;
        for (var i = 0; i < len - NUM_BY_POINT; i += NUM_BY_POINT) {
            var from = cc.p(path[i], path[i + 1]);
            var to = cc.p(path[i + 2], path[i + 3]);
            drawer_.drawSegment(from, to, 1, new cc.Color(255, 0, 255, 255));
        };
    };

    var drawCurvePath = function(path) {
        var points = [];
        var len = path.length;
        for (var i = 0; i < len; i += 2) {
            points.push(cc.p(path[i], path[i + 1]));
        }
        drawer_.drawCardinalSpline(points, 0.6, 100, 1, new cc.Color(0, 255, 255, 255));
        cc.log( points);
    };

    var genGameObjects = function(path) {
        var len = path.length;
        for (var i = 0; i < len - NUM_BY_POINT; i += NUM_BY_POINT) {
            var from = cc.p(path[i], path[i + 1]);
            var to = cc.p(path[i + 2], path[i + 3]);
            var direction = cc.pNormalize(cc.pSub(to, from));
            var normal = cc.p(-direction.y, direction.x);
            var dist = cc.pDistance(from, to);

            cc.log("noramal: " + normal.x + " " + normal.y);
            cc.log("dist: " + dist);
            var monster_length = monster_.width;
            var count = Math.floor(dist / monster_length);
            cc.log(count);
            cc.log(direction.x + " " + direction.y);
            for (var j = 0; j < count; j++) {
                var rabb = new Rabbit();
                rabb.setPosition(from.x + direction.x * j * monster_length, from.y + direction.y * j * monster_length);
                GameLayer.some.addChild(rabb, 2);
            };
        };
        cc.log("monster len: " + monster_.width * monster_.scale);
    }

    var setMonsterMoveAction = function(path) {
        cc.log(path);
        var moveMonster = [];
        var len = path.length;
        var initPos = null;
        var initAngle = 0;
        var initNormal = null;
        for (var i = 0; i < len - 2; i += 2) {
            var from = new cc.Point(path[i], path[i + 1]);
            var to = new cc.Point(path[i + 2], path[i + 3]);
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
        var initMonster = new cc.CallFunc(
            function() {
                monster_.setPosition(initPos);
                monster_.setRotation(initAngle);
            },
            null
        );
        moveMonster.unshift(initMonster);
        monster_.setMoveAction(cc.sequence(moveMonster));
    };
    //INTERFACE
    return {
        init: function(winSize) {
            unitX = winSize.width / UNIT_LENGTH;
            unitY = winSize.height / UNIT_LENGTH;
            currLevel = 0;
            //set as initialized
            isInit = true;
        },
        load: function(monster, drawer) {
            if (isInit !== true) {
                throw "Level class was not initialized =(";
            }
            monster_ = monster;
            drawer_ = drawer;
            var name = "res/" + (currLevel + 1) + ".txt";
            cc.loader.loadTxt(name, function(err, data) {
                if (err) {
                    return cc.log("Level loading '" + name + "' failed");
                }
                //process data
                var arr = getArray(data);
                var path = getPath(arr);
                //drawLinearPath(path);
                drawCurvePath(path);
                setMonsterMoveAction(path);
                //genGameObjects(path);
            });
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
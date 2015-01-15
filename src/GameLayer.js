var GameLayer = cc.Layer.extend({
	
	onStart:function(count){
		var size = cc.winSize;
		for(var i=0; i<count; i++)			
		{
			var sizeX = size.width/count;
			cc.log(i.toString());
			GameLayer.Rabbits[i] = new cc.Sprite(res.Rabbit);
			GameLayer.Rabbits[i].attr({
				x : sizeX*(i) +150,
				y : size.height / 2,
				scale : 0.20
			});
			this.addChild(GameLayer.Rabbits[i],0);
		}
		
	},
	
	ctor:function () {
		//////////////////////////////
		// 1. super init first
		this._super();

		var size = cc.winSize;
		this.onStart(3);
		/////////////////////////////
		//my code
		var Monster = new cc.Sprite(res.Enemy);
		Monster.attr({
			x : 10,
			y : size.height / 2,
			scale : 0.5
		});
		this.addChild(Monster,0);
		
		var moveAction = cc.MoveTo.create(4, cc.p(size.width, size.height/2-10));
		Monster.runAction(moveAction);
		
		var time = 1;
		
		
		var eventListener = cc.EventListener.create({
			event: cc.EventListener.MOUSE,
			onMouseDown: function(event)
			{
				GameLayer.jumpAction = cc.JumpBy.create(time, cc.p(0,0),100,1);
				GameLayer.Rabbits[GameLayer.currentRabbit].runAction(GameLayer.jumpAction);
				GameLayer.currentRabbit++;
				if(GameLayer.currentRabbit >= GameLayer.Rabbits.length ){					
					GameLayer.currentRabbit = 0;
				}				
			}
			
		});
		this.scheduleUpdate();

		cc.eventManager.addListener(eventListener, this);

		
		return true;
	},

	update: function(dt){
		//check collisions
		for(var i = 0; i < GameLayer.Rabbits.length; i++){
		//	if( GameLayer.Rabbits[i] )
		}
	}
});



GameLayer.scene = function () {
	var scene = new cc.Scene();
	var layer = new GameLayer();
	scene.addChild(layer, 1);
	return scene;
};
GameLayer.Rabbits = new Array();
GameLayer.currentRabbit = 0;
GameLayer.jumpAction = new cc.Action();
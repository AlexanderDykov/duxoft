var LevelNumber = function(parent, pos) {
	//VARIABLES
	this.firstDigit = null;
	this.secondDigit = null;
	this.firstPos = pos;
	this.secondPos = cc.p(pos.x + GameSettings.tenthOfWidth()/4, pos.y);
	this.parent = parent;
	//METHODS
	this.setNumber = function(number) {
		var firstDigit = Math.floor(number/10);
		var secondDigit = number % 10;
		var firstDigitName = "#" + firstDigit + ".png";
		var secondDigitName = "#" + secondDigit + ".png";
		this.firstDigit = Helper.replaceSprite(
			this.parent,
			this.firstDigit,
			firstDigitName,
			this.firstPos
		);
		this.secondDigit = Helper.replaceSprite(
			this.parent,
			this.secondDigit,
			secondDigitName,
			this.secondPos
		);
	};
}
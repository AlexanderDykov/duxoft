var GameSettings = function() {
	//PRIVATE
	var musicOn = true;
	var soundOn = true;
	var tenthOfWidth_ = -1;
	var tenthOfHeight_ = -1;
	//INTERFACE
	return {
		init: function(size) {
			tenthOfWidth_ = size.width / 10;
			tenthOfHeight_ = size.height / 10;
		},
		isMusicOn: function() {
			return musicOn;
		},
		isSoundOn: function() {
			return soundOn;
		},
		switchMusic: function() {
			musicOn = !musicOn;
		},
		switchSound: function() {
			soundOn = !soundOn;
		},
		tenthOfWidth: function() {
			return tenthOfWidth_;
		},
		tenthOfHeight: function() {
			return tenthOfHeight_;
		}
	};
}();
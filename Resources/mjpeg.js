exports.get = function(ndx, camera, gallery) {
	var topvisible = true;
	var bottomvisible = true;
	var movieurl = 'http://' + camera.u + '/axis-cgi/mjpg/video.cgi';
	var html = '<html><body style="padding:0px;margin:0px;"><img width="480" height="320" src="' + movieurl + '"></body></html>';
	var self = Ti.UI.createView({
		width : Ti.UI.FILL,
		height : Ti.UI.FILL
	});
	self.web = Ti.UI.createWebView({
		disableBounce : true,
		html : html,
		width : Ti.UI.FILL,
		height : Ti.UI.FILL
	});
	self.add(self.web);
	self.overlay = camera.preview;
	self.add(self.overlay);
	self.web.addEventListener('load', function() {
		self.overlay.animate(Ti.UI.createAnimation({
			opacity : 0
		}));
		Ti.App.fireEvent('app:ready');
	});
	self.bottomcontainer = Ti.UI.createView({
		backgroundColor : 'black',
		bottom : 0,
		height : 60,
		opacity : 0.7,
		height : 60
	});
	var clockview = Ti.UI.createLabel({
		color : 'white',
		font : {
			fontFamily : 'AlienEncountersBold',
			fontSize : 35,
		},
		bottom : 5,
		right : 5,
		height : 40
	});
	Ti.App.addEventListener('timetick', function() {
		var time = require('moment').utc().add('h', camera.tz).format('H:mm') + ' ч.';
		clockview.text = time
	});
	self.add(self.bottomcontainer)
	self.bottomcontainer.add(clockview);
	try {
		self.title = Ti.UI.createLabel({
			text : camera.a.split('\n')[0],
			color : 'white',
			top : 7,
			height : 28,
			left : 15,
			font : {
				fontFamily : 'TimesNewRomanPS-BoldItalicMT',
				fontSize : 25
			}

		});
		self.text = Ti.UI.createLabel({
			text : camera.a.split('\n')[1],
			color : 'white',
			top : 40,
			left : 15,
			height : 17,
			font : {
				fontFamily : 'TimesNewRomanPS-BoldItalicMT'
			}
		});
		self.bottomcontainer.add(self.title);
		self.bottomcontainer.add(self.text);
	} catch (E) {
	}
	var show1 = Ti.UI.createAnimation({
		top : 0
	});
	var show2 = Ti.UI.createAnimation({
		bottom : 0
	});
	var hide1 = Ti.UI.createAnimation({
		top : -64,
		duration : 700
	});
	var hide2 = Ti.UI.createAnimation({
		bottom : -64,
		duration : 700
	});
	show1.addEventListener('complete', function() {
		topvisible = true;
	});
	show2.addEventListener('complete', function() {
		bottomvisible = true;
	});
	hide1.addEventListener('complete', function() {
		topvisible = false;
	});
	hide2.addEventListener('complete', function() {
		bottomvisible = false;
	});
	setTimeout(function() {
		gallery.animate(hide1);
	}, 5000);
	self.addEventListener('click', function(_e) {
		Ti.API.log(_e.globalPoint.x);
		if (_e.globalPoint.x < 64) {
			if (topvisible == true) {
				gallery.animate(hide1);
			} else {
				gallery.animate(show1);
				setTimeout(function() {
					gallery.animate(hide1);
				}, 5000);
			}
		}
		if (_e.globalPoint.x > 280) {
			if (bottomvisible) {
			} else {
				self.bottomcontainer.animate(show2);
			}
		}
	});
	self.bottomcontainer.addEventListener('click', function(_e) {
		Ti.API.log('BOTTOM CLICK');
		gallery.animate(show1);
		self.bottomcontainer.animate(hide2);
		require('dialog').create(camera);
		
	});
	Ti.App.addEventListener('resume', function() {
		self.web.reload();
	});
	return self;
}

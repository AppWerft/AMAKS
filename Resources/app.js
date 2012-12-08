//
// create base UI tab and root window
//
Ti.include('CAMERAS.js');

Ti.App.mapview = require('mapview').create(cameras);
var views = [];
var gallery = Ti.UI.createScrollView({
	top : 0,
	height : 64,
	contentHeight : 64,
	showHorizontalScrollIndicator : true,
	contentWidth : Ti.UI.SIZE
});

for (var i = 0; i < cameras.length; i++) {
	var url = 'http://' + cameras[i].u + '/axis-cgi/jpg/image.cgi';
	Ti.API.log('URL=' + url);
	
	cameras[i].thumbnail = Ti.UI.createImageView({
		image : url,
		width : 96,
		mainview : views[i],
		ndx : i,
		height : 64,
		//	opacity : (i == 0) ? 1 : 0.7,
		left : i * 100,
		defaultImage : '/Default.png',
	});
	gallery.add(cameras[i].thumbnail);
	require('cachedimage').cache('cache2', url, cameras[i].thumbnail, false);
	cameras[i].preview = Ti.UI.createImageView({
		image : url,
		width : 480,
		//	mainview : views[i],
		ndx : i,
		height : 320,
		defaultImage : '/Default.png',
	});
	require('cachedimage').cache('cache2', url, cameras[i].preview, true);
	views[i] = require('mjpeg').get(i, cameras[i], gallery);

	cameras[i].thumbnail.addEventListener('click', function(_e) {

		Ti.App.scrollview.removeEventListener('scroll', scrollTo);
		Ti.App.scrollview.scrollToView(views[_e.source.ndx]);
		setTimeout(function() {
			Ti.App.scrollview.addEventListener('scroll', scrollTo);
		}, 700);
	});
	cameras[i].ndx = i;

}

var scrollTo = function(_e) {
	gallery.scrollTo((_e.currentPage) * 100, 0);
};

var overlay = Ti.UI.createImageView({
	image : '/Default.png',
	width : Ti.UI.FILL,
	height : Ti.UI.FILL
});
Ti.App.addEventListener('app:ready', function() {
	setTimeout(function() {
		overlay.animate(Ti.UI.createAnimation({
			opacity : 0,
			duration : 700
		}));
	}, 1000);
});

Ti.App.scrollview = Ti.UI.createScrollableView({
	views : [],
	cacheSize : 1
});

var win1 = Titanium.UI.createWindow({
	backgroundColor : '#911616',
	orientationModes : [Titanium.UI.LANDSCAPE_LEFT, Titanium.UI.LANDSCAPE_RIGHT]
});
win1.open();
Ti.App.scrollview.views = views;

Ti.App.scrollview.addEventListener('scroll', scrollTo);

win1.add(Ti.App.scrollview);
win1.add(overlay);
win1.add(gallery);
win1.add(Ti.App.mapview);

setInterval(function() {
	Ti.App.fireEvent('timetick')
}, 5000);


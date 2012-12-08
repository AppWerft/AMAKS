exports.create = function(_cameras) {
	var self = Ti.UI.createView({
		zIndex : 999
	});
	var cameras = [];
	var bounds = {
		"latmin" : _cameras[0].ll.split(',')[0],
		"lonmin" : _cameras[0].ll.split(',')[1],
		"latmax" : _cameras[0].ll.split(',')[0],
		"lonmax" : _cameras[0].ll.split(',')[1]
	};
	var map = Ti.Map.createView({
		region : {
			latitude : 0,
			longitude : 0,
			latitudeDelta : 90,
			longitudeDelta : 90
		},
		mapType : Ti.Map.HYBRID_TYPE
	});
	for (var i = 0; i < _cameras.length; i++) {
		var lat = _cameras[i].ll.split(',')[0];
		var lon = _cameras[i].ll.split(',')[1];
		if (lat > bounds.latmax)
			bounds.latmax = lat;
		if (lon > bounds.lonmax)
			bounds.lonmax = lon;
		if (lat < bounds.latmin)
			bounds.latmin = lat;
		if (lon < bounds.lonmin)
			bounds.lonmin = lon;
		cameras.push(Ti.Map.createAnnotation({
			latitude : lat,
			longitude : lon,
			title : _cameras[i].a.split('\n')[0],
			ndx : i,
			leftView : Ti.UI.createImageView({
				image : '/flags/' + i + '.png',
				width : 64,
				height : 32
			}),
			subtitle : _cameras[i].a.split('\n')[1],
			rightButton : Ti.UI.iPhone.SystemButton.DISCLOSURE,
			image : '/pin.png',
			animate : true,
		}));
	}
	self.region = {
		latitude : (parseFloat(bounds.latmax) + parseFloat(bounds.latmin)) / 2,
		longitude : (parseFloat(bounds.lonmax) + parseFloat(bounds.lonmin)) / 2,
		latitudeDelta : (bounds.latmax - bounds.latmin),
		longitudeDelta : (bounds.lonmax - bounds.lonmin),
		animate : true
	};
	map.addAnnotations(cameras);
	map.addEventListener('click', function(_e) {
		if (_e.clicksource == 'rightButton') {
			var ndx = _e.annotation.ndx;
			self.animate(Ti.UI.createAnimation({
				opacity : 0
			}));
			Ti.App.scrollview.scrollToView(ndx);
		}
	});
	self.add(map);
	setTimeout(function() {
		map.setLocation(self.region);
	}, 10);
	self.addEventListener('showcamera', function(_e) {
		map.selectAnnotation(cameras[_e.camera.ndx]);
		var options = {
			latitude : _e.camera.ll.split(',')[0],
			longitude : _e.camera.ll.split(',')[1],
			latitudeDelta : 0.01,
			longitudeDelta : 0.01,
			animate : true
		};
		Ti.API.log(options);
		map.setLocation(options);
	});
	return self;
};

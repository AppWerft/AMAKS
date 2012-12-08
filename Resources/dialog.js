exports.create = function(camera) {
	var opts = {
		cancel : 2,
		options : ['Перейти к карте', 'Звонить в отель ', 'Отмена'],
		destructive : 0,
		title : camera.a.split('\n')[0]
	};
	var dialog = Ti.UI.createOptionDialog(opts);
	dialog.show();
	dialog.addEventListener('click', function(_e) {
		Ti.API.log(_e);
		if (_e.index == 0) {
			Ti.App.mapview.animate(Ti.UI.createAnimation({
				opacity : 1
			}));
			Ti.API.log(camera);
			Ti.App.mapview.fireEvent('showcamera', {
				camera : camera
			});
		}
	});
}

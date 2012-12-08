exports.cache = function(imageDirectoryName, url, imageViewObject, hires) {
	var isFresh = function(file) {
		//return false;
		if (file && file.exists()) {
			var moment = require('moment');
			var timestamp = file.modificationTimestamp();
			var mtime = moment(timestamp);
			var now = moment();
			
			if (now.diff(mtime) > 24*3600 *1000)
				return false;
			
		}
		return true;
	}
	var filename = Titanium.Utils.md5HexDigest(url) + '.jpg';
	var hiresfilename;
	hiresfilename = filename.split('.');
	hiresfilename = hiresfilename[hiresfilename.length - 2] + '@2x' + hiresfilename[hiresfilename.length - 1];
	var file = Ti.Filesystem.getFile(Ti.Filesystem.applicationDataDirectory, imageDirectoryName, filename);
	var hiresfile = Ti.Filesystem.getFile(Ti.Filesystem.applicationDataDirectory, imageDirectoryName, hiresfilename);

	if (isFresh(file)) {
		imageViewObject.image = file.nativePath;
	} else {
		var g = Ti.Filesystem.getFile(Ti.Filesystem.applicationDataDirectory, imageDirectoryName);
		if (!g.exists()) {
			g.createDirectory();
		};
		var xhr = Ti.Network.createHTTPClient();
		xhr.onload = function() {
			if (xhr.status == 200) {
				file.write(xhr.responseData);
				file.remoteBackup = false;
				if (hires) {
					hiresfile.write(xhr.responseData);
					hiresfile.remoteBackup = false;
				}
				imageViewObject.image = file.nativePath;
			};
		};
		xhr.open('GET', url);
		xhr.send();
	};
};

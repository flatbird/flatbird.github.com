(function() {

function GooglePlayApps() {
	Model.call(this);
}

GooglePlayApps.prototype = Object.create(Model.prototype);

GooglePlayApps.prototype.getPath = function getPath() {
	return '/data/gp-cordova.json';
};

window.GooglePlayApps = new GooglePlayApps();

})();
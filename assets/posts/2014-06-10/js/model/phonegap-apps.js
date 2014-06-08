(function() {

function PhoneGapApps() {
	Model.call(this);
}

PhoneGapApps.prototype = Object.create(Model.prototype);

PhoneGapApps.prototype.getPath = function getPath() {
	return '/data/pg-apps.json';
};

window.PhoneGapApps = new PhoneGapApps();

})();
(function() {

function CordovaPlugins() {
	Model.call(this);
}

CordovaPlugins.prototype = Object.create(Model.prototype);

CordovaPlugins.prototype.getPath = function getPath() {
	return '/data/plugin-rank.json';
};

window.CordovaPlugins = new CordovaPlugins();

})();
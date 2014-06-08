(function() {

function Model() {
	this.base = $('base').attr('href').split('/').slice(0, -1).join('/');
	this.data = null;
	this.callbacks = [];
}

Model.prototype.getPath = function getPath() {
	return '';
};

Model.prototype.getData = function getData(callback) {
	var self = this;
	if (self.data) {
		callback(self.data);
	} else {
		if (self.callbacks.length <= 0) {
			var url = self.base + self.getPath();
			jQuery.getJSON(url, function(data) {
				self.data = data;
				self.callbacks.forEach(function(cb) {
					cb(data);
				});
				self.callbacks.length = 0; // clear
			});
		}
		self.callbacks.push(callback);
	}
};

window.Model = Model;

})();

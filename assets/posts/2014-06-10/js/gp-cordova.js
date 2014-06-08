(function(){
	'use strict';

	function ViewModel() {
		this.categoryCount = Object.keys(categoryName).length;
		this.totalCount = ko.observable();
		this.totalUnique = ko.observable();
		this.totalApk = ko.observable();
		this.targetApps = ko.observableArray();
		this.targetCount = ko.computed(function() {
			return this.targetApps().length;
		}, this);
		this.percent = ko.computed(function() {
			var total = this.totalApk();
			if (total === 0) {
				return 0;
			}
			var percent = (this.targetCount() / (total * 1.0)) * 100;
			percent = Math.round(percent*100)/100;
			return percent;
		}, this);
	}

	function GpCordova(viewId, appsKind, filter) {
		var self = this;
		self.viewId = viewId;
		self.viewModel = new ViewModel();
		ko.applyBindings(self.viewModel, $('#'+viewId)[0]);
		GooglePlayApps.getData(function(obj) {
			self.viewModel.totalCount(obj.totalAppCount);
			self.viewModel.totalUnique(obj.uniqueAppCount);
			self.viewModel.totalApk(obj.totalApkCount);
			prepareApps(obj[appsKind], filter);
		});
		function prepareApps(apps, filter) {
			if (filter) {
				apps = apps.filter(filter);
			}
			apps = apps.sort(compApps);
			apps.forEach(function (app) {
				app.href = 'https://play.google.com/store/apps/details?id=' + app.package;
				self.viewModel.targetApps.push(app);
			});
			function compApps(a1, a2) {
				return dlCount(a2) - dlCount(a1);
			}
			function dlCount(app) {
				if (!app.downloadCount) {
					return 0;
				}
				return parseInt(app.downloadCount.split('\uff5e')[0].replace(/,/g, ''), 10);
			}
		}
	}

	window.GpCordova = GpCordova;
})();

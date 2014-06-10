(function(){
	'use strict';

	function ViewModel() {
		this.categoryApps = ko.observableArray();
	}
	var pgCategories = {
		chart: undefined,
		categoryCount: undefined,
		exportCategoryCount: 10,
		exportAppCount: 5,
		// range is an array to specify slice(start, end) of categories
		show: function _spShow(viewId, chartId, range) {
			var self = this;
			self.chartId = chartId;
			self.viewModel = new ViewModel();
			ko.applyBindings(self.viewModel, $('#'+viewId)[0]);
			PhoneGapApps.getData(function(obj) {
				self.countCategories(obj.pgApps);
				self.prepareExportApps();
				self.showChart(range);
			});
		},
		prepareExportApps: function () {
			var categories = this.categoryCount;
			for (var i = 0; i < categories.length && i < this.exportCategoryCount; i++) {
				var cat = categories[i];
				var obj = { name: categoryName[cat.name], apps: undefined };
				var apps = cat.apps.map(pickAndroid).sort(compApps);
				apps = apps.slice(0, Math.min(this.exportAppCount, apps.length));
				apps.forEach(addHref);
				obj.apps = apps;
				this.viewModel.categoryApps.push(obj);
			}
			function pickAndroid(app) {
				return app.platforms.android;
			}
			function compApps(a1, a2) {
				return dlCount(a2) - dlCount(a1);
			}
			function dlCount(app) {
				if (!app.downloadCount) {
					return 0;
				}
				return parseInt(app.downloadCount.split('\uff5e')[0].replace(/,/g, ''), 10);
			}
			function addHref(app) {
				app.href = 'https://play.google.com/store/apps/details?id=' + app.package;
			}
		},
		showChart: function _pgShowChart(range) {
			var cat = this.categoryCount;
			var height = 600;
			if (range) {
				cat = cat.slice(range[0], range[1]);
				height = 40 * cat.length;
			}
			var names  = cat.map(function (c) { return categoryName[c.name]; });
			var counts = cat.map(function (c) { return c.count; });
			var labelStyle = {};
			// labelStyle.fontSize = '18px';

			var params = {
				title: 'Categories',
				chart: {
					renderTo: this.chartId,
					height: height
				},
				// colors: colors,
				xAxis: {
					categories: names,
					labels: { style: labelStyle }
				},
				yAxis: {
					title: { text: null }
				},
				plotOptions: {
					bar: { dataLabels: { enabled: true, style: labelStyle } }
				},
				legend: { enabled: false },
				series: [{
					type: 'bar',
					name: 'count',
					data: counts
				}]
			};
			this.chart = new Highcharts.Chart(params);
		},
		countCategories: function _spGetCount(pgApps) {
			var dict = {};
			pgApps.forEach(function (app) {
				var android = app.platforms.android;
				if (android) {
					var category = android.category;
					if (category) {
						if (!(category in dict)) {
							dict[category] = [];
						}
						dict[category].push(app);
					}
				}
			});
			var categories =  [];
			for (var name in dict) {
				categories.push({
					'name': name,
					'count': dict[name].length,
					'apps': dict[name]
				});
			}
			categories.sort(function (a, b) { return b.count - a.count; });
			this.categoryCount = categories;
		}
	};

	window.pgCategories = pgCategories;
})();

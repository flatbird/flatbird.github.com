(function(){
	'use strict';

	var pgPlatforms = {
		chart: undefined,
		apps: undefined,
		viewModel: {
			count: ko.observable()
		},
		show: function _plShow(viewId, chartId, minCount) {
			var self = this;
			self.chartId = chartId;
			self.minCount = (minCount || 1);
			ko.applyBindings(self.viewModel, $('#'+viewId)[0]);
			PhoneGapApps.getData(function(obj) {
				self.apps = obj.pgApps;
				self.viewModel.count(self.apps.length);
				self.showChart();
			});
		},
		showChart: function _plShowChart() {
			var combo = this.getCount(this.apps);
			var names  = combo.map(function (c) { return c.name; });
			var counts = combo.map(function (c) { return c.count; });

			var params = {
				title: 'Support Platforms',
				chart: { renderTo: this.chartId },
				// colors: colors,
				xAxis: { categories: names },
				yAxis: { title: { text: null } },
				plotOptions: { bar: { dataLabels: { enabled: true } } },
				legend: { enabled: false },
				series: [{
					type: 'bar',
					name: 'count',
					data: counts
				}]
			};
			this.chart = new Highcharts.Chart(params);
		},
		platformName: {
			'android': 'Android',
			'ios': 'iOS',
			'windows_phone': 'WindowsPhone',
			'blackberry': 'Blackberry',
			'symbian': 'Symbian',
			'palm': 'Palm'
		},
		getCount: function _spGetCount(pgApps) {
			var self = this;
			var comboMap = {};
			pgApps.forEach(function (app) {
				var platforms = Object.keys(app.platforms).map(function(p) {
					return self.platformName[p];
				});
				var combo = platforms.sort().join(' + ');
				if (combo.length <= 0) {
					console.log(app.name);
				}
				if (combo in comboMap) {
					comboMap[combo]++;
				} else {
					comboMap[combo] = 1;
				}
			});
			var combination =  [];
			for (var key in comboMap) {
				var count = comboMap[key];
				if (count >= self.minCount) {
					combination.push({'name': key, 'count': count});
				}
			}
			combination.sort(function (a, b) {
				return b.count - a.count;
			});
			return combination;
		},
	};

	window.pgPlatforms = pgPlatforms;
})();

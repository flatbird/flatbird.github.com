(function(){
	'use strict';
	function ViewModel() {
		this.apkCount = ko.observable();
	}
	var pluginRank = {
		chart: undefined,
		show: function _pluginsShow(id, chartTargets) {
			var self = this;
			self.viewModel = new ViewModel();
			ko.applyBindings(self.viewModel, $('#'+id)[0]);
			CordovaPlugins.getData(function(obj) {
				self.viewModel.apkCount(Object.keys(obj.pluginRank.apks).length);
				for (var target in chartTargets) {
					self.showChart(obj, target, chartTargets[target]);
				}
			});
		},
		showChart: function _pluginsShow(obj, id, filter) {
			var apks = obj.pluginRank.apks;
			var plugins = obj.pluginRank.plugins;

			if (filter) {
				plugins = plugins.filter(filter);
			}
			var names  = plugins.map(function (p) { return p.name; });
			var counts = plugins.map(function (p) { return p.apks.length; });

			var params = {
				title: 'Popular Plugins',
				chart: {
					renderTo: id,
					height: 500
				},
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
		}
	};

	window.pluginRank = pluginRank;
})();
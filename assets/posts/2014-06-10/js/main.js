(function(){
	'use strict';

	document.addEventListener('DOMContentLoaded', function() {
		pgPlatforms.show('pg-platforms', 'pg-platforms-chart', 2);
		pgCategories.show('pg-category-apps', 'pg-categories');
		// pgCategories.show('pg-category-apps', 'pg-categories', [0,undefined]);

		new GpCordova('gp-apps', 'cordovaApps');
		new GpCordova('gp-monaca', 'cordovaApps', function(app) {
			return app.cordovaFiles.some(function(js) {
				return (js.match(/^monaca/) !== null);
			});
		});
		new GpCordova('gp-hybrid', 'htmlApps');

		var corePlugins = [
			"org.apache.cordova.battery-status",
			"org.apache.cordova.camera",
			"org.apache.cordova.contacts",
			"org.apache.cordova.device",
			"org.apache.cordova.device-motion",
			"org.apache.cordova.device-orientation",
			"org.apache.cordova.dialogs",
			"org.apache.cordova.file",
			"org.apache.cordova.file-transfer",
			"org.apache.cordova.geolocation",
			"org.apache.cordova.globalization",
			"org.apache.cordova.inappbrowser",
			"org.apache.cordova.media",
			"org.apache.cordova.media-capture",
			"org.apache.cordova.network-information",
			"org.apache.cordova.splashscreen",
			"org.apache.cordova.vibration",
			"org.apache.cordova.console"
		];
		pluginRank.show('plugins', {
			'core-plugins': function(plugin) {
					return (plugin.apks.length >= 1 &&
						corePlugins.indexOf(plugin.name) >= 0);
			},
			'non-core-plugins': function(plugin) {
					return (plugin.apks.length >= 2 &&
						corePlugins.indexOf(plugin.name) < 0);
			},
		});
	});
})();

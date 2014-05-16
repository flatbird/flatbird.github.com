
var FireMap = {
	COUNTRIES: null,
  DAY: 60*60*24*1000,
  disp: null,
  replay: null,
  lastDate: null,
  countries: [],
  regions: [],
  countryDict: {},
  timeoutID: null,
	init: function(countries, map, disp, replay) {
		self = this;
		this.COUNTRIES = countries;
		this.map = $(map).vectorMap({
	    map: 'world_mill_en',
	    // focusOn: { scale: 1.4 },
	    regionStyle: { selected: { fill: 'orange' } },
	    onRegionLabelShow: function(event, label, code) {
	    	var res = self.getLabel(code.toLowerCase());
	    	if (res) {
		    	label.html(res);
		    } else {
		    	return false;
	    	}
	    }
	  });
	  this.COUNTRIES.forEach(function(country) {
	  	if (!(country.code in this.countryDict)) {
	  		this.countryDict[country.code] = [];
	  	}
	  	this.countryDict[country.code].push(country);
	  	this.regions = this.regions.concat(country.code.toUpperCase());
	  }, this);
		var mapObj = this.map.vectorMap('get', 'mapObject');
		mapObj.setBackgroundColor('#003366');
		mapObj.setSelectedRegions(this.regions);
	  this.disp = $(disp);
	  this.replay = $(replay);
	  this.replay.show();
	  // this.start();
	},
	start: function() {
		self = this;
		this.disp.hide();
	  this.countries = [];
	  this.COUNTRIES.forEach(function(country) {
	  	this.countries.push(country);
	  }, this);
	  var delay = 1000;
		this.fadeTimeout(this.disp, delay, function () {
	  	self.handle();
	  });
	},
	restart: function() {
		this.replay.hide();
		this.regions = [];
		var mapObj = this.map.vectorMap('get', 'mapObject');
		mapObj.clearSelectedRegions();
		this.start();
	},
	handle: function() {
		self = this;
		var mapObj = this.map.vectorMap('get', 'mapObject');
		// var country = this.countries.shift();
		var obj = this.popCountries();
		this.regions = this.regions.concat(obj.codes);
		mapObj.setSelectedRegions(this.regions);
		this.disp.empty();
		$('<div>').addClass('date').text(obj.date).appendTo(this.disp);
		$('<div>').addClass('country').text(obj.names.join(', ')).appendTo(this.disp);
		var next = this.countries.length > 0 ? this.countries[0] : null;
		if (next) {
			// var delay = Date.parse(next.date) - Date.parse(country.date);
			// delay = delay / this.DAY * 300;
			// console.log('Next ' + delay / this.DAY + ' days');
			// console.log('Delay=' + delay);
			var delay = 4500;
			this.fadeTimeout(this.disp, delay, function () {
				self.handle();
			});
		} else {
			setTimeout(function () {
				self.disp.empty();
				self.replay.fadeIn('slow');
			}, 3000);
		}
	},
	popCountries: function() {
		var obj = { codes: [], names: [], date: null, carrier: null };
		while (this.countries.length > 0) {
			var country = this.countries[0];
			if (obj.date === null) {
				var date = new Date(country.date);
				var month = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'][date.getMonth()];
				obj.date = month + ' ' + date.getDate() + ', ' + date.getFullYear();
				obj.carrier = country.carrier;
			} else if (obj.carrier != country.carrier) {
				break;
			} else if (Date.parse(obj.date) != Date.parse(country.date)) {
				break;
			}
			obj.codes.push(country.code.toUpperCase());
			obj.names.push(country.name);
			this.countries.shift();
		}
		return obj;
	},
	fadeTimeout: function(obj, delay, func) {
		setTimeout(function () {
			obj.fadeOut('slow');
		}, delay);
		setTimeout(function () {
			obj.fadeIn('slow');
			func();
		}, delay + 500);
	},
	getLabel: function(code) {
		var countries = this.countryDict[code];
		if (countries) {
			var country = countries[0];
			var resp = countries[0].name;
			countries.forEach(function(country) {
				resp += '<br>' + country.date + '&nbsp;' + country.carrier;
			});
			return resp;
		} else {
			return null;
		}
	}
}

function Greenmarket(markets,scope) {
	this.data=markets;
	this.scope=scope;

	this.initGeo=function() {
		if ("geolocation" in navigator) {
			//alert("geolocation is available");
			navigator.geolocation.getCurrentPosition(
				function(event) {self._geo(event)},
				function(event) {self._geoError(event)}
			);
		}
		else {
			alert("I'm sorry, but geolocation services are not supported by your browser.");
		}
	}

	this.initDom= function() {
		$('.refresh').click(function() {
			self.initGeo();
		});
	}

	this._geo=function(position) {
		alert(position.coords.latitude + " " + position.coords.longitude);
		debugger;
		this._pythag(position.coords.latitude, position.coords.longitude);
	}

	this._geoEror=function(error) {
		alert("Position Error: " + positionError.message);
	}

	this._pythag=function(latitude, longitude) {
		for(i in this.data) {
			var market = data[i];
			debugger;
		}
	}

	// PREAMBLE

	this.initDom();
	this.initGeo();
}

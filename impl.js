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

	this.init= function() {
		this.initDom();
		this.initGeo();
	}

	this._geo=function(position) {
		//alert(position.coords.latitude + " " + position.coords.longitude);
		this._distance(position.coords.latitude, position.coords.longitude);
	}

	this._geoEror=function(error) {
		alert("Position Error: " + positionError.message);
	}

	this._distance=function(latitude, longitude) {
		data = this.data.slice()

		for(i in data) {
			var market = data[i];
			var coord = market["geo"]["geometry"]["location"];
			market.distance = this._calcDistance(latitude,longitude,coord.lat,coord.lng)
		}

		data.sort(function(a,b){
			return a.distance - b.distance;
		})

		for(i in data) {
			var market = data[i];
			this.scope.append(this._decorateItem(market));
		}
	}
	this._calcDistance=function(x1, y1, x2, y2) {
		return Math.sqrt(
			Math.pow(x2-x1,2) +
			Math.pow(y2-y1,2));
	}

	this._decorateItem=function(item) {
		var geo = item["geo"];
		var adr = geo["address_components"]; // this is a candidate for refactor in the Ruby
		debugger;
		return " \
			<div class='vcard'> \
				<div class='adr'> \
					<h3>"+ item.distance +"</h3> \
					<div class='org fn organization-name extended-address'>"+ item["Market Name"] +"</div> \
					"+( (adr.length>5) ? " \
						<div class='street-address'>"+ adr[0].long_name +"</div> \
						<span class='neighborhood'>"+ adr[1].long_name +"</span>,  \
						<span class='sublocality'>"+ adr[2].long_name +"</span>,  \
						<abbr title='"+ adr[5].long_name +"' class='region'>"+ adr[5].short_name +"</abbr> \
					": " \
						<div class='street-address'>"+ item["geo"].formatted_address +"</div> \
					")+" \
				</div> \
			</div> \
		";
	}

	// PREAMBLE

	return this;
}

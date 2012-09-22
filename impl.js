(function($){
    $.fn.extend({
        center: function () {
            return this.each(function() {
                var top = ($(window).height() - $(this).outerHeight()) / 2;
                var left = ($(window).width() - $(this).outerWidth()) / 2;
                $(this).css({position:'absolute', margin:0, top: (top > 0 ? top : 0)+'px', left: (left > 0 ? left : 0)+'px'});
            });
        }
    }); 
})(jQuery);

function Greenmarket(markets,scope) {
	this.data=markets;
	this.scope=scope;

	this.initGeo=function() {
		if ("geolocation" in navigator) {
			//alert("geolocation is available");
			var val = navigator.geolocation.getCurrentPosition(
				function(event) {self._geo(event)},
				function(event) {self._geoError(event)}
			);
		}
		else {
      self._showError("geo-missing");
		}
	}

	this.initDom= function() {
		$('.refresh',this.scope).click(function() {
			self.initGeo();
		});
    $('.error',this.scope).hide();
    $(this.scope).center();
	}

	this.init= function() {
		this.initDom();
		this.initGeo();
	}

	this._geo=function(position) {
		//alert(position.coords.latitude + " " + position.coords.longitude);
		this._distance(position.coords.latitude, position.coords.longitude);
	}

	this._geoError=function(positionError) {
		console.log("Position Error: " + positionError.message);
    self._showError("geo-perm");
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

    $('.results',this.scope).empty();
		for(i in data) {
			var market = data[i];
			$('.results',this.scope).append(this._decorateItem(market));
		}
    $(this.scope).center();
    $('.results *').slideDown();
	}

	this._calcDistance=function(x1, y1, x2, y2) {
		return Math.sqrt(
			Math.pow(x2-x1,2) +
			Math.pow(y2-y1,2));
	}

	this._decorateItem=function(item) {
		var geo = item["geo"];
		var adr = geo["address_components"]; // this is a candidate for refactor in the Ruby
		return " \
			<div class='vcard'> \
				<div class='adr'> \
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

  this._showError=function(class_name) {
    $('.error.'+class_name,this.scope).show();
  }

	// PREAMBLE

	return this;
}

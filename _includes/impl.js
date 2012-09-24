jQuery.fn.center = function () {
    this.css("position","absolute");
    this.css("top", Math.max(0, (($(window).height() - this.outerHeight()) / 2) + 
                                                $(window).scrollTop()) + "px");
    this.css("left", Math.max(0, (($(window).width() - this.outerWidth()) / 2) + 
                                                $(window).scrollLeft()) + "px");
    return this;
}

function Greenmarket(markets,scope) {
	this._data=markets;
	this._scope=scope;

	this.initGeo=function() {
		if ("geolocation" in navigator) {
			//alert("geolocation is available");
			navigator.geolocation.getCurrentPosition(
				function(event) {self._geo(event)},
				function(event) {self._geoError(event)}
			);
			$('.icon-undo',this._scope).addClass('spinning');
			window.scrollTo(0,0);
		}
		else {
			self._showError("geo-missing");
			this._hideError("init");
		}
	}

	this.initDom= function() {
		$('.refresh',this._scope).click(function() {
			self.initGeo();
      return false;
		});

    $('.title',this._scope).on('click',function(){
        $('html, body').animate({scrollTop:0}, 'fast');
        return false;
    });

		$('.when div',this._scope).on('click',function(event){
				$(event.target).toggleClass('selected');
        return false;
    });


    $('.error',this._scope).hide();
		$('.error',this._scope).append("<a href='#' class='dismiss'>OK</a>");
		$('.error .dismiss',this._scope).on('click', function(event) {
				$(event.target.parentNode).fadeOut();
				return false;
		});

    $(this._scope).fadeIn();
  }

	this.init= function() {
		this.initDom();
		this.initGeo();
	}

	this._geo=function(position) {
		//alert(position.coords.latitude + " " + position.coords.longitude);
		this._hideError("init");
		$('.icon-undo',this._scope).removeClass('spinning');
		this._position=position;
		this._distance(position.coords.latitude, position.coords.longitude);
		$('.curtain',this._scope).fadeIn('slow');
	}

	this._geoError=function(positionError) {
		console.log("Position Error: " + positionError.message);
		$('.icon-undo',this._scope).removeClass('spinning');
		self._showError("geo-perm");
	}

	this._distance=function(latitude, longitude) {
		data = this._data.slice()

		for(i in data) {
			var market = data[i];
			var coord = market["geo"]["geometry"]["location"];
			market.distance = this._calcDistance(latitude,longitude,coord.lat,coord.lng)
		}

		data.sort(function(a,b){
			return a.distance - b.distance;
		})

    $('.results',this._scope).empty();
    $('.results',this._scope).hide();
		for(i in data) {
			var market = data[i];
			$('.results',this._scope).append(this._decorateItem(market));
		}
    $('.results',this._scope).fadeIn('slow');
	}

	this._calcDistance=function(x1, y1, x2, y2) {
		return Math.sqrt(
			Math.pow(x2-x1,2) +
			Math.pow(y2-y1,2));
	}

	this._decorateItem=function(item) {
		var geo = item["geo"];
		var adr = geo["address_components"]; // this is a candidate for refactor in the Ruby
		var long_adr = item["geo"].formatted_address;
		return " \
			<div class='vcard'> \
        <a class='adr' target='_new' href='http://maps.apple.com/maps?dirflg=w&daddr="+escape(long_adr)+
        "&saddr="+this.getPositionString()+"'> \
          <div class='org fn organization-name extended-address'>"+ item["Market Name"] +"</div> \
		  <div class='street-address'>"+ long_adr +"</div> \
        </a> \
			</div> \
		";
	}

  this._showError=function(class_name) {
    $('.error.'+class_name,this._scope).center().fadeIn();
  }

  this._hideError=function(class_name) {
    if(typeof class_name == 'undefined')
      class_name = '';
    if (typeof class_name == 'string') {
      if(class_name != '')
        class_name = '.'+class_name;
      class_name +='.error';
    }
    $(class_name).fadeOut();
  }

  this.getPositionString=function(class_name) {
    var position = this._position;
    return position.coords.latitude + "," + position.coords.longitude;
  }

	return this;
}

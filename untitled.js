function initMap(){
	function loadCsv(){
		var xhttp = new XMLHttpRequest();
		xhttp.onreadystatechange = function(){
			if(this.readyState == 4) {
				class Printer {
    				constructor(name, street, postal, city, lat, lng, region, type) {
    					this.name = name;
    					this.street = street;
    					this.postal = postal;
    					this.city = city;
    					this.lat = lat;
    					this.lng = lng;
    					this.region = region;
    					this.type = type;
    				}
    				
    				get coordinates(){
    					return this.getCoordinates();
    				}
    				getCoordinates(){
    					return {"lat": Number(this.lat), "lng": Number(this.lng)};
    				}
    			}
    			var princhLocations = [];
     			var csvData = this.response;
     			var csvArr = csvData.split("\n");
     			for(i=0;i<csvArr.length;i++){
     				//console.log(csvArr[i]);
				    var s = csvArr[i].split(",");
				    princhLocations.push(new Printer(s[0], s[1], s[2], s[3], s[4], s[5], s[6], s[7]));
     			}
     			var rawLocations = [];
     			for(i=0; i<princhLocations.length; i++){
     				rawLocations.push(princhLocations[i].coordinates);
     			}
     			console.log(rawLocations);
     			var map = new google.maps.Map(document.getElementById('map'), {
            		zoom: 6,
            		center: {lat: 56.1394377, lng: 10.1703626}
          		});
          		var labels = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
          		var icon = {
          		    url: "imgs/princh_marker.png", // url
          		    scaledSize: new google.maps.Size(21, 30), // scaled size
          		    origin: new google.maps.Point(0,0), // origin
          		    anchor: new google.maps.Point(0, 0) // anchor
          		};
          		var markers = rawLocations.map(function(location, i) {
          			return new google.maps.Marker({
            			position: location,
            			icon: icon,
            			label: "",
            			height: 25,
            			width: 25
          			});
        		});
        		var clusterStyles = [
        		  {
        		    textColor: 'white',
        		    url: 'imgs/m1.png',
        		    height: 25,
        		    width: 25
        		  },
        		 {
        		    textColor: 'white',
        		    url: 'imgs/m1.png',
        		    height: 25,
        		    width: 25
        		  },
        		 {
        		    textColor: 'white',
        		    url: 'imgs/m1.png',
        		    height: 25,
        		    width: 25
        		  }
        		];
        		var mcOptions = {
        			gridSize: 25,
        		    styles: clusterStyles,
        		    maxZoom: 15
        		};
        		var markerCluster = new MarkerClusterer(map, markers,
            	mcOptions);
			}
		}
		xhttp.open("GET", "https://public-princh-files.s3.amazonaws.com/MOBILE/public_locations.csv", true);
  		xhttp.send();
	}
	console.log("Loading csv");
	loadCsv();
}
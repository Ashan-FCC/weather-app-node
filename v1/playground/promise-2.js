const request = require('request');

var geocodeAddress = (address) => {
	var encodedAddress = encodeURIComponent(address);
	return new Promise((resolve, reject) => {
		request({
		url: `https://maps.googleapis.com/maps/api/geocode/json?address=${encodedAddress}`,
		method: 'POST',
		json: true
		}
		, (error, response, body) => {
			if(error) {
				reject('Unable to connect to the Google server.')
				console.log();
			}else if (body.status !=='OK') {
				reject('Unable to find the address: '+body.status);
			}else {
				var result = body.results[0];
				resolve({
					address: result.formatted_address,
					latitude: result.geometry.location.lat,
					longitude: result.geometry.location.lng
				});
			}
		});
	});
	
}

geocodeAddress('Trump Tower').then((location) =>{
	console.log(JSON.stringify(location, undefined, 2));
}).catch((error) => {
	console.log(error);
});


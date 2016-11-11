const request = require('request');

var geocodeAddress = (address , callback) => {
	var encodedAddress = encodeURIComponent(address);

	callGoogleApi(encodedAddress, callback);
	
}

var callGoogleApi = (encodedAddress , callback) => {
	request({
		url: `https://maps.googleapis.com/maps/api/geocode/json?address=${encodedAddress}`,
		method: 'POST',
		json: true
		}
		, (error, response, body) => {
			if(error) {
				callback('Unable to connect to the Google server.')
				console.log();
			}else if (body.status !=='OK') {
				callback('Unable to find the address');
			}else {
				var result = body.results[0];
				callback(undefined, {
					address: result.formatted_address,
					latitude: result.geometry.location.lat,
					longitude: result.geometry.location.lng
				})
			}
		});
}

module.exports = {
	geocodeAddress
}
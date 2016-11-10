const request = require('request');
const yargs = require('yargs');
const geocode = require('./geocode/geocode');

const argv = yargs
				.options({
					address: {
					describe : 'Address of location',
					demand : true,
					alias: 'a',
					string: true
				 }
				}).help()
				.alias('help' ,'h')
				.argv;

geocode.geocodeAddress(argv.a, (errorMsg, result) => {
	if(errorMsg){
		console.log(errorMsg);
	}else{
		console.log(JSON.stringify(result, undefined, 4));
		checkWeather(result.latitude, result.longitude);
	}
});

var checkWeather = (lat , lng ) => {
	request({
		url: `https://api.darksky.net/forecast/45a19a50f2d7f637fec6efa158855bbd/${lat},${lng}`,
		method: 'GET',
		json: true
		}
		, (error, response, body) => {
			if(error) {
				callback('Unable to connect to the Google server.')
				console.log();
			// }else if (body.status !=='OK') {
			// 	callback('Unable to find the address');
			// 
			}else {
				var result = body.currently;
				console.log(JSON.stringify(result, undefined, 2));
			}
		});
}

//https://api.darksky.net/forecast/45a19a50f2d7f637fec6efa158855bbd/37.8267,-122.4233

const request = require('request');
const yargs = require('yargs');
const geocode = require('./geocode/geocode');
const weather = require('./weather/weather');
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
		weather.getWeather(result.latitude, result.longitude, printWeather);
	}
});

var printWeather = (error , result) => {
	if(error) console.log(error);
	if(result){
		console.log(JSON.stringify(result, undefined, 2));
	}
}

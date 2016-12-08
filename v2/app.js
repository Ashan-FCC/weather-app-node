
const yargs = require('yargs');
const axios = require('axios');
//const geocode = require('./geocode/geocode');
//const weather = require('./weather/weather');
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


var encodedAddress = encodeURIComponent(argv.a);
var geocodeUrl = `https://maps.googleapis.com/maps/api/geocode/json?address=${encodedAddress}`;

axios.get(geocodeUrl).then((response) => {
	if(response.data.status === 'ZERO_RESULTS') {
		throw new Error('Unable to find that address');
	}
	var lat = response.data.results[0].geometry.location.lat;
	var lng = response.data.results[0].geometry.location.lng;
	var weatherUrl = `https://api.darksky.net/forecast/45a19a50f2d7f637fec6efa158855bbd/${lat},${lng}`;
	console.log(response.data.results[0].formatted_address);
	return axios.get(weatherUrl);
}).then((response) => {
	var temp = response.data.currently.temperature;
	var appTemp = response.data.currently.apparentTemperature;
	console.log(JSON.stringify(response.data, null, 2));
	console.log(`It's currently ${temp} but it feel like ${appTemp}`);
}).catch((error) => {
	if(error.code === 'ENOTFOUND')
		console.log('Unable to connect to API servers.');
	else
		console.log('Unable to find that address');
});

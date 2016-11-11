const request = require('request');

var getWeather = (lat , lng , callback) => {
	request({
		url: `https://api.darksky.net/forecast/45a19a50f2d7f637fec6efa158855bbd/${lat},${lng}`,
		method: 'GET',
		json: true
		}
		, (error, response, body) => {
			if(error) {
				callback('Unable to connect to the Google server.');

			}else if (response.statusCode === 400 ) {
				callback('Unable to fetch the weather');
			
			}else if(response.statusCode === 200 ){
				var result = body.currently;
				callback(undefined, {
					temperature: result.temperature,
					apparentTemparature: result.apparentTemperature 
				});
			}
		});
};

module.exports.getWeather = getWeather;
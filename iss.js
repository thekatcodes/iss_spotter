const request = require("request");

const nextISSTimesForMyLocation = function (callback) {
	request(
		"https://api.ipify.org?format=json",
		function (error, response, body) {
			// if (error) {
			// 	callback(error, null);
			// 	return;
			// }
			if (response.statusCode !== 200) {
				const msg = `Status Code ${response.statusCode} when fetching IP. Response: ${body}`;
				callback(Error(msg), null);
				return;
			}
			const ip = JSON.parse(body);
			if (error) {
                callback(error);
                return;
			} else {
				callback(null, ip);
			}
			request(`http://ipwho.is/${ip.ip}`, function (error, response, body) {
				const ipInfo = JSON.parse(body);
				const latitude = ipInfo.latitude;
				const longitude = ipInfo.longitude;
				const geoObj = { latitude, longitude };
				if (response.statusCode !== 200) {
					const msg = `Status Code ${response.statusCode} when fetching IP. Response: ${body}`;
					callback(Error(msg), null);
					return;
				}

				if (error) {
					callback(error);
				} else {
					callback(null, geoObj);
				}
				request(
					`https://iss-flyover.herokuapp.com/json/?lat=${latitude}&lon=${longitude}`,
					function (error, response, body) {
						const timesInfo = JSON.parse(body);
						const flyOverTimes = timesInfo.response;
						if (response.statusCode !== 200) {
							const msg = `Status Code ${response.statusCode} when fetching IP. Response: ${body}`;
							callback(Error(msg), null);
							return;
						}

						if (error) {
							callback(error);
						} else {
							callback(null, flyOverTimes);
						}

						flyOverTimes.forEach((obj, i) => {
							let dateConversion = new Date(obj.risetime * 1000);
							// console.log(dateConversion)
							console.log(
								`Next pass at ${dateConversion} for ${obj.duration} seconds!`
							);
						});
					}
				);
			});
		}
	);
};

module.exports = { nextISSTimesForMyLocation };

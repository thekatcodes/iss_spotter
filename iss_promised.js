const request = require("request-promise-native");

const fetchMyIP = function () {
	return request("https://api.ipify.org?format=json");
};

const fetchCoordsByIP = function (body) {
	const ip = JSON.parse(body);
	return request(`http://ipwho.is/${ip.ip}`);
};

const fetchISSFlyOverTimes = function (body) {
	const ipInfo = JSON.parse(body);
	const latitude = ipInfo.latitude;
	const longitude = ipInfo.longitude;
	return request(
		`https://iss-flyover.herokuapp.com/json/?lat=${latitude}&lon=${longitude}`
	);
};

const nextISSTimesForMyLocation = function(body) {
    const timesInfo = JSON.parse(body);
    const flyOverTimes = timesInfo.response;

   return flyOverTimes.forEach((obj, i) => {
        let dateConversion = new Date(obj.risetime * 1000);
        // console.log(dateConversion)
        console.log(
            `Next pass at ${dateConversion} for ${obj.duration} seconds!`)
    })
   
}
module.exports = { fetchMyIP, fetchCoordsByIP, fetchISSFlyOverTimes, nextISSTimesForMyLocation};

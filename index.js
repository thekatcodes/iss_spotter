const { fetchMyIP, fetchCoordsByIP, fetchISSFlyOverTimes, nextISSTimesForMyLocation } = require("./iss");

// fetchMyIP((error, ip) => {
// 	if (error) {
// 		console.log("It didn't work!", error);
// 		return;
// 	}

// 	console.log("It worked! Returned IP:", ip);
// });

// fetchCoordsByIP("96.21.209.140", (error, geoLocation) => {
//   if (error) {
//     console.log("It didn't work!", error);
//     return;
//   }
//   console.log("It worked!", geoLocation);
// });

// fetchISSFlyOverTimes(
// 	{ latitude: 45.501693838383, longitude: -73.567256 },
// 	(error, flyTimes) => {
// 		if (error) {
// 			console.log("It didn't work!", error);
// 			return;
// 		}
// 		console.log("It worked!", flyTimes);
// 	}
// );
nextISSTimesForMyLocation(function(error, passTimes) {
    if (error) {
        return console.log("It didn't work!", error);
    }
    console.log(passTimes)
});

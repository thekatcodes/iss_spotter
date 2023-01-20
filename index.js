const { fetchMyIP, fetchCoordsByIP } = require("./iss");

fetchMyIP((error, ip) => {
	if (error) {
		console.log("It didn't work!", error);
		return;
	}

	console.log("It worked! Returned IP:", ip);
});

fetchCoordsByIP("96.21.209.140", (error, geoLocation) => {
  if (error) {
    console.log("It didn't work!", error);
    return;
  }
  console.log("It worked!", geoLocation);
});
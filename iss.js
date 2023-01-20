const request = require("request");

/**
 * Makes a single API request to retrieve the user's IP address.
 * Input:
 *   - A callback (to pass back an error or the IP string)
 * Returns (via Callback):
 *   - An error, if any (nullable)
 *   - The IP address as a string (null if error). Example: "162.245.144.188"
 */
const fetchMyIP = function (callback) {
	request(
		"https://api.ipify.org?format=json",
		function (error, response, body) {
			// console.error("error:", error); // Print the error if one occurred
			// console.log("statusCode:", response && response.statusCode); // Print the response status code if a response was received
			// console.log("body:", body); // Print the HTML for the Google homepage.
			if (error) {
				callback(error, null);
				return;
			}
			// if non-200 status, assume server error
			if (response.statusCode !== 200) {
				const msg = `Status Code ${response.statusCode} when fetching IP. Response: ${body}`;
				callback(Error(msg), null);
				return;
			}
			const ip = JSON.parse(body);
			// console.log(ip)

			if (error) {
				callback(error);
			} else {
				callback(null, ip);
			}
		}
        );
    };
    
    const fetchCoordsByIP = function(ipString, callback) {
        request(
           `http://ipwho.is/${ipString}`,
            function(error, response, body) {
                // console.error("error:", error); // Print the error if one occurred
                // console.log("statusCode:", response && response.statusCode); // Print the response status code if a response was received
                // console.log("body:", body); // Print the HTML for the Google homepage.
                
                const ipInfo = JSON.parse(body);
                const latitude = ipInfo.latitude;
                const longitude = ipInfo.longitude;
                const geoObj = {latitude,longitude}
                // console.log(lat)

                if (error) {
                    callback(error);
                } else {
                    callback(null, geoObj);
                }
            }
        );
    };
    
module.exports = { fetchMyIP, fetchCoordsByIP };

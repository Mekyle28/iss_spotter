const needle = require('needle');
// const { isIP } = require('net');



// const fetchMyIP = function(callback) {
//   needle.get("https://api.ipify.org?format=json", (error, response, body) => {
//     if (error) {
//       callback(error, null);
//       return;
//     }

//     if (response.statusCode !== 200) {
//       callback(Error(`Status Code ${response.statusCode} when fetching IP: ${body}`), null);
//       return;
//     }
//     const ip = body.ip;
//     callback(null, ip);
//   });
// };
// const ip = "148.170.180.88";


const fetchCoordsByIP = function(ip, callback) {
  needle.get(`http://ipwho.is/${ip}`, (error, response, body) => {

    if (error !== null) {
      console.log("error: ", error);
      return callback(error, null);
    }
    if (!body.success) {
      const message = (`looks like ${ip} isn't a valid IP address. Please try again with a valid IP`);
      return callback(Error(message), null);
    }
    const lat = body.latitude;
    const long = body.longitude;
    const coord = {
      latitude: lat,
      longitude: long
    };
    return callback(null, coord);
  });
};





module.exports = { fetchCoordsByIP };
// module.exports = { fetchMyIP };

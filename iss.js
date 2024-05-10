const needle = require('needle');
// const { isIP } = require('net');



const fetchMyIP = function(callback) {
  needle.get("https://api.ipify.org?format=json", (error, response, body) => {
    if (error) return callback(error, null);

    if (response.statusCode !== 200) {
      callback(Error(`Status Code ${response.statusCode} when fetching IP: ${body}`), null);
      return;
    }
    const ip = body.ip;
    callback(null, ip);
  });
};

module.exports = { fetchMyIP };

// my attempt
// const fetchMyIP = function (callback) {
//   needle.get("https://api.ipify.org?format=json", (errors, body) => {
//     const error = (errors);
//     const ip = (body.body.ip);

//     console.log(ip, typeof ip)
//     callback(error, ip);
//   }
//   );
// };

// module.exports = { fetchMyIP };
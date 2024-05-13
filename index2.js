const { nextISSTimesForMyLocation } = require('./iss_promised');
const printPassTimes = require('./index');


nextISSTimesForMyLocation()
  .then((passOverTimes) =>{
    printPassTimes(passOverTimes);
  })
  .catch((error) => {
    console.log("it didn't work: ", error.message);
  });

  



const printPassTimes = function(passTimes) {
  for (const obj of passTimes) {
    const dateTime = new Date(0);
    dateTime.setUTCSeconds(obj.risetime);
    const timeSpan = obj.duration;
    console.log(`Next pass at ${dateTime} for ${timeSpan} seconds!`);
  }
};



const { nextISSTimesForMyLocation } = require('./iss');

nextISSTimesForMyLocation((error, passTimes) => {
  if (error) {
    return console.log("It didn't work!", error);
  }
  printPassTimes(passTimes);
});


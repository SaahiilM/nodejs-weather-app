const geoCode = require("./utils/geocode");
const forecast = require("./utils/forecast.js");

const address = process.argv[2];
if (!address) {
  console.log("Provide address");
} else {
  geoCode(address, (error, { longitude, latitude, location } = {}) => {
    if (error) {
      return console.log(error);
    }
    forecast(
      longitude,
      latitude,
      (error, { description, currentTemp, feelsLike }) => {
        if (error) {
          return console.log(error);
        }
        console.log(location);
        console.log(
          `${description}. The current temperature is ${currentTemp} fahrenheit and it feels like ${feelsLike}`
        );
      }
    );
  });
}

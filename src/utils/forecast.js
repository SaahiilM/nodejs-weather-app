const request = require("postman-request");

// using json option parses the response and we do not need to use the JSON parser
// request({ url: url2, json: true }, (error, response) => {
//   // const data = JSON.parse(response.body);
//   if (error) {
//     console.log("unable to connect");
//   } else if (response.body.error) {
//     console.log("Unable to find location");
//   } else {
//     const details = response.body.current;
//     const curTemp = details.temperature;
//     const feelsLike = details.feelslike;
//     const description = details.weather_descriptions[0];
//     console.log(
//       `${description}. The current temperature is ${curTemp} fahrenheit and it feels like ${feelsLike}`
//     );
//   }
// });

const forecast = (long, lat, callback) => {
  const url = `http://api.weatherstack.com/current?access_key=d8fd5256e0284f763013d73b0ad7498f&query=${lat},${long}&units=f`;
  request({ url, json: true }, (error, { body }) => {
    if (error) {
      callback("Unable to connect to newtwork", undefined);
    } else if (body.error) {
      callback("Unable to find location", undefined);
    } else {
      const details = body.current;
      callback(undefined, {
        currentTemp: details.temperature,
        feelsLike: details.feelslike,
        description: details.weather_descriptions[0],
        humidity: details.humidity,
      });
    }
  });
};

module.exports = forecast;

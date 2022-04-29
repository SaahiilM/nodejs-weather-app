const request = require("postman-request");

const url2 =
  "http://api.weatherstack.com/current?access_key=d8fd5256e0284f763013d73b0ad7498f&query=37.8267,-122.4233&units=f";

request({ url: url2, json: true }, (error, response) => {
  // const data = JSON.parse(response.body);
  const details = response.body.current;
  const curTemp = details.temperature;
  const feelsLike = details.feelslike;
  const description = details.weather_descriptions[0];
  console.log(
    `${description}. The current temperature is ${curTemp} fahrenheit and it feels like ${feelsLike}`
  );
});

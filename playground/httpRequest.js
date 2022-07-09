const http = require("http");

const url = `http://api.weatherstack.com/current?access_key=d8fd5256e0284f763013d73b0ad7498f&query=41,-74&units=f`;

const request = http.request(url, (response) => {
  let data = "";
  response.on("data", (chunk) => {
    data = data + chunk.toString();
    console.log(chunk);
  });

  response.on("end", () => {
    const body = JSON.parse(data);
    console.log(body);
  });
});
request.on("error", (error) => {
  console.log(error);
});
request.end();

const path = require("path");
const express = require("express");
const hbs = require("hbs");
const geoCode = require("./utils/geocode");
const forecast = require("./utils/forecast");

// console.log(__dirname);
// console.log(path.join(__dirname, "../public"));
const app = express();
const publicDirectory = path.join(__dirname, "../public");
// update the views path
const viewsPath = path.join(__dirname, "../templates/views");
// setting path for partials
const partialsPath = path.join(__dirname, "../templates/partials");

// to use handlebar via hbs we have to update settings on express
// takes in key value pair
app.set("view engine", "hbs");

// setting the customized view path
app.set("views", viewsPath);

// telling hbs the path for partials
hbs.registerPartials(partialsPath);

// setup directory for express
app.use(express.static(publicDirectory));

// root url
// serve hbs file
app.get("", (req, res) => {
  // allows to render views(name of view to render, object of values to be accessed by that view)
  res.render("index", {
    title: "Weather App",
    name: "Saahiil",
  });
});

app.get("/about", (req, res) => {
  res.render("about", {
    title: "About",
    name: "Saahiil",
  });
});

app.get("/help", (req, res) => {
  res.render("help", {
    title: "Help",
    message: "This is the help message",
    name: "Saahiil",
  });
});
// app.get("/help", (req, res) => {
//     res.send("This is help");
// });
// app.get("/about", (req, res) => {
//     res.send("<h1>ABOUT</h1>");
// });

app.get("/weather", (req, res) => {
  if (!req.query.address) {
    return res.send({
      error: "Provide an address",
    });
  } else {
    geoCode(
      req.query.address,
      (error, { longitude, latitude, location } = {}) => {
        if (error) {
          return res.send({
            error: error,
          });
        }
        forecast(
          longitude,
          latitude,
          (error, { description, currentTemp, feelsLike }) => {
            if (error) {
              return res.send({
                error: error,
              });
            }
            // send to browser
            return res.send({
              location: location,
              description,
              currentTemp,
              feelsLike,
              forecast: `${description}. The current temperature is ${currentTemp} fahrenheit and it feels like ${feelsLike}`,
            });
          }
        );
      }
    );
  }
});

// creating api

app.get("/products", (req, res) => {
  if (!req.query.search) {
    // get cannot send 2 responses
    return res.send({
      error: "Provide a search term",
    });
  }

  res.send({
    products: [],
  });
});

app.get("/help/*", (req, res) => {
  res.render("404", {
    title: "404",
    name: "Saahiil",
    errorMessage: "Help Article not found",
  });
});

// setting up 404 error page
// comes last because express matches as the application is set up (1.public folder followed by all app.get)
app.get("*", (req, res) => {
  res.render("404", {
    title: "404",
    name: "Saahiil",
    errorMessage: "Page not found",
  });
});
// start server and port number
app.listen(3000, () => {
  console.log("server is listening on port 3000");
});

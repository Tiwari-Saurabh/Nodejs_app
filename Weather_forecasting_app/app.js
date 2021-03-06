/*jshint esversion: 6 */
// const request = require("request");
// const yargs = require("yargs");
// const argv = yargs.options({
//     a: {
//       demand: true,
//       alias: 'Address',
//       describe: 'Address to fetch weather for',
//       string: true
//     }

//   })
//   .help()
//   .alias('help', 'h')
//   .argv;
// console.log(argv);
// var encodedAddress = encodeURIComponent(argv.address);
// //process.env['NODE_TLS_REJECT_UNAUTHORIZED'] = '0';
// request({
//     //"https://maps.googleapis.com/maps/api/geocode/json?address=Sangli",
//     url: `http://www.mapquestapi.com/geocoding/v1/address=${encodedAddress}`,
//     json: true
//   },
//   (error, response, body) => {
//     console.log(JSON.stringify(response, undefined, 2));
//     console.log(`Address:${body.results[0].providedLocation.location}`);
//     console.log(`Latitude: ${body.results[0].locations[0].latLng.lat}`);
//     console.log(`Longitude:${body.results[0].locations[0].latLng.lng}`);
//   }
// );*/

const request = require("request");
const yargs = require("yargs");
const geocode = require('./geocode/geocode');
const weather = require('./weather/weather');

const argv = yargs
  .option({
    a: {
      demand: true,
      alias: "address",
      describe: "Address to fetch weather for",
      string: true //to get param  value from i/p
    }
  })
  .help()
  .alias("help", "h")
  .argv;
geocode.geocodeAddress(argv.address, (errorMessage, results) => {
  if (errorMessage) {
    console.log(errorMessage);
  } else {
    console.log(results.Address);
    weather.getWeather(results.Latitude, results.Longitude, (errorMessage, weatherResults) => {
      if (errorMessage) {
        console.log(errorMessage);
      } else {
        console.log(`It's currently ${weatherResults.temperature}.It's feel like ${weatherResults.apparentTemperature}.`);
        //console.log(JSON.stringify(WeatherResults, undefined, 2));
      }
    });
  }
});

// const request = require('request');

// request({
//     url: 'https://maps.googleapis.com/maps/api/geocode/json?address=sangli&key=AIzaSyD7FCzTsDFIQ50qw_AN9mSOXZshWcIV4XA',
//     json: true
//   },
//   (error, response, body) => {
//     if (error) {
//       console.log("Unable to connect to Google server");
//     } else if (body.status === "ZERO_RESULT") {
//       console.log("Unable to find the address");
//     } else if (body.status === "OK") {

//       console.log(`Address: ${body.results[0].formatted_address}`);
//       console.log(`Latitude: ${body.results[0].geometry.location.lat}`);
//       console.log(`Longitude: ${body.results[0].geometry.location.lng}`);
//     }
//   });
var destinationNameEl = document.querySelector("#destination");
var currentWeatherEl = document.querySelector("#currentWeather");
var apiKey = VW4KTQT545MEZVT7VAMGJX9F5;

// getting the city name from the user input from the index.html page
var city = function () {
  var destinationName = destinationNameEl.value;

  currentWeatherEl.innerHTML = "";
  getCityWeather(destinationName);
};

// weather API fetch (for future 15day forecast)
var getCityWeather = function (city) {
  fetch(
    "https://weather.visualcrossing.com/VisualCrossingWebServices/rest/services/timeline/" +
      city +
      "unitGroup=metric" +
      "&" +
      apiKey +
      "&contentType=json",
    {
      method: "GET",
      headers: {},
    }
  )
    .then((response) => {
      if (!response.ok) {
        throw response; //check the http response code and if isn't ok then throw the response as an error
      }

      return response.json(); //parse the result as JSON
    })
    .then((response) => {
      //response now contains parsed JSON ready for use
      processWeatherData(response);
    })
    .catch((errorResponse) => {
      if (errorResponse.text) {
        //additional error information
        errorResponse.text().then((errorMessage) => {
          //errorMessage now returns the response body which includes the full error message
        });
      } else {
        //no additional error information
      }
    });
};

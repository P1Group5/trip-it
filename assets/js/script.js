//flight data
// date format must be yyyy-mm-dd
var departureDate = "2022-04-10";
var returnDate = "2022-04-20";
// locations must be airport code (eg.YYZ for toronto)
var departureAirport = "YYZ";
var arrivalAirport = "LAX";
var flightContainerEL = document.querySelector("#flights-container");

var getFlights = function(flights) {
    var flightUrl = "https://www.expedia.com:443/api/flight/search?departureDate=" + departureDate + "&returnDate=" + returnDate + "&departureAirport=" + departureAirport + "&arrivalAirport=" + arrivalAirport + "&prettyPrint=true&maxOfferCount=9";

    fetch(flightUrl).then(function(response) {
        // request was successful
        if (response.ok) {
            response.json().then(function(data) {
                // pass response to DOM function
                // once ready, replace console.log(data); with displayFlights(data);
                displayFlights(data);
            });
        }
        else {
            // if not successful, redirect to indexpage
            document.location.replace("./index.html");
        }
    });
};

var displayFlights = function(flights) {
  console.log(flights)

  // clear old content
  flightContainerEL.textContent = "";
  //loop over offers
  for (var i = 0; i < flights.legs.length; i++) {
    // format offer info
    var flightInfo = flights.legs[i].segments[0].airlineName + flights.legs[i].segments[0].departureTime;

    // create a container for each flight
    var flightEl = document.createElement("a");
    flightEl.classList = "list-item flex-row justify-space-between align-center";
    flightEl.setAttribute("href", flights.legs[i].baggageFeesUrl)

    // create a span element to hold flight info
    var titleEl = document.createElement("span");
    titleEl.textContent = flightInfo;

    // append container
    flightEl.appendChild(titleEl);

    // append container to the dom
    flightContainerEL.appendChild(flightEl);
  }
};

getFlights();
//flight data
var departureDate = sessionStorage.getItem("departureDate");
var returnDate = sessionStorage.getItem("returnDate");
var departureAirport = sessionStorage.getItem("locationIata");
var arrivalAirport = sessionStorage.getItem("destinationIata");
var destination = sessionStorage.getItem("destinationCity");
var departureCity = sessionStorage.getItem("locationCity")
var flightContainerEL = document.querySelector("#flights-container");
var destinationEl = document.querySelector("#destinationLocation");
var arrivalDateEl = document.querySelector("#destinationDate");

// departure date for link URL format = 23%2F04%2F2022 (dd%2Fmm%2Fyyyy)
var depData = function () {
    var depDate = departureDate
    let dateData = depDate.split("-")
    var depDate = dateData[2] + "%2F" + dateData[1] + "%2F" + dateData[0]
    return depDate;
};
var urlDepartureDate = depData();

// return date for link URL
var retData = function () {
    var retDate = returnDate
    let dateData = retDate.split("-")
    var retDate = dateData[2] + "%2F" + dateData[1] + "%2F" + dateData[0]
    return retDate;
};
var urlReturnDate = retData();

var displayDestination = function() {
    // clear old content
    destinationEl.textContent = "";
    arrivalDateEl.textContent = "";

    // add new location and data
    destinationEl.textContent = destination;
    arrivalDateEl.textContent = departureDate;
}();

var getFlights = function() {
    var flightUrl = "https://www.expedia.com:443/api/flight/search?departureDate=" + departureDate + "&returnDate=" + returnDate + "&departureAirport=" + departureAirport + "&arrivalAirport=" + arrivalAirport + "&maxOfferCount=9";

    fetch(flightUrl).then(function(response) {
        // request was successful
        if (response.ok) {
            response.json().then(function(data) {
                // pass response to DOM function
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
  console.log(flights);

  // clear old content
  flightContainerEL.textContent = "";
  //loop over offers
  for (var i = 0; i < flights.offers.length; i++) {
    
    // format airlineName
    var airlineName = "<span class = 'flight-info'>" + flights.legs[i].segments[0].airlineName + ":" + "</span>";
    // format departureDateAndTime
    var departureDateAndTime = "<span class = 'flight-info'>" + "Leaving from " + (departureCity) + " on " + flights.legs[i].segments[0].departureTime + "</span>";
    // format returnDateAndTime
    //var returnDateAndTime = "<span class = 'flight-info'>" + "Returning from " + (destination) + " on " + flights.legs[i].segments[1].departureTime + "</span>";    
    // format baseFare
    var baseFare = "<span class = 'flight-info'>" + "Base fare in USD " + flights.offers[i].totalPrice.formattedPrice + "</span>";
    // format seatsRemaining
    var seatsRemaining = "<span class = 'flight-info'>" + "remaining seats: " + flights.offers[i].seatsRemaining + "</span>";

    // create a container for each flight
    var flightEl = document.createElement("a");
    flightEl.classList = "flight-options column my-3 has-text-centered";
    flightEl.setAttribute("href", "https://www.expedia.ca/Flights-Search?flight-type=on&mode=search&trip=roundtrip&leg1=from%3A" + departureAirport + "%29%2Cto%3A" + arrivalAirport + "%29%2Cdeparture%3A" + urlDepartureDate + "TANYT&options=cabinclass%3Aeconomy&leg2=from%3A" + arrivalAirport + "%29%2Cto%3A" + departureAirport + "%29%2Cdeparture%3A" + urlReturnDate + "TANYT&passengers=children%3A0%2Cadults%3A1%2Cseniors%3A0%2Cinfantinlap%3AY&fromDate=" + urlDepartureDate + "&toDate=" + urlReturnDate + "&d1=" + departureDate + "&d2=" + returnDate)

    // create a span element to hold flight info
    var titleEl = document.createElement("span");
    titleEl.innerHTML = airlineName + departureDateAndTime + baseFare + seatsRemaining;

    // append container
    flightEl.appendChild(titleEl);

    // append container to the dom
    flightContainerEL.appendChild(flightEl);
  }
};

getFlights();
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

// check if there are any available flights
if(flights.offers.length === 0) {
    var flightEl = document.createElement("a");
    flightEl.classList = "flight-options column my-3 has-text-centered";
    var titleEl = document.createElement("span");
    titleEl.innerHTML = "Sorry, there were no flights available!";
    flightEl.appendChild(titleEl);
    flightContainerEL.appendChild(flightEl);
    return;
    }

// Creates an array of offers. This will by populated with the flightOffer objects
var flightOffers = [];
  //loop over offers
  for (var i = 0; i < flights.offers.length; i++) {
    // Creates the flightOffer object. We will set properties for each object in the loop
    var flightOffer = {};
    flightOffer.totalFare = flights.offers[i].totalFare
    // check legs IDs for each flights offer
    for (var j = 0; j < flights.legs.length; j++){
       if (flights.offers[i].legIds[0] === flights.legs[j].legId){
           var lastSegment = flights.legs[j].segments.length - 1;
           console.log("offers # " + i + " matches legs " + j + " for the departing flight");
           flightOffer.departingConnections = flights.legs[j].segments.length - 1;
           flightOffer.departingAirline = flights.legs[j].segments[0].airlineName;
           flightOffer.departingDate = flights.legs[j].segments[0].departureTime;
           flightOffer.departingArrivalDateTime = flights.legs[j].segments[lastSegment].arrivalTime;   
       };
       if (flights.offers[i].legIds[1] === flights.legs[j].legId) {
           var lastSegment = flights.legs[j].segments.length - 1;
           console.log("offers # " + i + " matches legs " + j + " for the returning flight");
           flightOffer.returningConnections = flights.legs[j].segments.length - 1;
           flightOffer.returningAirline = flights.legs[j].segments[0].airlineName;
           flightOffer.returningDateTime = flights.legs[j].segments[0].departureTime;
           flightOffer.returningArrivalDateTime = flights.legs[j].segments[lastSegment].arrivalTime;
       };
    };
    flightOffers.push(flightOffer);

    // departing info
    var departingInfoLineOne = "<span class = 'flight-info'>" + "Departing from " + departureCity + " on " + flightOffer.departingDate + " via " + flightOffer.departingAirline + "</span>";
    var departingInfoLineTwo = "<span class = 'flight-info'>" + "Arriving in " + destination + " on " + flightOffer.departingArrivalDateTime + " with " + flightOffer.departingConnections + " connecting flight(s)." + "</span>";
    // returning info
    var returningInfoLineOne = "<span class = 'flight-info'>" + "Departing from " + destination + " on " + flightOffer.returningDateTime + " via " + flightOffer.returningAirline + "</span>";
    var returningInfoLineTwo = "<span class = 'flight-info'>" + "Arriving in " + departureCity + " on " + flightOffer.returningArrivalDateTime + " with " + flightOffer.returningConnections + " connecting flight(s)." + "</span>";
    // price in USD
    var ticketPrice = "<span class = 'flight-info'>" + "Fare in USD " + flights.offers[i].totalPrice.formattedPrice + "</span>";

    // create a container for each flight
    var flightEl = document.createElement("a");
    flightEl.classList = "flight-options column my-3 has-text-centered";
    flightEl.setAttribute("href", "https://www.expedia.ca/Flights-Search?flight-type=on&mode=search&trip=roundtrip&leg1=from%3A" + departureAirport + "%29%2Cto%3A" + arrivalAirport + "%29%2Cdeparture%3A" + urlDepartureDate + "TANYT&options=cabinclass%3Aeconomy&leg2=from%3A" + arrivalAirport + "%29%2Cto%3A" + departureAirport + "%29%2Cdeparture%3A" + urlReturnDate + "TANYT&passengers=children%3A0%2Cadults%3A1%2Cseniors%3A0%2Cinfantinlap%3AY&fromDate=" + urlDepartureDate + "&toDate=" + urlReturnDate + "&d1=" + departureDate + "&d2=" + returnDate)

    // create a span element to hold flight info
    var titleEl = document.createElement("span");
    titleEl.innerHTML = departingInfoLineOne + departingInfoLineTwo + returningInfoLineOne + returningInfoLineTwo + ticketPrice;

    // append container
    flightEl.appendChild(titleEl);

    // append container to the dom
    flightContainerEL.appendChild(flightEl);
  }
  console.log(flightOffers);
};


getFlights();
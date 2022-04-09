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

// same function
var getFlights = function () {
    var flightUrl = "https://www.expedia.com:443/api/flight/search?departureDate=" + departureDate + "&returnDate=" + returnDate + "&departureAirport=" + departureAirport + "&arrivalAirport=" + arrivalAirport + "&maxOfferCount=9";

    fetch(flightUrl).then(function (response) {
        // request was successful
        if (response.ok) {
            response.json().then(function (data) {
                console.log(data);
                flightMatch(data);
                // displayFlights(data);
            });
        }
        else {
            // if not successful, redirect to indexpage
            document.location.replace("./index.html");
        }
    });
};

// Creates an array of offers. This will be populated with the flightOffer objects
var flightOffers = []; 

var flightMatch = function(data) {
    for (var i = 0; i < data.offers.length; i++) {
        // Creates the flightOffer object. We will set properties for each object in the loop
        var flightOffer = {};
        flightOffer.totalFare = data.offers[i].totalFare
        // check legs IDs for each data offer
        for (var j = 0; j < data.legs.length; j++){
            if (data.offers[i].legIds[0] === data.legs[j].legId){
                var lastSegment = data.legs[j].segments.length - 1;
                console.log("offers # " + i + " matches legs " + j + " for the departing flight");
                flightOffer.departingSegments = data.legs[j].segments.length
                flightOffer.departingAirline = data.legs[j].segments[0].airlineName;
                flightOffer.departingDateTime = data.legs[j].segments[0].departureTime;
                flightOffer.departingArrivalDateTime = data.legs[j].segments[lastSegment].arrivalTime;
            };
            if (data.offers[i].legIds[1] === data.legs[j].legId) {
                var lastSegment = data.legs[j].segments.length - 1;
                console.log("offers # " + i + " matches legs " + j + " for the returning flight");
                flightOffer.returningSegments = data.legs[j].segments.length
                flightOffer.returningAirline = data.legs[j].segments[0].airlineName;
                flightOffer.returingDateTime = data.legs[j].segments[0].departureTime;
                flightOffer.returningArrivalDateTime = data.legs[j].segments.length.arrivalTime;
                flightOffer.returningArrivalDateTime = data.legs[j].segments[lastSegment].arrivalTime;
            };
        };
        flightOffers.push(flightOffer);
    };
    console.log(flightOffers);
};


getFlights();
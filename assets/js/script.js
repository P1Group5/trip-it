// date format must be yyyy-mm-dd
var departureDate = "2022-04-10";
var returnDate = "2022-04-20";
// locations must be airport code (eg.YYZ for toronto)
var departureAirport = "YYZ";
var arrivalAirport = "LAX";

var getFlights = function(flights) {
    var flightUrl = "https://www.expedia.com:443/api/flight/search?departureDate=" + departureDate + "&returnDate=" + returnDate + "&departureAirport=" + departureAirport + "&arrivalAirport=" + arrivalAirport + "&prettyPrint=true&maxOfferCount=10";

    fetch(flightUrl).then(function(response) {
        // request was successful
        if (response.ok) {
            response.json().then(function(data) {
                // pass response to DOM function
                // once ready, replace console.log(data); with displayFlights(data);
                console.log(data);

                // check if api has paginated flights
                if (response.headers.get("offers")) {
                    displayMoreFlights(flights);
                }
            });
        }
        else {
            // if not successful, redirect to indexpage
            document.location.replace("./index.html");
        }
    });
};

var displayFlights = function(offers) {
    if(offers.length === 0) {
        issueContainerEl.textContent = "There are no flights available for the given dates and locations";
        return;
    }
    for (var i = 0; i < offers.length; i++) {
        var offerEl = document.createElement("a");
    }
};

var displayMoreFlights = function(flights) {};

getFlights();
//flight data
var departureDate = sessionStorage.getItem("departureDate");
var returnDate = sessionStorage.getItem("returnDate");
var departureAirport = sessionStorage.getItem("locationIata");
var arrivalAirport = sessionStorage.getItem("destinationIata");
var destination = sessionStorage.getItem("destinationCity");
var flightContainerEL = document.querySelector("#flights-container");
var destinationEl = document.querySelector("#destinationLocation");
var arrivalDateEl = document.querySelector("#destinationDate");

var displayDestination = function() {
    // clear old content
    destinationEl.textContent = "";
    arrivalDateEl.textContent = "";

    // add new location and data
    destinationEl.textContent = destination;
    arrivalDateEl.textContent = departureDate;
}();

var getFlights = function(flights) {
    var flightUrl = "https://www.expedia.com:443/api/flight/search?departureDate=" + departureDate + "&returnDate=" + returnDate + "&departureAirport=" + departureAirport + "&arrivalAirport=" + arrivalAirport + "&maxOfferCount=9";

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
    var flightInfo = "<span class = 'flight-info'>" + flights.legs[i].segments[0].airlineName + "-" + flights.legs[i].segments[0].departureTime + "</span>";

    // create a container for each flight
    var flightEl = document.createElement("a");
    flightEl.classList = "flight-options column my-3 has-text-centered";
    flightEl.setAttribute("href", "https://www.expedia.ca/Flights?langid=4105&semcid=CA.MULTILOBF.GOOGLE.GT-c-EN.FLIGHT&SEMDTL=a1343588247.b122666585007.r1.g1aud-1210701017259:kwd-18734303544.i1.d1587522981736.e1c.j19000858.k1.f1.n1.l1g.h1b.m1&gclid=Cj0KCQjwl7qSBhD-ARIsACvV1X2hUua4QAi4xyNwpan2GKQFfb6oeD3BT3oEsZ0j61qvkMxmgqTpG_0aAv8eEALw_wcB")

    // create a span element to hold flight info
    var titleEl = document.createElement("span");
    titleEl.innerHTML = flightInfo;

    // append container
    flightEl.appendChild(titleEl);

    // append container to the dom
    flightContainerEL.appendChild(flightEl);
  }
};

getFlights();
// Retrieve the sessionStorage variables
var destinationCity = sessionStorage.getItem("destinationCity");
var destinationCountry = sessionStorage.getItem("destinationCountry");

///////////

const openTripMapApiKey =
  "5ae2e3f221c38a28845f05b6fc7f03941d7b4c7832947ebca4c8010e";

// This function calls API methods by fetch function:

function apiGet(method, query) {
  return new Promise(function (resolve, reject) {
    var otmAPI =
      "https://api.opentripmap.com/0.1/en/places/" +
      method +
      "?apikey=" +
      openTripMapApiKey;
    if (query !== undefined) {
      otmAPI += "&" + query;
    }
    fetch(otmAPI)
      .then((response) => response.json())
      .then((data) => resolve(data))
      .catch(function (err) {
        console.log("Fetch Error :-S", err);
      });
  });
}

// Init global variables for paging:

const pageLength = 10; // number of objects per page

let lon; // place longitude
let lat; // place latitude

let offset = 0; // offset from first object in the list
let count; // total objects count

function getToDoList() {
  apiGet("geoname", "name=" + destinationCity).then(function (data) {
    // let message = "Name not found";
    if (data.status == "OK") {
      // message = data.name + ", " + getCountryName(data.country);
      lon = data.lon;
      lat = data.lat;
      firstLoad();
    }
  });
}

// This function gets total objects count within 5000 meters from specified location(lon, lat) and then loads first objects page:

function firstLoad() {
  apiGet(
    "radius",
    `radius=5000&limit=${pageLength}&offset=${offset}&lon=${lon}&lat=${lat}&rate=2&format=count`
  ).then(function (data) {
    loadList();
  });
}

// This function load POI's list page to the left pane. It uses 5000 meters radius for objects search:

function loadList() {
  apiGet(
    "radius",
    `radius=5000&limit=${pageLength}&offset=${offset}&lon=${lon}&lat=${lat}&rate=2&format=json`
  ).then(function (data) {
    let list = document.getElementById("toDoList");
    data.forEach((item) => list.appendChild(createDivToDo(item)));
  });
}

// This function creates a div from the data fetched:

function createDivToDo(item) {
  let kind = item.kinds.split(",");
  let div = document.createElement("div");
  div.className = "things-to-do column my-3";
  div.setAttribute("data-id", item.xid);
  div.innerHTML = `<h5 id="toDoLocation" class="is-size-5 has-text-weight-bold px-3 py-3">${item.name}</h5>
    <h6 id="toDoDescription" class="is-size-6 px-3 py-3">${kind[1]}</h6>`;

  // customize the function from this part to create a modal for the detailed info from object
  /*
    div.addEventListener("click", function () {
        document.querySelectorAll("#list div").forEach(function (item) {
            item.classList.remove("active");
        });
        this.classList.add("active");
        let xid = this.getAttribute("data-id");
        apiGet("xid/" + xid).then(data => onShowPOI(data));
    });  
    */
  return div;
}

// Please try to adapt the function bellow to display the remaining info in a modal when clicking the object
/*
function onShowPOI(data) {
    let poi = document.getElementById("poi");
    poi.innerHTML = "";
    if (data.preview) {
        poi.innerHTML += `<img src="${data.preview.source}">`;
    }
    poi.innerHTML += data.wikipedia_extracts
        ? data.wikipedia_extracts.html
        : data.info
            ? data.info.descr
            : "No description";

    poi.innerHTML += `<p><a target="_blank" href="${data.otm}">Show more at OpenTripMap</a></p>`;
};
*/

getToDoList();

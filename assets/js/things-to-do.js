// Retrieve the sessionStorage variable
var destinationInput = sessionStorage.getItem('destination');

// This block uses the placename from input textbox and gets place location from API.If place was found it calls list loading function:
let text = "How are, you doing, today?";
const destinationArray = destinationInput.split(", ");



///////////

const apiKey = "5ae2e3f221c38a28845f05b6fc7f03941d7b4c7832947ebca4c8010e";

// This function calls API methods by fetch function:

function apiGet(method, query) {
    return new Promise(function (resolve, reject) {
        var otmAPI =
            "https://api.opentripmap.com/0.1/en/places/" +
            method +
            "?apikey=" +
            apiKey;
        if (query !== undefined) {
            otmAPI += "&" + query;
        }
        fetch(otmAPI)
            .then(response => response.json())
            .then(data => resolve(data))
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
    

document
.getElementById("search_form")
    .addEventListener("submit", function (event) {
        let name = document.getElementById("textbox").value;
        apiGet("geoname", "name=" + name +"&country=" + country).then(function (data) {
            let message = "Name not found";
            if (data.status == "OK") {
                message = data.name + ", " + getCountryName(data.country);
                lon = data.lon;
                lat = data.lat;
                firstLoad();
            }
            document.getElementById("info").innerHTML = `${message}`;
        });
        event.preventDefault();
    });

// This function gets total objects count within 1000 meters from specified location(lon, lat) and then loads first objects page:

function firstLoad() {
    apiGet(
        "radius",
        `radius=5000&limit=${pageLength}&offset=${offset}&lon=${lon}&lat=${lat}&rate=2&format=count`
    ).then(function (data) {
        count = data.count;
        offset = 0;
        document.getElementById(
            "info"
        ).innerHTML += `<p>${count} objects with description in a 5km radius</p>`;
        loadList();
    });
}
    

// This function load POI's list page to the left pane. It uses 5000 meters radius for objects search:

function loadList() {
    apiGet(
        "radius",
        `radius=5000&limit=${pageLength}&offset=${offset}&lon=${lon}&lat=${lat}&rate=2&format=json`
    ).then(function (data) {
        let list = document.getElementById("list");
        list.innerHTML = "";
        data.forEach(item => list.appendChild(createListItem(item)));
        let nextBtn = document.getElementById("next_button");
        if (count < offset + pageLength) {
            nextBtn.style.visibility = "hidden";
        } else {
            nextBtn.style.visibility = "visible";
            nextBtn.innerText = `Next (${offset + pageLength} of ${count})`;
        }
    });
}
   

// This function create a list item at the left pane:

function createListItem(item) {
    let a = document.createElement("a");
    a.className = "list-group-item list-group-item-action";
    a.setAttribute("data-id", item.xid);
    a.innerHTML = `<h5 class="list-group-item-heading">${item.name}</h5>
                <p class="list-group-item-text">${getCategoryName(item.kinds)}</p>`;

    a.addEventListener("click", function () {
        document.querySelectorAll("#list a").forEach(function (item) {
            item.classList.remove("active");
        });
        this.classList.add("active");
        let xid = this.getAttribute("data-id");
        apiGet("xid/" + xid).then(data => onShowPOI(data));
    });
    return a;
}

// This function shows preview and description at the right pane:

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
}

// This block process Next page button

document
    .getElementById("next_button")
    .addEventListener("click", function () {
        offset += pageLength;
        loadList();
    });
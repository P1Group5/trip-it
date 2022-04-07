// this function is triggered by a change on the input form
$("#destination-input").change(function () {
    // reads the value of the destination input field
    var destinationInput = document.getElementById("destination-input").value;
    
    // Stores the first 3 characters of the string
    var destinationIata = destinationInput.substring(0, 3);
    console.log(destinationIata);
    
    // Stores the information from the string starting on the 5th character
    var destinationCityCountry = destinationInput.substring(6)
    
    // Splits the city and country by the comma separator
    var destinationArray = destinationCityCountry.split(", ");
    var destinationCity = destinationArray[0];
    console.log(destinationCity);
    var destinationCountry = destinationArray[1];
    console.log(destinationCountry);
    
    sessionStorage.setItem("destinationIata", destinationIata);
    sessionStorage.setItem("destinationCity", destinationCity);
    sessionStorage.setItem("destinationCountry", destinationCountry); 
});

// this function is triggered by a change on the input form
$("#location-input").change(function () {
    // reads the value of the destination input field
    var locationInput = document.getElementById("location-input").value;

    // Stores the first 3 characters of the string
    var locationIata = locationInput.substring(0, 3);
    console.log(locationIata);

    // Stores the information from the string starting on the 5th character
    var locationCityCountry = locationInput.substring(6)

    // Splits the city and country by the comma separator
    var locationArray = locationCityCountry.split(", ");
    var locationCity = locationArray[0];
    console.log(locationCity);
    var locationCountry = locationArray[1];
    console.log(locationCountry);

    sessionStorage.setItem("locationIata", locationIata);
    sessionStorage.setItem("locationCity", locationCity);
    sessionStorage.setItem("locationCountry", locationCountry);
});

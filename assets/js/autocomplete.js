$(function () {
$("#location-input").autocomplete({
    minLength: 3,
    delay: 500, 
    source: airportLabels,
    
});
});

$(function () {
$("#destination-input").autocomplete({
    minLength: 3,
    delay: 500,
    source: airportLabels,

});
});
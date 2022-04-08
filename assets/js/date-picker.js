// DATE PICKER FUNCTIONALITY
$("#datePicker-going").datepicker({

});

$("#datePicker-home").datepicker({

});

// NAVBAR MENU MOBILE
var burgerIcon = document.querySelector("#burger");
var navbarMenu = document.querySelector("#nav-links");

burgerIcon.addEventListener("click", function () {
    navbarMenu.classList.toggle("is-active");
});

// MODALS
var currentWeatherBtn = document.querySelector("#currentWeatherBtn");
var weeklyWeatherBtn = document.querySelector("#weeklyWeatherBtn");
var biWeeklyWeatherBtn = document.querySelector("#biWeeklyWeatherBtn");
var monthlyWeatherBtn = document.querySelector("#monthlyWeatherBtn");
var modalBg = document.querySelector(".modal-background");

var modal = document.querySelector(".modal");
var currentModal = document.querySelector(".current-weather-modal");
var weeklyModal = document.querySelector(".weekly-weather-modal");
var biweeklyModal = document.querySelector(".biweekly-weather-modal");
var monthlyModal = document.querySelector(".monthly-weather-modal");

currentWeatherBtn.addEventListener("click", function() {
    currentModal.classList.add("is-active");
});

weeklyWeatherBtn.addEventListener("click", function() {
    weeklyModal.classList.add("is-active");
});

biWeeklyWeatherBtn.addEventListener("click", function() {
    biweeklyModal.classList.add("is-active");
});

monthlyWeatherBtn.addEventListener("click", function() {
    monthlyModal.classList.add("is-active");
});

modalBg.addEventListener("click", function() {
    modal.classList.remove("is-active");
});
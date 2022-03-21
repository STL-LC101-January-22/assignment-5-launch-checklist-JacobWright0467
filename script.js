// Write your JavaScript code here!

const { formSubmission, pickPlanet, addDestinationInfo } = require("./scriptHelper");

window.addEventListener("load", function() {
    let form = document.querySelector("form");
    form.addEventListener("submit", function(event) {
        event.preventDefault();
       let pilotName = document.querySelector("input[name=pilotName]");
       let copilotName = document.querySelector("input[name=copilotName]");
       let fuelLevel = document.querySelector("input[name=fuelLevel]");
       let cargoMass = document.querySelector("input[name=cargoMass]");
       let list = document.querySelectorAll("li");
       if (pilotName.value === "" || copilotName.value === "" || fuelLevel.value === "" || cargoMass.value === "") {
          alert("All fields are required!");
       }
       else {
           formSubmission(document, list, pilotName, copilotName, fuelLevel, cargoMass);
       }
    });
});

window.addEventListener("load", function() {
   let listedPlanets = myFetch();
   // Set listedPlanetsResponse equal to the value returned by calling myFetch()
   let listedPlanetsResponse;
   listedPlanetsResponse.then(function (result) {
       listedPlanets = result;
       console.log(listedPlanets);
   }).then(function () {
       console.log(listedPlanets);
       // Below this comment call the appropriate helper functions to pick a planet fom the list of planets and add that information to your destination.
       let planetSelection = pickPlanet(listedPlanets);
       addDestinationInfo(planetSelection);
   })
});

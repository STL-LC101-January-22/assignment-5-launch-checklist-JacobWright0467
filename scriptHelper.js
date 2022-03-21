const { parseFragment } = require('jsdom/lib/jsdom/browser/parser');
const { elementAttributeModified } = require('jsdom/lib/jsdom/living/named-properties-window');

// Write your helper functions here!
require('isomorphic-fetch');

function addDestinationInfo(document, name, diameter, star, distance, moons, imageUrl) {
   // Here is the HTML formatting for our mission target div.
   /*
                <h2>Mission Destination</h2>
                <ol>
                    <li>Name: </li>
                    <li>Diameter: </li>
                    <li>Star: ${star}</li>
                    <li>Distance from Earth: </li>
                    <li>Number of Moons: </li>
                </ol>
                <img src="">
   */
  let startingPoint = getElementById("missionTarget");
  let parent = getElementById("missionTarget");

  let missionDestination = document.createElement("h2");
  missionDestination.appendChild(document.createTextNode("Mission Destination"));
  parent.insertAfter(startingPoint, missionDestination);
  
  let orderedList = document.createElement("ol");
  parent.insertAfter(missionDestination, orderedList);

  let listName = document.createElement("li");
  listName.appendChild(document.createTextNode(`Name: ${name}`));
  parent.insertAfter(orderedList, listName);
  
  let listDiameter = document.createElement("li");
  listDiameter.appendChild(document.createTextNode(`Diameter: ${diameter}`));
  parent.insertAfter(listName, listDiameter);

  let listStar = document.createElement("li");
  listStar.appendChild(document.createTextNode(`Star: ${star}`));
  parent.insertAfter(listDiameter, listStar);

  let listDistance = document.createElement("li");
  listDistance.appendChild(document.createTextNode(`Distance: ${distance}`));
  parent.insertAfter(listStar, listDistance);

  let listMoons = document.createElement("li");
  listMoons.appendChild(document.createTextNode(`Moons: ${moons}`));
  parent.insertAfter(listDistance, listMoons);
}


function validateInput(testInput) {
    if (testInput === 'undefined') {
        return 'Empty';
    }
    else if (isNaN(testInput)) {
       return 'Not a Number';
   }
   else if (!isNaN(testInput)) {
       return 'Is a Number';
   }
}

function formSubmission(document, list, pilot, copilot, fuelLevel, cargoLevel) {
   let flag = 0;

    if (validateInput(pilot) === 'Not a Number') {
       list[0].textContent = `${pilot} ready!`;
       ++flag;
   }
   else {
       alert("Pilot name cannot be a number!");
   }
   if (validateInput(copilot) === 'Not a Number') {
       list[1].textContent = `${copilot} ready!`;
       ++flag;
   }
   else {
       alert("Copilot name cannot be a number!");
   }
   if (validateInput(fuelLevel) === 'Is a Number') {
        if (fuelLevel < 10000) {
            let faultyItems = document.querySelector("div[id=faultyItems]");
            faultyItems.style = "visibility: visible";
            let fuelStatus = document.querySelector("li[id=fuelStatus]");
            fuelStatus.textContent = "There is not enough fuel for the journey";
            let launchStatus = document.querySelector("h2[id=launchStatus]");
            launchStatus.textContent = "Shuttle not ready for launch";
            launchStatus.style = "color: red; visibility: visible";
            ++flag;
        }
   }
   else {
       alert("Fuel level must be a number!");
   }
   if (validateInput(cargoLevel) === 'Is a Number') {
        if (cargoLevel > 10000) {
            let faultyItems = document.querySelector("div[id=faultyItems]");
            faultyItems.style = "visibility: visible";
            let cargoStatus = document.querySelector("li[id=cargoStatus]");
            cargoStatus.textContent = "Too much mass for shuttle to take off";
            let launchStatus = document.querySelector("h2[id=launchStatus]");
            launchStatus.textContent = "Shuttle not ready for launch";
            launchStatus.style = "color: red; visibility: visible";
            ++flag;
        }
   }
   else {
       alert("Cargo level must be a number!")
   }
   if (flag = 4) {
        let launchStatus = document.querySelector("h2[id=launchStatus]");
        launchStatus.textContent = "Shuttle is ready for launch!";
        launchStatus.style = "color: green; visibility: visible";
   }
}

async function myFetch() {
    let planetsReturned;

    planetsReturned = await fetch("https://handlers.education.launchcode.org/static/planets.json").then( function(response) {
        return response.json();
        });

    return planetsReturned;
}

function pickPlanet(planets) {
    let randomSelection = Math.floor(Math.random() * 6) + 1;
    return planets[randomSelection];
}

module.exports.addDestinationInfo = addDestinationInfo;
module.exports.validateInput = validateInput;
module.exports.formSubmission = formSubmission;
module.exports.pickPlanet = pickPlanet; 
module.exports.myFetch = myFetch;

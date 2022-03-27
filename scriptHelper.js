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

  let startingPoint = document.getElementById("missionTarget");
  let parent = document.getElementById("missionTarget");

  let missionDestination = document.createElement("h2");
  missionDestination.appendChild(document.createTextNode("Mission Destination"));
  parent.insertBefore(missionDestination, parent.firstChild);
  
  let orderedList = document.createElement("ol");
  insertAfter(missionDestination, orderedList);

  let listName = document.createElement("li");
  listName.appendChild(document.createTextNode(`Name: ${name}`));
  insertAfter(orderedList, listName);
  
  let listDiameter = document.createElement("li");
  listDiameter.appendChild(document.createTextNode(`Diameter: ${diameter}`));
  insertAfter(listName, listDiameter);

  let listStar = document.createElement("li");
  listStar.appendChild(document.createTextNode(`Star: ${star}`));
  insertAfter(listDiameter, listStar);

  let listDistance = document.createElement("li");
  listDistance.appendChild(document.createTextNode(`Distance: ${distance}`));
  insertAfter(listStar, listDistance);

  let listMoons = document.createElement("li");
  listMoons.appendChild(document.createTextNode(`Moons: ${moons}`));
  insertAfter(listDistance, listMoons);

  let listImage = document.createElement("img");
  listImage.setAttribute("src", imageUrl);
  listImage.setAttribute("width", "200");
  listImage.setAttribute("height", "100");
  insertAfter(listMoons, listImage);

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

   let fuelNum = parseInt(fuelLevel);
   let cargoNum = parseInt(cargoLevel);

    if (validateInput(pilot) === 'Not a Number') {
        let pilotStatus = document.querySelector("li[id=pilotStatus]");
        pilotStatus.textContent = `${pilot} ready!`;
        ++flag;
   }
   else {
       alert("Pilot name cannot be a number!");
   }
   if (validateInput(copilot) === 'Not a Number') {
       let copilotStatus = document.querySelector("li[id=copilotStatus]");
       copilotStatus.textContent = `${copilot} ready!`;
       ++flag;
   }
   else {
       alert("Copilot name cannot be a number!");
   }
   if (validateInput(fuelNum) === 'Is a Number') {
        if (fuelNum < 10000) {
            let faultyItems = document.querySelector("div[id=faultyItems]");
            faultyItems.style = "visibility: visible";
            let fuelStatus = document.querySelector("li[id=fuelStatus]");
            fuelStatus.textContent = "There is not enough fuel for the journey";
        }
        else { 
            ++flag;
        }
   }
   else {
       alert("Fuel level must be a number!");
   }
   if (validateInput(cargoNum) === 'Is a Number') {
        if (cargoNum > 10000) { 
            let faultyItems = document.querySelector("div[id=faultyItems]");
            faultyItems.style = "visibility: visible";
            let cargoStatus = document.querySelector("li[id=cargoStatus]");
            cargoStatus.textContent = "Too much mass for shuttle to take off";
        }
        else{
            ++flag;
        }
   }
   else {
       alert("Cargo level must be a number!")
   }
   if (flag == 4) {
        let launchStatus = document.querySelector("h2[id=launchStatus]");
        launchStatus.textContent = "Shuttle is ready for launch!";
        launchStatus.style = "color: green; visibility: visible";
   }
   else {
        let launchStatus = document.querySelector("h2[id=launchStatus]");
        launchStatus.textContent = "Shuttle not ready for launch";
        launchStatus.style = "color: red; visibility: visible";
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

function insertAfter(existingNode, newNode) {
    existingNode.parentNode.insertBefore(newNode, existingNode.nextSibling);
}

module.exports.addDestinationInfo = addDestinationInfo;
module.exports.validateInput = validateInput;
module.exports.formSubmission = formSubmission;
module.exports.pickPlanet = pickPlanet; 
module.exports.myFetch = myFetch;

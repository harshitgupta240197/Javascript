/* Use a for-in loop to loop through an object containing city populations.
Stop the loop when the population of Berlin is found and store all the previous cities populations 
in a new object called cityPopulations
*/

let citiesP = {
    'London' : 95000,
    'New York' :67000,
    'Paris': 20000,
    'Berlin' : 89000
}
let cityPopulations = {}

for (const x in citiesP) {
    if (x === 'Berlin') 
        break;
    
    cityPopulations[x] = citiesP[x]
    
}

console.log(cityPopulations);




/* Use a for-in loop to loop through an object containing city populations.
Skip any city with a population below 3 million and store the rest in a new object named largeCities.

let worldCities = {
  "Sydney": 5000000,
  "Tokyo": 9000000,
  "Berlin": 3500000,
  "Paris": 2200000
};
*/

let worldCities = {
  "Sydney": 5000000,
  "Tokyo": 9000000,
  "Berlin": 3500000,
  "Paris": 2200000
};
let largeCities = {}

for (const city in worldCities) {
    if (worldCities[city] < 3000000){ 
        continue;
    }
    largeCities[city] = worldCities[city]  
}

console.log(largeCities);



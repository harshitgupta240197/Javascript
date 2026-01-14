/*
Write a for-each loop that iterates through the array ['earl grey', 'green tea', 'chai', 'oolong tea'].
Stop the loop when 'chai' is found and store all the previous teaTypes in an array called 'availableTeas'
*/

let teaTypes = ['earl grey', 'green tea', 'chai', 'oolong tea']
let availableTeas = []
let foundChai = false

teaTypes.forEach(tea => {
    if (tea === 'chai') {
        foundChai = true
        return   
    } 
    if (!foundChai) {
        availableTeas.push(tea)  
    }  
});

console.log(availableTeas);



/* Write a forEach loop that iterates through the array ['Berlin', 'Tokyo', 'Sydney', 'Paris'].
Skip Sydney and store the other cities in a new array called traveledCities.
*/
let citiesList = ['Berlin', 'Tokyo', 'Sydney', 'Paris']
let traveledCities = []

citiesList.forEach(city => {

    if (city === 'Sydney') {
        return   
    }
    traveledCities.push(city)
    
});
console.log(traveledCities);





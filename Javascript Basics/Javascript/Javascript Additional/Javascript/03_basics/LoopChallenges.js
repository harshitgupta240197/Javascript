/*
Write a FOR Loop that loops through the array ['green tea', 'black tea', 'chai', 'oolong tea']
and stops when it finds 'chai'.
Store all teas before 'chai' and store it in a new array called 'selectedTeas'
*/

let selectedTeas = []
let teaTypes = ['green tea', 'black tea', 'chai', 'oolong tea']

for (let x = 0; x < teaTypes.length; x++) {
    
    if (x < teaTypes.indexOf('chai')) {
        selectedTeas.push(teaTypes[x])
    }    
}
console.log(selectedTeas);



// Another method of executing the same thins
// let selectedTeas = []
// let teaTypes = ['green tea', 'black tea', 'chai', 'oolong tea']

// for (let x = 0; x < teaTypes.length; x++) {
    
//     if (teaTypes[x] === 'chai') {
//         break
//     }   
//     selectedTeas.push(teaTypes[x]) 
// }
// console.log(selectedTeas);


/* Write a FOR loop that loops through the array ['London', 'New York', 'Paris', 'Berlin'] and skips Paris.
Store the other cities in a new array named 'visitedCities' 
*/

cities = ['London', 'New York', 'Paris', 'Berlin']
visitedCities = []

for (let i = 0; i < cities.length; i++) {
    
    if (cities[i] === 'Paris' || cities[i] === 'paris') {         // Checks for both Paris and paris
        continue
    }
    visitedCities.push(cities[i])
    
}
console.log(visitedCities);

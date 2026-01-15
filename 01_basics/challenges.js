// Create an array
let teaFlavors = ['green tea', 'black tea', 'oolong tea']
const firstTea = teaFlavors[0]
console.log(firstTea);

let cities = ['London', 'Tokyo', 'Paris', 'New York']
const favoriteCity = cities[2]
console.log(favoriteCity);

let teaTypes = ['herbal tea', 'white tea', 'masala chai']
teaTypes[1] = 'jasmine tea'
console.log(teaTypes);

let citiesVisited = ['Mumbai', 'Lucknow']
citiesVisited.push('Berlin')
console.log(citiesVisited);

let cars = ['Supercars', 'Hypercars', 'Supersonic']
fastCar = cars.pop([2])
console.log(fastCar);

// CREATE A HARD COPY - SPREAD Operator
let topCities = ['Mumbai', 'Delhi', 'Lucknow']
let hardCopy = [...topCities] // This cannot be manipulated at all

// CONCATENATION
let cityList1 = ['Paris', 'Delhi']
let cityList2 = ['Lucknow', 'Sydney']
let combineCities = cityList1.concat(cityList2)
console.log(combineCities);


let cityBucket = ['Kashmir', 'Jammu', 'Punjab']
isKashmirInList = cityBucket.includes('Kashmir')
console.log(isKashmirInList);

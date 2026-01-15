// Arrays can take any type of data within them

// PUSH will insert an array inside an array
const marvel_heroes = ["thor", "IronMan", "Spiderman", 34]
const dc_heroes = ["Batman", "Superman", "Flash"]
marvel_heroes.push(dc_heroes)
console.log(marvel_heroes);

// To access an array inside an array 
console.log(marvel_heroes[4][1]); // Superman

// CONCAT will merge both the arrays but we will have to hold it in a new variable first
const allHeroes = marvel_heroes.concat(dc_heroes)
console.log(allHeroes); // [ 'thor', 'IronMan', 'Spiderman', 34, 'Batman', 'Superman', 'Flash' ]

// SPREAD = This also functions like a concat operation
const all_new_heroes = [...marvel_heroes, ...dc_heroes] // ... is a sread operator
console.log(all_new_heroes); // [ 'thor', 'IronMan', 'Spiderman', 34, 'Batman', 'Superman', 'Flash' ]


// Using FLAT
const another_array = [1, 2, 3, [4, 5, 6], 7, [8, 9, [4, 5]]]
const real_another_array = another_array.flat(Infinity) // Infinity is the DEPTH
console.log(real_another_array); 





//+++++++++++++++++++++++++++ARRAY = ISARRAY, FROM, OF+++++++++++++++++++++++++//

console.log(Array.isArray("Harshit")); // Asking if this is an array or not = no
console.log(Array.from("Harshit")); // This FROM will convert it to an ARRAY
console.log(Array.from({name: "Harshit"})); // This will give an empty array since it will not be able to convert it to an array


let score1 = 100
let score2 = 200
let score3 = 300
// Using OF methos
console.log(Array.of(score1, score2, score3));



// Use a for-of loop to iterate through the array [1, 2, 3, 4, 5] and stop when the number 4 is found.
// Store the numbers before 4 in an array named smallNumbers.

numbers = [1, 2, 3, 4, 5]
smallNumbers = []

for (const i of numbers) {

    if (i === 4) {
        break  
    }
    smallNumbers.push(i)
    
}
console.log(smallNumbers);


/* Use a for-of loop to iterate through the array ['chai', 'green tea', 'herbal tea', 'black tea'] and skip herbal tea.
Store the other teas in am array called preferredTeas.
*/

teaTypes = ['chai', 'green tea', 'herbal tea', 'black tea']
preferredTeas = []

for (const tea of teaTypes) {

    if (tea === 'herbal tea' || tea === 'Herbal Tea') {
        continue
    }
    preferredTeas.push(tea)
    
}
console.log(preferredTeas);




// Use a FOR-OF loop to iterate through the array ['chai', 'green tea', 'black tea', 'jasmine tea', 'herbal tea'].
//Stop when the length of the current tea name is greater than 10 
//Store the teas iterated over in an array named 'shortTeas'

let teaVariety = ['chai', 'green tea', 'black tea', 'jasmine tea', 'herbal tea']
let shortTeas = []

for (const x of teaVariety) {

    if (x.length > 10) {
        break
    }
    shortTeas.push(x)
    
}
console.log(shortTeas);

const score = 400
console.log(score)
console.log(typeof score) // The type will be a number

const balance = new Number(100)
console.log(balance) // This will be a number

// Now we will convert the Number to a string using the toString method:
console.log(balance.toString())

// We can also add two methods together
console.log(balance.toString().length)

// We can use toFixed method for precision values (specially for ecommerce application)
console.log(balance.toFixed(2)) // this will print 100.00 (two decimal places)

// Using Precision method
const otherNumber = 24.5555334
console.log(otherNumber.toPrecision(5))

// toLocaleString
const hundreds = 1000000000
// The default value will be printed in US based style
console.log(hundreds.toLocaleString()) // Prints the result as 1,000,000,000
// To print the result in Indian style
console.log(hundreds.toLocaleString('en-IN')) // Prints the result as 1,00,00,00,000



// ***************************************************** MATHS ****************************************//

console.log(Math) // Prints Object [Math] {} which means it is an object with a lot of prperties

console.log(Math.abs(-4)) // Converts negative to positiive
console.log(Math.round(4.3)) // For rounding off
console.log(Math.ceil(4.2)) // This will round off to the higher side
console.log(Math.floor(4.9)) // This will round off to the lower side
console.log(Math.max(3, 4, 5, 6)) // Max value in an array
console.log(Math.min(3, 4, 5, 6)) // Min value in an array


console.log(Math.random()) // This will produce random values between 0 and 1 always.
console.log((Math.random() * 10) + 1)

// Random numbers within a range
const min = 10
const max = 20
console.log(Math.floor(Math.random() * (max - min + 1)) + min)
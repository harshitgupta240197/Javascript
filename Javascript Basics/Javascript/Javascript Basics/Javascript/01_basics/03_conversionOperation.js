let score = "33"

console.log(typeof score)
console.log(typeof (score))  //Using METHOD by putting inside parenthesis

let valueInNumber = Number(score) //Converting the string to Number

console.log(typeof score)
console.log(typeof valueInNumber)



let marks = "44abs" //This is a string
let marksInNumber = Number(marks) //Coversion will convert string to a number
console.log(typeof marks)
console.log(typeof marksInNumber)
console.log(marksInNumber) //Printing this will produce NaN (Not a Number)


let subject = null //This is treated as an object in JS
let subjectInNumber = Number(subject) //Coversion will convert null to a number
console.log(typeof subject)
console.log(typeof subjectInNumber)
console.log(subjectInNumber) //Printing this will produce 0


// "33" => 33
// "33abc" => NaN
// true => 1; false = 0

let isLoggedIn = 1 //If we leave this value as empty then the result will be False else True
let booleanIsLoggedIn = Boolean(isLoggedIn)

console.log(typeof isLoggedIn)
console.log(typeof booleanIsLoggedIn)

// 1 => True
// => False
// "String" => True

let someNumber = 33
let stringNumber = String(someNumber)
console.log(typeof stringNumber)




// ************************************** OPERATIONS **************************************//

let value = 3
let negativeValue = -value
console.log(negativeValue) //The result will be -3

console.log(2+3) //Result will be 5

let str1 = "Hello"
let str2 = " Harshit"
console.log(str1 + str2)

//Or we can do it another way like this
let str3 = str1 + str2
console.log(str3)


console.log("1" + 4)
console.log("Harshit" + 4)

console.log(true) //This will return True
console.log(+true) //This will return 1
console.log(+"") //This will return 0

let num1, num2, num3
num1 = num2 = num3 = 2 + 2

// Postfix operator
let gameCounter = 100
gameCounter++;
console.log(gameCounter) // THis will give 101

//******or*******//

// Prefix operator
let gameCounterr = 100
++gameCounterr;
console.log(gameCounterr) // This will give 101 as well


// Link to the article : https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Operators/Increment
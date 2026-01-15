// Basically there are two datatypes:
//  1. Primitive Datatypes
//  2. Non-Primitive Datatypes / Reference Datatypes


//********************************Primitive Datatypes*********************/*/

// There are 7 categories under Primitive Datatype
// All these Primitive Datatypes are basically CALL BY VALUE => Copy of the data is received and changes are made to the copy

// 1. String 2. Number 3. Boolean 4. Null 5. Undefined 6. Symbol 7. BigInt

const score = 100
const scoreValue = 100.3 // In JS we don't have to separately mention decimal from other numbers like in python

const isLoggedIn = false
const outsideTemp = null

let userEmail; // This will remain undefined
let userEmails = undefined // This will also remain undefined

// For symbols which are for uniqueness mostly in used in ReactJS
const id  = Symbol('123')
const anotherId = Symbol('123')

// The resulting value will be the same
console.log(id)
console.log(anotherId)
// But then too they will not be equal to each other so the result of the comparison will be false
console.log(id === anotherId)

// BIGINT = To execute BigInt we just add n add the end of a very big number
const bigNumber = 234234524352352352123123212213n
console.log(bigNumber)
// If you check the typeof of BIGINT then you will get UNDEFINED

//*****************Non - Primitive Datatypes / Reference Datatypes**************/*/

// 1. Array 2. Objects 3. Functions


// ARRAY
const fruits = ["Banana", "apple", "Mango"]

//OBJECTS {}
// Anything inside a Curly Brace is an object in JS.
// An object can be stored inside a variable
let myObject = {
    name: "Harshit",
    age: 28,
    Born: "Varanasi",
}


// FUNCTIONS (){}
// In JS we can treat a function as Variable too

// Definition of a basic function
//function(){}

// Storing the function in a variable
const myFunction = function(){
    console.log("Hello World");
}



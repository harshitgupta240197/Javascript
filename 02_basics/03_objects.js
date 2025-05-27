// There are two ways of declaring an object :
// 1. Literal
// 2. Constructor


// SINGLETON : 
// A type of object that gets created when an oject is declare using Construcotr. 

// We can also create an obejct using Object.create


// OBJECT LITERALS
// The {curely braces} is the Object
// Objects store KEYS and VALUES

// Let us declare a symbol
const mySym = Symbol("key1")


const JsUser = {
    name: "Harshit", // This is processed as a string
    age: 28,
    isLogegdIn: true,
    location: 'Lucknow',
    email: 'biogenius6@gmail.com',
    lastLoginDays: ['Monday', 'Tuesday', 'Wednesday'],
    [mySym]: "myKey1"
}

// To access the values inside the object this is one way
console.log(JsUser.name);

// This is another way to access the values inside an Object
console.log(JsUser["name"]);

console.log(JsUser[mySym]); // SYMBOL

console.log(typeof mySym);


// Overwriting already declared values:
JsUser.email = "harshitgupta@gmail.com"

console.log(JsUser.email);

// FREEZE = This is applied to an object if we do not want anyone to change the already declared values of an object
// Object.freeze(JsUser)

JsUser.email = "harshitgupta@microsoft.com"
console.log(JsUser);


//**********FUNCTION****************** */

// We will create a Greeting function
JsUser.greeting = function(){
    console.log("Hello Harshit");
}

console.log(JsUser.greeting());

console.log(typeof JsUser.greeting); // Function


// FUNCTIONS
JsUser.greetingTwo = function(){
    console.log(`Hello JS User, ${this.name}`); // We use THIS when we are referring to the same object
}

console.log(JsUser.greetingTwo());










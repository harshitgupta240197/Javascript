//Declaring an empty object
const newUser = new Object()
console.log(newUser); // Reuslt is an empty object {}

// Declaring an empty object another way
const newUser2 = {}
console.log(newUser2); // Result is an empty object {}

// Injecting values into an empty object
newUser.name = 'Harshit'
newUser.age = 28
newUser.isLoggedIn = true

console.log(newUser); // Result = { name: 'Harshit', age: 28, isLoggedIn: true }


// NESTED OBJECTS
const dailyUser = {
    name: {
        userfullname: {
            first_name: 'Harshit',
            last_name: 'Gupta'
        }
    }
}

console.log(dailyUser.name.userfullname); // Result : { first_name: 'Harshit', last_name: 'Gupta' }

// In case we are not sure if the value exists in the Object or not then we use "?"
console.log(dailyUser.name?.userfullname); // Kind of an if-else situation



// Joining Objects
const obj1 = {1: "a", 2: "b"}
const obj2 = {3: "a", 4: "b"}

// When printing like this binding does not occur
const obj3 = {obj1, obj2} // On printing => Result => { obj1: { '1': 'a', '2': 'b' }, obj2: { '3': 'a', '4': 'b' } }
console.log(obj3); 

// Binding is done using this method
// const returnedTarget = Object.assign(target, source)
// An empty object is taken in the starting {} which will act as a permanent TARGET
const obj4 = Object.assign({}, obj1, obj2) // On printing the result is { '1': 'a', '2': 'b', '3': 'a', '4': 'b' }
console.log(obj4);

// In real life case scenario to bind we use the SPREAD (...) operator
const obj5 = {...obj1, ...obj2}
console.log(obj5); // { '1': 'a', '2': 'b', '3': 'a', '4': 'b' }



// The format in which the Data comes from Databases is like below
const users = [
    {
        id: 1,
        email: 'harshit@gmail.com'
    },
        {
        id_1: 2,
        email_2: 'harshit2@gmail.com'
    }
]

//To access details
users[1].email


// Studying datatypes
console.log(newUser); // { name: 'Harshit', age: 28, isLoggedIn: true }
console.log(Object.keys(newUser)); // [ 'name', 'age', 'isLoggedIn' ]            => ARRAY
console.log(Object.values(newUser)); // [ 'Harshit', 28, true ]

// Creating key value pairs while printing to console using ENTRIES
console.log(Object.entries(newUser)); // [ [ 'name', 'Harshit' ], [ 'age', 28 ], [ 'isLoggedIn', true ] ]


// We can also check if the element is present or not using hasOwnProperty
console.log(newUser.hasOwnProperty('isLoggedIn')); // Return results in Boolean


//^^^^^^^^^^^^^^^^^^^^^^^^^^ DESTRUCTURING ***********************************//

const course = {
    name: 'JS course',
    source: 'youtube',
    mode: 'video'
}

// To access the data inside it
course.mode
// This is another way
const {source} = course
console.log(source);

// destructuring: We can restructure an Object
const {source: teacher} = course // Here we changed source to teacher but the value remains the same
console.log(teacher);



//%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%% JSON %%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%//

// JSON looks like this 

// {
//     naming: 'Harshit',
//     age: 28,
//     group: 'Alpha'
// } 


// APIs can be found in the form of both Objects {} and Arrays []
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

/*
In Javascript there are two types of programming :

1. Prototype Based Programming

2. Class - Object Based Programming : 

             a. Class
             b. Object
             c. Constructor

*/

let computer = {cpu: 12};
let lenovo = {
    screen: "HD",
    __proto__: computer
}
let apple = {};

// To access any prototype we use __proto__ = Dunder proto dunder

console.log('lenovo', lenovo.__proto__);            // Dunder = Double Underscore 



// setPrototypeOf
let genericCar = {tyres: 4}
let  tesla = {driver: 'AI'}

Object.setPrototypeOf(tesla, genericCar)

console.log('tesla', Object.getPrototypeOf(tesla));


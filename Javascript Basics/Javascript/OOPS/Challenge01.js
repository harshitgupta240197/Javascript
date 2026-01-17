/** Task: Prototype Chaining
Create a constructor function Animal that has a method speak() that return 'Animal speaking'.
Then create another constructor Dog that inherits from Animal using prototypes.
The Dog constructor should add a method bark() that returns 'Woof!'. Demonstrate the prototype chain between Dog and Animal.
 */

function Animal() {
}

Animal.prototype.speak = function () {
    return "Animal speaking";
};

function Dog() {
}

Dog.prototype = new Animal();

Dog.prototype.bark = function (){
    return "Woof!"
};

const newDog = new Dog();

console.log(newDog.bark());
console.log(newDog.speak());



/**Task 1: Create a Functional Constructor
Create a functional constructor Person that takes name and age as parameters. Add a method greet() 
to the constructor that returns "Hello, my name is [name]".

Task 2: Handle Errors
Modify the Person constructor to throw an error if the age is not a positive number. */

function Person (name, age){
    this.name = name
    this.age = age
    this.greet = function (){
        return `Hello, my name is ${this.name}`
    }
}
let newPerson = new Person('Harshit', 28)
console.log(newPerson.greet());



function Person (name, age){

        if (typeof age !== "number" || age < 0) {
            throw new Error("Age cannot be negative"); 
        } 

    this.name = name
    this.age = age
    this.greet = function (){
        return `Hello, my name is ${this.name}`
    }
}

let newnewPerson = new Person('Harshit', 28)
console.log(newPerson.greet());
// console.log(newPerson.age());



/**Classes, Objects, and Inheritance
 * 
Task 1: Class Inheritance
Create a class Vehicle with properties make and model, and a method getDetails() that 
returns a string "Make: [make], Model: [model]". Create a subclass Car that extends Vehicle and 
adds a method startEngine() that returns "Engine started".

Task 2: Method Overriding in Inheritance
Extend the Vehicle class from the previous task to include a method move() that returns "The vehicle is moving". 
Then, override the move() method in the Car class to return "The car is driving".

Task 3: Static Methods in Classes
Add a static method isVehicle(obj) to the Vehicle class that checks if a given object is an instance of Vehicle. 
The method should return true if the object is a Vehicle or a subclass of Vehicle, and false otherwise. */

// Task 1
class Vehicle {
  constructor(make, model) {
    this.make = make;
    this.model = model;
    this.getDetails = function (){
        return `Make: ${this.make}, Model: ${this.model}`
    }
    this.move = function (){
        return `The vehicle is moving`
    }
  }
  static isVehicle(obj){
        return obj instanceof Vehicle;
    }
}

class Car extends Vehicle {
    startEngine = function(){
        return `Engine started`
    }
    move = function(){
        return `The car is driving`
    }
}


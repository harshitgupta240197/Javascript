/*************************** CLASS********************** */

class name {
    constructor(parameters) {
        
    }
}

/******************* METHODS *********************** 
 * WHen the function enters inside a CLASS then it is called a METHOD.
 * Basically a function after entering inside a CLASS becomes a METHOD.

*/

class Vehicle {
    constructor(make, model) {
        this.make = make;
        this.model = model
    }
    start (){           // When inside a class a function does not need a prefix called 'function'
        return `${this.make} is a car of the model ${this.model}`
    }
}

let newCar = new Vehicle('Toyota', 'Camry')
console.log(newCar.start());

class Car extends Vehicle{
    drive(){
        return `${this.make}: This is an example of inheritance`
    }
}

let myCar = new Car('Toyota', 'Corolla')
console.log(myCar.start());
console.log(myCar.drive());


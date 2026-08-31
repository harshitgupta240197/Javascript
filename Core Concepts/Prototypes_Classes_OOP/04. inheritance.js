class Vehicle {
    constructor(make, model) {
        this.make = make
        this.model = model
    }
    description() {
        return `this is a ${this.model} from ${this.make}`
    }
}

class Car extends Vehicle {
    drive() {
        return `the ${this.model} is a great car: Inheritance example`
    }
}

let myCar = new Car('Toyota', 'Camry')
console.log(myCar.description());
console.log(myCar.drive());

// EXTENDS helps us to Inherit properties from a class and call it into a new class
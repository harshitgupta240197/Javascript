class Vehicle {
    constructor(make, model) {
        this.make = make
        this.model = model
    }
    description() {
        return `${this.make} is car named ${this.model}`
    }
}

// When a function is called inside a Class then it is called Method.
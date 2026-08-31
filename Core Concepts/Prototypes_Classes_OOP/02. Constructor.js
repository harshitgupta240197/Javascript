function Person(name, age) {
    this.name = name
    this.age = age
}

function Car(make, model) {
    this.make = make
    this.model = model
}

// this keyword refers to the newly created object inside a constructor function

// Because of 'this' and 'new' linking, we can access the internal variables of Car inside myCar
let myCar = new Car('Toyota', 'Camry')
console.log(myCar);

let newUser = new Person('Harshit', 29)
console.log(newUser);


// -------------------------------------------------------------------

function tea(type) {
    this.type = type
    this.describe = function () {
        return `this is a cup of ${this.type} tea`
    }
}

let lemonTea = new tea('lemon tea')
console.log(lemonTea.describe);

// -------------------------------------------------------------------


function Animal(species) {
    this.species = species
}

Animal.prototype.sound = function () {
    return `${this.species} makes a sound`
}
let dog = Animal('Dog')
console.log(dog.sound());

// ----------------------------------------------------------------------

function Drink(name) {
    if (!new.target) {
        throw new Error('Drink must be called with the new keyword')
    }
    this.name = name
}

let tea = new Drink('tea')
let coffee = new Drink('coffee')

// ----------------------------------------------------------------------
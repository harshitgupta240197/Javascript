let car = {
    name: 'Land Rover',
    model: 'Defender',
    year: 2025,
    start: function () {
        return `This car called ${this.model} is made by the company called ${this.name} in the year ${this.year}.`
    }
}
console.log(car.start());


function Person(name, age) {
    this.name = name;
    this.age = age
}

let JohnName = new Person('John Doe', 40)
console.log(JohnName.name);


/** PROTOTYPE CHAIN in JAVASCRIPT */

function Animal(species){
    this.species = species
}

Animal.prototype.speaks = function(){
    return `The ${this.species} makes loud roar`
}

let lion = new Animal('Lion')
console.log(lion.speaks());


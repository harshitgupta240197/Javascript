function Person(name, age) {
    this.name = name
    this.age = age
}

function Car(make, model) {
    this.make = make
    this.model = model  
}

let myCar = new Car('Toyota', 'Camry');
console.log(myCar);

let myNewCar = new Car('Land Rover', 'Defender')
console.log(myNewCar);


function Tea(type) {
    this.type = type
    this.describe = function () {
        return `This is a ${this.type}`
    } 
}

let newTea = new Tea("Lemon Tea")
console.log(newTea.describe());



//Using Prototype
function Animal(species){
    return this.species = species; 

}

Animal.prototype.sound = function(){
    return `This ${this.species} makes loud sounds.`
}

let dogNew = new Animal('Dog')
console.log(dogNew.sound());





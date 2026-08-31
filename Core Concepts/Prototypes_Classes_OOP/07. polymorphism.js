class Bird {
    fly() {
        return 'can fly'
    }
}

class Penguin {
    fly() {
        return 'Penguins cannot fly'
    }
}

let birds = new Bird();
let penguins = new Penguin();

console.log(birds.fly());
console.log(penguins.fly());




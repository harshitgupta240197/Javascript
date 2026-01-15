function Drink (name){
    if (!new.target) {
        throw new Error('Drink must be called with the new keyword')
    }
    this.name = name
}
let tea = new Drink('Green Tea')
let coffee = new Drink('Capuccino')
console.log(tea);
console.log(coffee);



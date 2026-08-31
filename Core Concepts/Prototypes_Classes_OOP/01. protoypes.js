//  We can use the properties of computer inside the lenovo object using __proto__
let computer = {cpu: 12};
let lenovo = {
    screen: 'HD',
    __proto__: computer
};
let tomHardware = {}

console.log('lenovo', lenovo.__proto__); //lenovo { cpu: 12 }
// Basically Lenovo can borrow the properties of computer using __proto__



let genericCar = {tyre: 4}
let tesla = {
    driver: 'AI'
}

Object.setPrototypeOf(tesla, genericCar)

console.log(`tesla`, tesla.tyre);
console.log(`tesla`, Object.getPrototypeOf(tesla));

